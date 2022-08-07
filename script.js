//  SELECTORS
const container = document.querySelector(".card-container"); // holds all the cards
const lives = document.querySelector("span"); // holdes the lives diplayed in the page
let life = 6; // maximum lifes per game
let chosenCards = []; // stores two cards after two click
let matchedCards = []; // store all the matched cards
//
const randNum = []; // holds already generate random numbers
// Images
const pics = [
  { src: "images/banana1.png", id: 1 },
  { src: "images/banana2.png", id: 1 },
  { src: "images/ice1.png", id: 2 },
  { src: "images/ice2.png", id: 2 },
  { src: "images/child1.png", id: 3 },
  { src: "images/child1.png", id: 3 },
  { src: "images/car1.png", id: 4 },
  { src: "images/car2.png", id: 4 },
  { src: "images/lion1.png", id: 5 },
  { src: "images/lion2.png", id: 5 },
  { src: "images/bulb1.png", id: 6 },
  { src: "images/bulb2.png", id: 6 },
];

// Evenlistener
window.addEventListener("load", generateCards); // generate cards automatically when the window loads
lives.addEventListener("onchange");
// Functions
function generateCards() {
  // a function to generate the cards
  randomNumber(); // invoke a function that returns array of random number
  let imgSrc; // holds the img path

  for (let i = 0; i < 12; i++) {
    // loops 12 times to generate each card and assign image from the array using the random numbers

    // create a card div element and assign it data attribute id
    // the id will be used to check if two images match
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.test = pics[randNum[i]].id;

    // create a div element that covers the image
    // it acts as a back face
    const blank = document.createElement("div");
    blank.classList.add("hide-img");

    // create image element and assign image src
    const img = document.createElement("img");
    img.classList.add("card-image");
    imgSrc = pics[randNum[i]].src;
    img.src = imgSrc;

    // add element to container and card
    card.appendChild(img);
    card.appendChild(blank);

    container.appendChild(card); // add card to container

    // event listerner for each card click
    card.addEventListener("click", () => {
      if (chosenCards.length != 2) {
        // make sure multiple cards reveal when user clicks on multiple cards
        card.classList.add("rotate"); // if a card is clicked rotate the card to reveal image
      }
      if (!chosenCards.includes(card)) {
        // check if clicked card is not clicked twice ( so that it is not repeated in the chosen card array)
        chosenCards.push(card); // if not in chosen card push the card
      }
      if (chosenCards.length == 2) {
        // if two cards are revealed/ rotated (we have 2 unique cards in chosenCards array )
        checkMatch(chosenCards[0], chosenCards[1]); // we check if the images of the 2 cards are the same
      }
    });
  }
}

function won() {
  // a function that runs if game is lost
  alert("👏 🥇 You Won"); // alert user
  life = 6;
  lives.innerText = life;
  restart(); // restart new game
}

function loss() {
  // a function that runs if game is lost
  alert("👎 You Lost"); // alert user
  life = 6;
  lives.innerText = 6;
  restart(); // restart new game
}

function checkMatch(a, b) {
  // a function to check if cards match

  
  if (life === 0) {
    loss();
  } // if life is zero, game is lost

  if (a.dataset.test == b.dataset.test) {
    // check if the id of two cards are the same
    // if images match push the cards to the matched cards array
    matchedCards.push(a);
    matchedCards.push(b);

    // make sure the two cards are not clicked again
    a.style.pointerEvents = "none";
    b.style.pointerEvents = "none";

    // update the chosen cards array, inorder to store 2 new cards
    chosenCards = [];
    if (matchedCards.length === 12) {
      won();
    } // if all cards match the game is won
  } else {
    // else
    tiemout = setTimeout(update, 1000); // create a time out

    function update() {
      // a function to hide unmatching images so that their backface is shown
      // remove the rotation from the 2 cards
      a.classList.remove("rotate");
      b.classList.remove("rotate");

      life -= 1; // decrement the life of the game
      lives.innerText = life; // update the value of lives displayed
      chosenCards = []; // update the chosen cards, empty it for new cards
    }
  }

 
}

function randomNumber() {
  // a function that generates 12 random numbers
  while (randNum.length < 12) {
    // checks only 12 random numbers are generated
    const rand = Math.floor(Math.random() * 12); // generate random number
    if (!randNum.includes(rand)) {
      // if the random number is not repeated
      randNum.push(rand); // store in in the randNum array
    }
  }
}

function restart () {
  chosenCards = [];
  matchedCards = [];
  container.innerText = "";
  generateCards();
};
