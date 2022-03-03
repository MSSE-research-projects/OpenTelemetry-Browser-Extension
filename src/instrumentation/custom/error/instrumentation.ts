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
import { InstrumentationBase } from '@opentelemetry/instrumentation';
import { VERSION } from '@opentelemetry/core';

/**
 * This plugin support instrumenting js run time error
 *
 * @package UserInteraction will patch dom element error
 */
export class RuntimeErrorInstrumentation extends InstrumentationBase {
  readonly component: string = 'global-error';
  readonly version: string = VERSION;
  moduleName = this.component;
  private pastOnErrorFunc: undefined | Function;

  constructor() {
    super('web-error-instrumentation', VERSION, {});
  }

  protected _patchOnError() {
    const plugin = this;

    return (original: Function) => {
      return function onErrorPatched(
        message: string,
        source: string,
        lineno: number,
        colno: number,
        error: Error
      ) {
        console.log(message, source, lineno, colno, error);
        return original.call(message, source, lineno, colno, error);
      };
    };
  }

  protected patchedOnError(
    message: string,
    source: string,
    lineno: number,
    error: Error
  ) {}

  public override enable() {
    this._diag.debug('applying patch to', this.moduleName, this.version);

    // this._wrap(window, 'onerror', this._patchOnError());

    if (!window.onerror) {
      window.onerror = (...args) => {
        this.tracer.startSpan('test');
      };
    } else {
      window.onerror(this.pastOnErrorFunc);
    }

    // this._instrumentError();
  }
  public override disable() {
    window.onerror = this.pastOnErrorFunc;
  }

  protected init() {}
}
