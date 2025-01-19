let firstCard = 4
let secondCard = 11
let message = ""
let changingMessage = document.getElementById("changing-message")
let sumMessage = document.getElementById("sum-message")
let cardMessage = document.getElementById("card-message")
let cards = []
let dealerCardArray = []
let dealerSum = 0
let sumOfCards = 0
let cardNum = 0
let isAlive = true
let hasBlackjack = false
const buttonElements = document.getElementById("button-div");
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
let startButton = document.getElementById("start-button")
let retryButton = document.getElementById("retryButton");
let cardImage = document.getElementById("card-img")
let dealerCards = document.getElementById("dealer-cards")
let entireGame = document.getElementById("runGame")
let dealerSumVisual = document.getElementById("dealer-sum")
let betSummary = document.getElementById("betSummary")
let betSummaryTwo = document.getElementById("betSummaryTwo")
const inputBet = document.getElementById("betAmt");
let dealerCardVisual = document.getElementById('content');
let bets = [];
const storedBets = sessionStorage.getItem('textValues');


if (storedBets !== null) {
    bets = JSON.parse(storedBets);
}
let createImage = function(src) {
    let img   = new Image();
    img.src   = src;
    return img; 
};

function startGame(){
    const betValue = inputBet.value;
    if (betValue) {
        bets.push(betValue); // Add the bet value to the array
        sessionStorage.setItem('textValues', JSON.stringify(bets)); // Store the bets in sessionStorage
    }
    startButton.remove()
    inputBet.remove()
    entireGame.removeAttribute("hidden")
    runDealerCardRandom()
    runDealerCardRandom()
    hit()
    hit()
    renderGame()
}


function runDealerCardRandom(){
    let randCardNum = (Math.random() * (4 - 1) + 1) << 0
    let randCardNum2 = (Math.random() * (3 - 1) + 1) << 0
    let randCardNum3 = (Math.random() * (1 - 0) + 0) << 0
    let dealerCard = getRandom()
    let dealerCardImg
    dealerSum += dealerCard

    if(dealerCard == 10){
        dealerCardImg = "KIN's_Playing_Cards/"+randCardNum+"_"+dealerCard+"_"+randCardNum2+".png"
    }else if(dealerCard == 11 || dealerCard == 1){
        dealerCardImg = "KIN's_Playing_Cards/"+randCardNum+"_"+1+".png"
    }else{
        dealerCardImg = "KIN's_Playing_Cards/"+randCardNum+"_"+dealerCard+".png"
    }
    dealerCardArray.push(createImage(dealerCardImg))
}

function addBets() {
    let total = 0;
    for (let i = 0; i < bets.length - 1; i++) {
        total += parseFloat(bets[i]);  // Convert to number if the bet is a string
    }
    return total;
}

document.getElementById("player-sum").textContent = "Total Winnings (or losses): $" + addBets()

function renderGame() {
    for(let i = 0; i < dealerCardArray.length; i++){
        var img = document.createElement('img')
        img = dealerCardArray[i];
        dealerCardVisual.appendChild(img);
    }
    dealerSumVisual.textContent = dealerSum
    betSummary.textContent = "Total Money Played: $"+ addBets()
    sumMessage.textContent = "Sum: " + sumOfCards
    cardMessage.textContent = "Cards: " + cards
    betSummaryTwo.textContent = "Bet Amount: $" + inputBet.value;
    if (sumOfCards <= 20) {
        message = "Draw Another Card?"
    } else if (sumOfCards == 21){
        message = "You Win!"
        hasBlackjack = true
    } else if (sumOfCards > 21){
        message = "You Lost!"
        isAlive = false

        const lastBetIndex = bets.length - 1;
        if (lastBetIndex >= 0) {
            bets[lastBetIndex] = -Math.abs(parseFloat(bets[lastBetIndex])); // Convert the bet amount to negative
            sessionStorage.setItem('textValues', JSON.stringify(bets)); // Update session storage
        }
    }
    changingMessage.textContent = message
    
    if(hasBlackjack == true || isAlive == false){
        buttonElements.removeChild(hitButton);
        buttonElements.removeChild(standButton);
        retryButton.onclick = retry
        retryButton.removeAttribute("hidden")
    }
}

function getRandom() {
    return (Math.random() * (11 - 1) + 1) << 0;
}

function hit() {
    let randCardNum = (Math.random() * (4 - 1) + 1) << 0
    let randCardNum2 = (Math.random() * (3 - 1) + 1) << 0
    let randCardNum3 = (Math.random() * (1 - 0) + 0) << 0
    let newCard = getRandom()
    sumOfCards += newCard
    cards.push(newCard)
    cardNum++
    if(newCard == 10){
        cardImage.src = "KIN's_Playing_Cards/"+randCardNum+"_"+newCard+"_"+randCardNum2+".png"
    }else if(newCard == 11 || newCard == 1){
        cardImage.src = "KIN's_Playing_Cards/"+randCardNum+"_"+1+".png"
    }else{
        cardImage.src = "KIN's_Playing_Cards/"+randCardNum+"_"+newCard+".png"
    }
    renderGame()
}

function stand() {

    dealerCardVisual.removeAttribute("hidden")
    dealerSumVisual.removeAttribute("hidden")
    
    while (dealerSum < 17 || (dealerSum < sumOfCards && dealerSum < 21)) {
        runDealerCardRandom();
        for(let i = 0; i < dealerCardArray.length; i++){
            var img = document.createElement('img')
            img = dealerCardArray[i];
            document.getElementById('content').appendChild(img);
        }
    }

    dealerSumVisual.textContent = dealerSum

    lastBetIndex = bets.length -1;

    if (dealerSum > 21 || dealerSum < sumOfCards) {
        changingMessage.textContent = "Player Wins!";
    } else if (dealerSum > sumOfCards) {
        changingMessage.textContent = "Dealer Wins!";
        bets[lastBetIndex] = -Math.abs(parseFloat(bets[lastBetIndex]));

    } else if (dealerSum === sumOfCards) {
        changingMessage.textContent = "It's a Tie!";
    }

    sessionStorage.setItem('textValues', JSON.stringify(bets));

    // Remove buttons and show retry
    buttonElements.removeChild(hitButton);
    buttonElements.removeChild(standButton);
    retryButton.onclick = retry;
    retryButton.removeAttribute("hidden");
}


function retry(){
    window.location.reload();
}