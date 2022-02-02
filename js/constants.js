// const RESULTS = { totalHit: 0, totalMiss: 0, falseAlarm: 0, reactionTimes: [] }
const RESULTS = {}
const IS_PRODUCTION = true;
const BODY = document.getElementsByTagName("body")[0];
let QUESTION_NUMBER = 0;
// const timeout = 1000 * 20;
// 1000ms * 60 * 5 == 5 min;
const timeout = 1000 * 60 * 5;
const max = 10;
const min = 2;