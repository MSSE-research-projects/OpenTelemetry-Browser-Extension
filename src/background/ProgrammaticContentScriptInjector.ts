/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TabStatus, CONTENT_SCRIPT_NAME, REMOTE_SERVER_PORT, REMOTE_SERVER_URL } from '../types';

export class ProgrammaticContentScriptInjector {
  scope: typeof chrome;

  constructor(scope: typeof chrome) {
    this.scope = scope;
  }

  injectContentScript(tabId: number) {
    this.scope.tabs.get(tabId, (tab: chrome.tabs.Tab) => {
      if (tab.url) {
        if (this.scope.scripting) {
          this.scope.scripting.executeScript({
            target: {
              allFrames: true,
              tabId,
            },
            files: [CONTENT_SCRIPT_NAME],
          });
        } else {
          this.scope.tabs.executeScript(tabId, {
            file: CONTENT_SCRIPT_NAME,
            allFrames: true,
          });
        }
      }
    });
  }

  sendSetting(tabId: number, url: URL) {
    const domain = url.hostname;

    fetch(`http://${REMOTE_SERVER_URL}:${REMOTE_SERVER_PORT}/settings?domain=${domain}`,
      { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } }).then((res) => {
        res.json().then((settings) => {
          this.scope.tabs.sendMessage(tabId, { action: "pullSetting", settings });
        })
      });
  }

  register() {
    this.scope.tabs.onUpdated.addListener(
      (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
        if (changeInfo.status === TabStatus.LOADING) {
          this.injectContentScript(tabId);
        }

        if (changeInfo.status === TabStatus.COMPLETE) {
          this.scope.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
              const urlAddr = tabs[0].url;
              this.sendSetting(tabId, new URL(urlAddr || ''));
          });
        }
      }
    );
  }
}
