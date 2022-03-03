import Step from './Step';

const TMP_STYLE = `
    z-index: 9999999;
    position: fixed;
    background: white;
    top: 40%;
    width: 100%;`;


class FeedBackStep extends Step {
  constructor() {
    super();
    this.clickButton.textContent = "Complete";
  }

  override buildBlock() {
    const title = document.createElement("div")
    title.textContent = "Thank you for participating!";

    const desc = document.createElement("div");
    desc.textContent = "Please provide any additional comments you would like to share. If you would like to be contacted in the future with the study results, please leave your e-mail address.";

    const inputArea = document.createElement("textarea");

    const block = document.createElement("div");
    block.appendChild(title);
    block.appendChild(desc);
    block.appendChild(inputArea);
    block.appendChild(this.clickButton);

    block.setAttribute('style', TMP_STYLE);

    this.block = block;
  }

  
}

export default FeedBackStep;
