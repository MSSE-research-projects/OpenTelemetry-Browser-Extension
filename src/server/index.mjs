import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.text({ limit: '200mb' }))
let dom;
//app.use(express.urlencoded({ extended: true }))

let report = { taskBegin: undefined, taskEnd: undefined, click: 0, scroll: 0, pause: 0, pause_duration: 0 }
let beginTimestamp;
let lastStepTimestamp;
const page2baseTimestamp = {};

let nxtRecordingStatus = 'begin';

app.post('/switch-recording', (req, res) => {
  if (nxtRecordingStatus == 'begin') {
    
  } else {
  }
})

app.post('/task-start', (req, res) => {
  console.log("Begin Task")
  beginTimestamp = Date.now()
  report = { click: 0, scroll: 0, pause: 0, pause_duration: 0 }
  res.sendStatus(200)
  nxtRecordingStatus = 'end'
})

app.post('/task-end', (req, res) => {
  console.log("End Task")
  report.taskBegin = new Date(beginTimestamp);
  report.taskEnd = new Date();
  console.log(report)
  res.sendStatus(200)
  nxtRecordingStatus = 'begin'
});

app.get('/settings', (req, res) => {
  const stackoverSettings = [
    {
      taskTitle: 'Fill in Availability (StackOverflow)',
      scenario: 'You are a healthy volunteer with no medical conditions who wants to help with some existing requests.',
      taskDesc: 'Use the app to provide the time slots that you\'re available for volunteering.',
    },
    {
      taskTitle: 'Fill in Availability (StackOverflow)',
      scenario: 'You are a healthy volunteer with no medical conditions who wants to help with some existing requests.',
      taskDesc: 'Use the app to provide the time slots that you\'re available for volunteering.',
    }
  ];

  const msftSettings = [
    {
      taskTitle: 'Fill in Availability (Microsoft)',
      scenario: 'You are a healthy volunteer with no medical conditions who wants to help with some existing requests.',
      taskDesc: 'Use the app to provide the time slots that you\'re available for volunteering.',
    },
    {
      taskTitle: 'Fill in Availability (Microsoft)',
      scenario: 'You are a healthy volunteer with no medical conditions who wants to help with some existing requests.',
      taskDesc: 'Use the app to provide the time slots that you\'re available for volunteering.',
    }
  ];1

  if (req.query.domain === 'stackoverflow.com') {
    res.json({ settings: stackoverSettings });
  } else if (req.query.domain === 'docs.microsoft.com') {
    res.json({ settings: msftSettings })
  }

})
 

app.post('/', (req, res) => {
  const event = req.body
  //console.log(new Date() - new Date(event.timestamp))
  // console.log(event)

  // console.log(event.pointer[0].data);

  if (event.dom && event.dom.length) {
    dom = event.dom[0].data;
  }

  if (!(event.envelope.pageNum in page2baseTimestamp)) {
    page2baseTimestamp[event.envelope.pageNum] = event.timestamp - event.envelope.start
  }

  // console.log(page2baseTimestamp[event.envelope.pageNum] + event.envelope.start - lastStepTimestamp)

  if (page2baseTimestamp[event.envelope.pageNum] + event.envelope.start - lastStepTimestamp >= 5000) {
    console.log('non-click/non-scroll pause (>= 5s)')  
    report.pause += 1
    report.pause_duration += page2baseTimestamp[event.envelope.pageNum] + event.envelope.start - lastStepTimestamp
    lastStepTimestamp = page2baseTimestamp[event.envelope.pageNum] + event.envelope.start
   }

  if ('click' in event) {
    report.click += 1
    console.log('click');
    const elementIdx = parseInt(event.click[0].data.target)
    console.log(dom.length, elementIdx, dom[elementIdx])
    lastStepTimestamp = page2baseTimestamp[event.envelope.pageNum] + event.click[event.click.length - 1].time

  } else if ('scroll' in event) {
    console.log('scroll')
    report.scroll += 1
    const elementIdx = parseInt(event.scroll[0].data.target)
    console.log(dom[elementIdx])
    lastStepTimestamp = page2baseTimestamp[event.envelope.pageNum] + event.scroll[event.scroll.length - 1].time
  } else if ('pointer' in event) {
    console.log('movement')
    const elementIdx = parseInt(event.pointer[0].data.target)
    console.log(dom[elementIdx])
  }
  
  res.sendStatus(200)
})

app.listen(80, () => {
  console.log('express starts')
})
