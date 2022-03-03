import Step from './Step';
import { PreSurvey, SurveyQuestion } from '../types';

const TMP_STYLE = `
    z-index: 9999999;
    position: fixed;
    background: white;
    top: 40%;
    width: 100%;`;

class PreSurveyStep extends Step {
  preSurvey: PreSurvey;

  constructor(preSurvey: PreSurvey) {
    super();
    this.preSurvey = preSurvey;
    this.clickButton.textContent = "Complete";
  }

  buildQuestionBlock(question: SurveyQuestion): HTMLElement {
    const { description, isRequired, options } = question;

    const desc = document.createElement("div");
    desc.textContent = description;

    if (isRequired) {
      desc.textContent += '*';
    }

    const menu = document.createElement("div");
    for (const option of options) {
      const radiobox = document.createElement('input');
      radiobox.type = 'radio';
      radiobox.value = option;
      const label = document.createElement('label');
      label.textContent = option;
      const newLine = document.createElement('br');
  
      const row = document.createElement("div")
      row.appendChild(radiobox)
      row.appendChild(label)
      row.appendChild(newLine)

      menu.appendChild(row);
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
    title.textContent = this.preSurvey.title;

    for (const question of this.preSurvey.questions) {
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

export default PreSurveyStep;
