// const RESULTS = { totalHit: 0, totalMiss: 0, falseAlarm: 0, reactionTimes: [] }
const RESULTS = {}
const IS_PRODUCTION = false;
const BODY = document.getElementsByTagName("body")[0];
let QUESTION_NUMBER = 0;
const timeout = 1000 * 20;
const max = 5;
const min = 2;