import Step from './Step';
import { PostSurvey, SurveyQuestion } from '../types';

const TMP_STYLE = `
    z-index: 9999999;
    position: fixed;
    background: white;
    top: 40%;
    width: 100%;`;


class PostSurveyStep extends Step {
  postSurvey: PostSurvey;

  constructor(postSurvey: PostSurvey) {
    super();
    this.postSurvey = postSurvey;
    this.clickButton.textContent = "Complete";
  }

  buildQuestionBlock(question: SurveyQuestion): HTMLElement {
    const { description, isRequired, options } = question;

    const desc = document.createElement("div");
    desc.textContent = description;

    if (isRequired) {
      desc.textContent +='*';
    }

    const menu = document.createElement("select");
    for (const option of options) {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
  
      menu.appendChild(opt)
    }

    const block = document.createElement("div");
    block.appendChild(desc);
    block.appendChild(menu);

    return block;
  }

  override buildBlock() {
    const block = document.createElement("div");
    const questionsBlock = document.createElement("div");
    const title = document.createElement("div")
    title.textContent = this.postSurvey.title;

    for (const question of this.postSurvey.questions) {
      const questionBlock: HTMLElement = this.buildQuestionBlock(question);
      questionsBlock.appendChild(questionBlock);
    }

    block.appendChild(title);
    block.appendChild(questionsBlock);
    block.appendChild(this.clickButton);

    block.setAttribute('style', TMP_STYLE);

    this.block = block;
  }
}

export default PostSurveyStep;
