function renderInstructions() {
    const instructions = `
      
        <p class="h3">
        In the next page, you will see a blue square and a button. For the next 5 minutes, you will click on the button whenever the square changes its color to red.
        </p>

        <p class="h3">
        If you click the button promptly after a color change from blue to red, your reaction time will be displayed on the page.
        </p>

        <p class="h3">
        Nothing will appear if you missed a color change. 
        </p>

        <p class="h3">
        There will be a practice trial that runs for <b>30 seconds</b> before the real trial begins.
        </p>

        <p class="h3">
        Please continue when you are ready to begin.
        </p>
    `;
    BODY.innerHTML = `
        <p class="h3">
        ${instructions}
        </p>
        <button class="btn btn-primary" onclick="startTrial();">
            Start practice trial.
        </button>
    `;
}

let startTime = 0;
function startTrial() {
    startTime = 0;
    BODY.innerHTML = `

    <div class="container d-flex flex-column justify-content-center align-items-center">
    <p id="reaction-time"></p>
       <div class="align-self-center" id="square"></div>
    </div>
    <button id="btn" class="btn btn-primary" onClick="checkIfMatchedTrial(performance.now());">click this button</button>

`;
    const square = document.getElementById("square");
    setTimeout(() => {
        BODY.innerHTML = `
        <p class="h3">
        Do you understand how it works? If not please try again. Otherwise please continue.
        </p>
        <p class="h3">
        Note that in the real test, you will see your reaction time instead of "Good!" and "Too slow".
        </p>
        <div>
        <button class="btn btn-primary me-3" onclick="startTest();">
        Start test
    </button>
    <button class="btn btn-primary" onclick="startTrial();">
        Practice again
    </button>
    </div>
    `;
        return clearInterval(test);
    }, PRACTICE_TIMEOUT);
    let cue = 1;
    let randomInterval = Math.floor(Math.random() * (max - min + 1) + min);
    const test = setInterval(() => {
        if (randomInterval == cue) {
            startTime = Math.round(performance.now());
            square.style.backgroundColor = "red";
            cue = 1;
            setTimeout(() => {
                square.style.backgroundColor = "blue"
            }, 500);
            randomInterval = Math.floor(Math.random() * (max - min + 1) + min);
        } else {
            square.style.backgroundColor = "blue";
            cue++
        }
    }, 1000);
}

function checkIfMatchedTrial(endTime) {
    const reactTime = document.getElementById("reaction-time");
    const diff = Math.round(endTime - startTime);
    if (diff > 800) {
        reactTime.innerHTML = `
        <span class="h3" style="color:red">Too slow</span>
        `;
        setTimeout(() => {
            reactTime.innerHTML = ``;
        }, 500);
    } else {
        reactTime.innerHTML = `
        <span class="h3" style="color:green">Good!</span>
        `;
        setTimeout(() => {
            reactTime.innerHTML = ``;
        }, 500);
    }

}


function startTest() {
    startTime = 0;
    BODY.innerHTML = `

        <div class="container d-flex flex-column justify-content-center align-items-center">
        <p id="reaction-time"></p>
           <div class="align-self-center" id="square"></div>
        </div>
        <button id="btn" class="btn btn-primary" onClick="checkIfMatched(performance.now());">click this button</button>

    `;
    const square = document.getElementById("square");
    setTimeout(() => {
        renderEndingPage();
        return clearInterval(test);
    }, TIMEOUT);
    let cue = 1;
    RESULTS[`${0}`] = { "clickedAfter": [] };
    let randomInterval = Math.floor(Math.random() * (max - min + 1) + min);
    const test = setInterval(() => {
        if (randomInterval == cue) {
            startTime = Math.round(performance.now());
            RESULTS[`${startTime}`] = { "clickedAfter": [] };
            square.style.backgroundColor = "red";
            cue = 1;
            setTimeout(() => {
                square.style.backgroundColor = "blue"
            }, 500);
            randomInterval = Math.floor(Math.random() * (max - min + 1) + min);
        } else {
            square.style.backgroundColor = "blue";
            cue++
        }
    }, 1000);
}


function checkIfMatched(endTime) {
    const reactTime = document.getElementById("reaction-time");
    const diff = Math.round(endTime - startTime);
    RESULTS[`${startTime}`]["clickedAfter"].push(diff);
    if (diff > 1000) {

    } else {
        reactTime.innerText = `${diff} ms`;
        setTimeout(() => {
            reactTime.innerText = ``;
        }, 500);
    }

}




// how to save final result, I think:
async function sendResults(results) {
    if (IS_PRODUCTION) {
        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        fetch("/save", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: results })
        })
            .then(handleErrors)
            .then(response => console.log("Request complete! response: ", response))
            .catch(error => console.log("We got an error: ", error));
    } else {
        console.log("===done===>", results);
    }

}


function renderEndingPage() {
    sendResults(RESULTS);
    BODY.innerHTML = `
            <p class="h3">
                Task over. Thank you for participating in this study. You can close this window.
            </p >
            `;
}