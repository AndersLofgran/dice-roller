let display = document.querySelector('#display');
let result = document.querySelector('#result');
let diceLog = document.querySelector('#diceLog');

const coin = document.querySelector('#coin');
const dice = document.querySelectorAll('.dice');
const modifier = document.querySelectorAll('.modifier');
let autoHit = document.querySelector('#autoHit');
let advantage = document.querySelector('#advantage');
let autoRoll = document.querySelector('#autoRoll');
const reset = document.querySelector('#reset');
const roll = document.querySelector('#roll');
let customBtn1 = document.querySelector('#customBtn1');
let customBtn2 = document.querySelector('#customBtn2');

let displayDice = [];
let dieCap = 0;

// dice log
document.getElementById('diceLogBtn').addEventListener('click', () => {
    if (toggleStatus == undefined) {
        document.getElementById('logContainer').style.display = "block";
        toggleStatus = 1;
    }
    else if (toggleStatus == 1) {
        document.getElementById('logContainer').style.display = "none";
        toggleStatus = undefined;
    }
})
let toggleStatus;


// coin & dice buttons
coin.addEventListener('click', () => {
    resetAll();
    display.innerText = "Coin";
    let rndBool = Math.random() >= 0.5;
    function headsTails() {
        if (rndBool == true) {
            return "Heads" }
        else {
            return "Tails" }
    }
    result.innerText = headsTails();
    diceLog.innerText += `\nCoin: ${result.innerText}`;
});
dice.forEach(button => {
    button.addEventListener('click', () => {
        result.innerText = "";
        // autoRoll
        if (autoRollStatus == 1) {
            typeOne = button.getAttribute('data-type');
            typeOneVal = button.getAttribute('data-value');
            display.innerText = `1${typeOne}`;
            result.innerText = "Result: " + Number(rndVal(1, typeOneVal));
            if (autoHitStatus == 0 && advantageStatus == 0) {
                onlyNums = result.innerText.replace(/Result: /, "");
                diceLog.innerText += `\n1${typeOne}: ${onlyNums}`;
            }
            else if(autoHitStatus == 1 && advantageStatus >= 1) {
                let advList = [];
                advList.push((Math.ceil(Math.random() * 20)));
                advList.push((Math.ceil(Math.random() * 20)));
                result.innerText += "\nHit: " + (advList);
                onlyNums = result.innerText.replace(/Result: /, "").replace(/\nHit: /, " / [");
                diceLog.innerText += `\n1${typeOne}: ${onlyNums}]${advText}`;
            }
            else if (autoHitStatus == 1) {
                result.innerText += "\nHit: " + (Math.ceil(Math.random() * 20));
                onlyNums = result.innerText.replace(/Result: /, "").replace(/\nHit: /, " / [");
                diceLog.innerText += `\n1${typeOne}: ${onlyNums}]`; 
            }
            diceLog.innerText = diceLog.innerText.replace(/Roll away!\n/, "")
            return
        }

        if (dieCap > 0) {
            return
        }

        // first die type
        else if (numOne == 0) {
            numOne++;
            typeOne = button.getAttribute('data-type');
            typeOneVal = button.getAttribute('data-value');
            displayDice.push(`${numOne}${typeOne}`);
            display.innerText = displayDice;
        }
        else if (numTwo < 1 && typeOne == button.getAttribute('data-type')) {
            numOne++;
            displayDice.pop();
            displayDice.push(`${numOne}${typeOne}`);
            display.innerText = displayDice;
        }

        // second die type
        else if (numTwo == 0) {
            numTwo++;
            typeTwo = button.getAttribute('data-type');
            typeTwoVal = button.getAttribute('data-value');
            displayDice.push(` ${numTwo}${typeTwo}`);
            display.innerText = displayDice;       
        }
        else if (numThr < 1 && typeTwo == button.getAttribute('data-type')) {
            numTwo++;
            displayDice.pop();
            displayDice.push(` ${numTwo}${typeTwo}`);
            display.innerText = displayDice;  
        }

        // third die type
        else if (numThr == 0 && typeOne !== button.getAttribute('data-type') && typeTwo !== button.getAttribute('data-type')) {
            numThr++;
            typeThr = button.getAttribute('data-type');
            typeThrVal = button.getAttribute('data-value');
            displayDice.push(` ${numThr}${typeThr}`);
            display.innerText = displayDice;
        }
        else if (typeThr == button.getAttribute('data-type')) {
            numThr++;
            displayDice.pop();
            displayDice.push(` ${numThr}${typeThr}`);
            display.innerText = displayDice;
        }
    })
});
    // color hovers
    coin.addEventListener('mouseover', () => {
            coin.src = "coin_grey.png";
    })
    coin.addEventListener('mouseout', () => {
        coin.src = "coin.png";
    })
    dice.forEach(button => {
        button.addEventListener('mouseover', () => {
            if (button.dataset.type == "d4") {
                button.src = "d4_blue.png";
            }
            if (button.dataset.type == "d6") {
                button.src = "d6_teal.png";
            }
            if (button.dataset.type == "d8") {
                button.src = "d8_green.png";
            }
            if (button.dataset.type == "d10") {
                button.src = "d10_yellow.png";
            }
            if (button.dataset.type == "d12") {
                button.src = "d12_orange.png";
            }
            if (button.dataset.type == "d20") {
                button.src = "d20_red.png";
            }
            if (button.dataset.type == "d100") {
                button.src = "d100_purple.png";
            }
            if (button.dataset.type == "coin") {
                button.src = "coin_grey.png";
            }
        })
    })
    dice.forEach(button => {
        button.addEventListener('mouseout', () => {
            if (button.dataset.type == "d4") {
                button.src = "d4.png";
            }
            if (button.dataset.type == "d6") {
                button.src = "d6.png";
            }
            if (button.dataset.type == "d8") {
                button.src = "d8.png";
            }
            if (button.dataset.type == "d10") {
                button.src = "d10.png";
            }
            if (button.dataset.type == "d12") {
                button.src = "d12.png";
            }
            if (button.dataset.type == "d20") {
                button.src = "d20.png";
            }
            if (button.dataset.type == "d100") {
                button.src = "d100.png";
            }
            if (button.dataset.type == "coin") {
                button.src = "coin.png";
            }
        })
    })
let numOne = 0;
let numTwo = 0;
let numThr = 0;
let typeOne;
let typeTwo;
let typeThr;
let typeOneVal = 0;
let typeTwoVal = 0;
let typeThrVal = 0;

// modifier buttons
modifier.forEach(button => {
    button.addEventListener('click', () => {
        if (numOne == 0) {return}
        else {
            if (typeTwo == undefined) {
                modOne = Number(button.value);
                modOneTotal += modOne;
                if (modOneTotal >= 0) {
                    displayDice.push(` ${numOne}${typeOne}+${modOneTotal}`);
                }
                else {
                    displayDice.push(` ${numOne}${typeOne}${modOneTotal}`);
                }
                displayDice.shift();
                display.innerText = displayDice;
            }
            else if (typeThr == undefined) {
                modTwo = Number(button.value);
                modTwoTotal += modTwo;
                if (modTwoTotal >= 0) {
                    displayDice.splice(-1, 1, ` ${numTwo}${typeTwo}+${modTwoTotal}`);
                }
                else {
                    displayDice.splice(-1, 1, ` ${numTwo}${typeTwo}${modTwoTotal}`);
                }
                display.innerText = displayDice;
            }
            else {
                modThr = Number(button.value);
                modThrTotal += modThr;
                if (modThrTotal >= 0) {
                    displayDice.splice(-1, 1, ` ${numThr}${typeThr}+${modThrTotal}`);
                }
                else {
                    displayDice.splice(-1, 1, ` ${numThr}${typeThr}${modThrTotal}`);
                }
                display.innerText = displayDice;
            }
        }
    })
})
let modOne = 0;
let modTwo = 0;
let modThr = 0;
let modOneTotal = 0;
let modTwoTotal = 0;
let modThrTotal = 0;

// hit die buttons
autoHit.addEventListener('click', () => {
    if (autoHitStatus == 0) {
        // on
        autoHit.style.backgroundColor = "green";
        autoHitStatus = 1;
    }
    else if (autoHitStatus == 1) {
        // off
        autoHit.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        autoHitStatus = 0;
        if (advantageStatus >= 1) {
            advantageStatus = 0;
            advantage.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
            advantage.innerHTML = "Advantage";
        }
    }
})

advantage.addEventListener('click', () => {
    if (advantageStatus == 0) {
        // adv on
        advantage.style.backgroundColor = "green";
        advantage.innerHTML = "Advantage";
        advantageStatus = 1;
        advText = " (adv)";
        autoHit.style.backgroundColor = "green";
        autoHitStatus = 1;
    }
    else if (advantageStatus == 1) {
        // dis on
        advantage.style.backgroundColor = "red";
        advantage.innerHTML = "Disadvantage";
        advantageStatus = 2;
        advText = " (dis)";
        autoHit.style.backgroundColor = "green";
        autoHitStatus = 1;
    }
    else if (advantageStatus == 2) {
        // off
        advantage.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        advantage.innerHTML = "Advantage";
        advantageStatus = 0;
        advText = "";
    }
})
autoRoll.addEventListener('click', () => {
    if (autoRollStatus == 0) {
        // on
        autoRoll.style.backgroundColor = "green";
        resetAll();
        autoRollStatus = 1;
    }
    else if (autoRollStatus == 1) {
        // off
        autoRoll.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        resetAll();
        autoRollStatus = 0;
    }
})
let autoHitStatus = 0;
let advantageStatus = 0;
let autoRollStatus = 0;
let advText = "";

// reset button
reset.addEventListener('click', resetAll);
function resetAll () {
    displayDice = [];
    dieCap = 0;
    numOne = 0;
    numTwo = 0;
    numThr = 0;
    typeOne = undefined;
    typeTwo = undefined;
    typeThr = undefined;
    typeOneVal = 0;
    typeTwoVal = 0;
    typeThrVal = 0;
    modOne = 0;
    modTwo = 0;
    modThr = 0;
    modOneTotal = 0;
    modTwoTotal = 0;
    modThrTotal = 0;
    display.innerText = "";
    result.innerText = "";
}

// roll button
roll.addEventListener('click', () => {
    if (numOne == 0) {
        return 
    }
    else {
        if (numTwo < 1) {
            result.innerText = "Result: "
                + Number(rndVal(numOne, typeOneVal)
                + modOneTotal + modTwoTotal + modThrTotal);
        }
        else if (numTwo > 0 && numThr < 1) {
            result.innerText = "Result: "
                + Number(rndVal(numOne, typeOneVal)
                + rndVal(numTwo, typeTwoVal)
                + modOneTotal + modTwoTotal + modThrTotal);
        }
        else {
            result.innerText = "Result: "
                + Number(rndVal(numOne, typeOneVal)
                + rndVal(numTwo, typeTwoVal)
                + rndVal(numThr, typeThrVal)
                + modOneTotal + modTwoTotal + modThrTotal);
        }
    }
    //autoHit on & advantage or disadvantage
    if (autoHitStatus == 1 && advantageStatus >= 1) {
        let advList = [];
        advList.push((Math.ceil(Math.random() * 20)));
        advList.push((Math.ceil(Math.random() * 20)));
        result.innerText += "\nHit: " + (advList);
    }
    //autoHit on & advantage off
    else if (autoHitStatus == 1 && advantageStatus == 0) {
        result.innerText += "\nHit: " + (Math.ceil(Math.random() * 20));
    }
    //adds result and hit to diceLog
    onlyNums = result.innerText.replace(/Result: /, "").replace(/\nHit: /, " / [");
    if (autoHitStatus == 0 && advantageStatus == 0) {
        diceLog.innerText += `\n${displayDice}: ${onlyNums}`;
    }
    else {
        diceLog.innerText += `\n${displayDice}: ${onlyNums}] ${advText}`;
    }
    diceLog.innerText = diceLog.innerText.replace(/Roll away!\n/, "")
});
function rndVal(num, val) {
    if (val == 0) {
        return
    }
    else {
        x = 0;
        for (i = 0; i < num; i++) {
            x += Number(Math.ceil(Math.random() * val));
            var total = x;
        }
        return total;
    }
}


// custom buttons
customBtn1.addEventListener('click', () => {
    result.innerText = "";
    if (displayDice == "" && customOne.storedDice == "") {
        alert("Choose the dice you want to save inside this button and then click me again!");
        console.log("custom1 is empty");
    }
    else if (displayDice !== "" && customOne.storedDice == "") {
        let btnName = prompt("Create a name for you custom button:", "Custom 1")
        if (btnName == "") {
            customOne.storedDice = displayDice;
            customBtn1.innerText = `${btnName}`;
            result.innerText = `Custom 1 - Saved`;
        }
        else if (btnName !== null) {
            customOne.storedDice = displayDice;
            customOne.name = btnName;
            customBtn1.innerText = `${btnName}`;
            result.innerText = `${customOne.name} - Saved`;
            console.log("dice saved1");
        }
        dieCap++;
    }
    else if (displayDice == "" || customOne.storedDice == displayDice && customOne.storedDice !== "") {
        displayDice = customOne.storedDice;
        display.innerText = customOne.storedDice;
        dieCap++;
/////
        console.log("dice executed");
    }
    else if (displayDice !== "" && customOne.storedDice !== "") {
        let btnNewName = prompt("Do you want to overwite the previously stored dice?", `${customOne.name}`)
        if (btnNewName !== null && btnNewName !== "") {
            customOne.name = btnNewName;
            customOne.storedDice = displayDice;
            result.innerText = `${customOne.name} - Saved`;
            console.log("custom1 overwritten");    
        }
    }
})
let customOne = {
    storedDice: "",
    formula: "",
    name: ""
};
let customeTwo = {
    storedDice: "",
    formula: "",
    name: ""
};