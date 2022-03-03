import express from 'express'
import cors from 'cors'

import stackoverflowSettings from './taskSettings/stackoverflow.mjs';
const app = express();

app.use('*', cors())
app.use(express.text({ limit: '200mb' }))

let report = { taskBegin: undefined, taskEnd: undefined, click: 0, scroll: 0, pause: 0, pause_duration: 0 }
let beginTimestamp;
let lastStepTimestamp;

let nxtRecordingStatus = 'begin';

app.post('/task-start', (req, res) => {
  console.log("Begin Task");
  beginTimestamp = Date.now();
  report = { click: 0, scroll: 0, pause: 0, pause_duration: 0 };
  res.sendStatus(200);
  nxtRecordingStatus = 'end';
})

app.post('/task-end', (req, res) => {
  console.log("End Task");
  report.taskBegin = new Date(beginTimestamp);
  report.taskEnd = new Date();
  res.sendStatus(200);
  nxtRecordingStatus = 'begin'
});

const domain2settings = {
  "stackoverflow.com": stackoverflowSettings,
}

app.get('/settings', (req, res) => {
  if (req.query.domain in domain2settings) {
    const settings = domain2settings[req.query.domain];
    return res.json(settings);
  }

  res.sendStatus(404);
})
 

app.post('/', (req, res) => {
  const event = req.body
  console.log(event);
  res.sendStatus(200)
})

app.listen(80, () => {
  console.log('express starts')
})
