import Step from './Step';
import PostSurveyStep from './PostSurveyStep';
import TaskStep from './TaskStep';
import PreSurveyStep from './PreSurveyStep';
import IntroStep from './IntroStep';
import { WebSiteSettings } from '../types';
import FeedBackStep from './FeedBackStep';

class ExperimentManager {
  steps: Step[];

  displayFinished() {
    const TMP_STYLE = `
    z-index: 9999999;
    position: fixed;
    background: white;
    top: 40%;
    width: 100%;`;
    const title = document.createElement("div");
    title.textContent = "Finishing Up";
    const desc = document.createElement("div");
    desc.textContent = "Thank you for participating!";

    const block = document.createElement("div");
    block.appendChild(title);
    block.appendChild(desc);
    block.setAttribute('style', TMP_STYLE);

    Step.createLightbox();

    document.body.appendChild(block);
  }

  constructor(settings: WebSiteSettings) {
    const postSurveyStep: PostSurveyStep = new PostSurveyStep(settings.postSurvey);
    const taskStep: TaskStep = new TaskStep(settings.tasks);
    const preSurveyStep: PreSurveyStep = new PreSurveyStep(settings.preSurvey);
    const introStep: IntroStep = new IntroStep(settings.intro);
    const feedBackStep: FeedBackStep = new FeedBackStep();

    this.steps = [introStep, preSurveyStep, taskStep, postSurveyStep, feedBackStep];

    for (let i = 0; i < this.steps.length; i += 1) {
      if (i < this.steps.length - 1) {
        this.steps[i].setNextStep(this.steps[i + 1]);
      } else {
        this.steps[i].setNextFunction(this.displayFinished);
      }
    }
  }

  launch() {
    this.steps[0].start();
  }
}

export default ExperimentManager;
