function renderInstructions() {
    const instructions = `
      
        <p>
        In the next page, you will see a blue square and a button. For the next 5 minutes, you will click on the button whenever the square changes its color to red.
        If you click the button promptly after a color change from blue to red, your reaction time will be displayed on the page. Nothing will appear if you missed
        a color change. 
        </p>

        <p>
        Please continue when you are ready to begin.
        </p>
    `;
    BODY.innerHTML = `
        <p class="h3">
        ${instructions}
        </p>
        <button class="btn btn-primary" onclick="startTest();">
            End instructions
        </button>
    `;
}

let startTime = 0;
function startTest() {
    BODY.innerHTML = `
        <div class="container d-flex flex-column justify-content-center">
        <div class="container d-flex flex-column justify-content-center align-items-center">
        <p id="reaction-time"></p>
           <div class="align-self-center" id="square"></div>
        </div>
        <button id="btn" class="btn btn-primary" onClick="checkIfMatched(performance.now());">click this button</button>
        </div>
    `;
    const square = document.getElementById("square");
    const btn = document.getElementById("btn");
    const timeout = 1000 * 60 * 5;
    setTimeout(() => {
        // console.log("===times up===");
        // console.log(RESULTS);
        btn.onclick = () => { renderEndingPage(); };
        return clearInterval(test);
    }, timeout);

    const max = 5;
    const min = 2;
    let cue = 1;
    let randomInterval = Math.floor(Math.random() * (max - min + 1) + min);
    const test = setInterval(() => {
        if (randomInterval == cue) {
            startTime = performance.now();
            // console.log("matched!", randomInterval);
            square.style.backgroundColor = "red";
            cue = 1;
            setTimeout(() => {
                square.style.backgroundColor = "blue"
            }, 75);
            randomInterval = Math.floor(Math.random() * (max - min + 1) + min);
        } else {
            square.style.backgroundColor = "blue";
            // console.log("cue: ", cue, "\nrand==", randomInterval);
            cue++
        }
    }, 1000);
}

function checkIfMatched(endTime) {
    const reactTime = document.getElementById("reaction-time");
    const diff = endTime - startTime;
    if (diff > 1000) {
        RESULTS.totalMiss++
    } else {
        RESULTS.reactionTimes.push(diff)
        RESULTS.totalHit++
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
            < p class="h3" >
                Task over.Thank you for participating in this study.You can close this window.
        </p >
            `;
}