// === for Daniel to edit ===
const instructions = `
<p>
For this task, you will be able to choose between completing the easy or hard task for a reward. Your reward will be in the form of raffle tickets. 
Each ticket represents an additional chance to win one of three $50 Amazon gift cards.
 We will conduct the raffle once data collection for this study is complete.
</p>

<p>
In the following series of trials you will choose between performing the easy task 
(ordering numbers with one digit from least to greatest) or the hard task (ordering numbers with four digits from least to greatest). 
Each task will be associated with a different number of raffle tickets and you will select the one that you would prefer to perform. 
You will then perform the task that you chose. 
</p>

<p>
Please continue when you are ready to begin
</p>
`;

const PAGES = {

    instructionsPage: `
        <p class="h3">
            ${instructions}
        </p>
        <button class="btn btn-primary" onclick="renderOptionsPage();">
            End instructions
        </button>
    `,

    optionsPage: `
        <form class="needs-validation" nonvalidate>
            <div class="form-check mb-5">
                <input class="form-check-input" type="radio" name="flexRadioDefault" value="easy" id="easy" onclick="activateNext();"
                    required>
                <label class="form-check-label" for="easy">
                    Easy task for ${REWARDS["easy"]} tickets
                </label>
            </div>
            <div class="form-check mb-5">
                <input class="form-check-input" type="radio" name="flexRadioDefault" value="hard" id="hard" onclick="activateNext();"
                    required>
                <label class="form-check-label" for="hard">
                    Hard task for ${REWARDS["hard"]} tickets
                </label>
            </div>
            <button type="button" class="btn btn-primary form-control" onclick="saveResultAndNext(0, 'difficulty')" disabled>Next</button>
        </form>
    `,
    questionsPage: `

    `,

    endingPage: `
    <p class="h3">
    Task over. Thank you for participating in this study. You can close this window.
    </p>
    `,
}
