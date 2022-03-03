const intro = {
  title: "Welcome to BenevolveBuddy Usability Study",
  description: "You are going to participate in a usability study for BenevolveBuddy application. We are studying how machine learning can be leveraged to infer the usability of an application. You can help us by participating in a usability testing activity. It will take only a few minutes. You will be using an app meant for volunteers interested in helping out individuals in need. Volunteers can deliver essentials to people who cannot get out of their homes. You will go through the activity by performing 4 tasks. After each task, you will take a short survey. Please click on Begin button when you are ready.",
}

const preSurvey = {
  title: "Welcome to Stackoverflow Usability Study",
  questions: [
    {
      description: "Please select your gender",
      type: "select",
      isRequired: true,
      options: [
        "Male", "Female", "Non-binary", "Prefer not to disclose"
      ]
    },
    {
      description: "Please select your age group",
      type: "select",
      isRequired: true,
      options: [
        "Under 18", "18 to 24", "25 to 39", "40 to 59", "Over 60"
      ]
    },
    {
      description: "Participation in this usability study is voluntary. All information will remain strictly confidential. Interactions made with the application during the test will be recorded. However, at no time will your name or any other identification be used.",
      type: "checkbox",
      isRequired: true,
      options: [
        "I have read and understood the above information."
      ]
    }
  ]
};

const tasks = [
  {
    taskTitle: "Fill in Availability (StackOverflow)",
    scenario: "You are a healthy volunteer with no medical conditions who wants to help with some existing requests.",
    taskDesc: "Use the app to provide the time slots that you're available for volunteering."
  },
  {
    taskTitle: "Fill in Availability (StackOverflow)",
    scenario: "You are a healthy volunteer with no medical conditions who wants to help with some existing requests.",
    taskDesc: "Use the app to provide the time slots that you're available for volunteering."
  }
];

const postSurvey = {
  title: "Usability Survey Questions",
  questions: [
    {
      description: "PI was able to copmlete the tasks with a reasonable number of steps.",
      type: "drop-down",
      isRequired: true,
      options: [
        "Strongly Disagree",
        "Disagree",
        "Indifferent",
        "Agree",
        "Strongly Agree"
      ]
    },
    {
      description: "PI was able to copmlete the tasks with a reasonable number of steps.",
      type: "drop-down",
      isRequired: true,
      options: [
        "Strongly Disagree",
        "Disagree",
        "Indifferent",
        "Agree",
        "Strongly Agree"
      ]
    }
  ]
};

const data = {
  intro,
  preSurvey,
  tasks,
  postSurvey
}

export default data;
