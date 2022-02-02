// const RESULTS = { totalHit: 0, totalMiss: 0, falseAlarm: 0, reactionTimes: [] }
const RESULTS = {}
const IS_PRODUCTION = true;
const BODY = document.getElementsByTagName("body")[0];
let timeout = IS_PRODUCTION ? 1000 * 60 * 5 : 1000 * 20;
let max = IS_PRODUCTION ? 10 : 5;
const min = 2;