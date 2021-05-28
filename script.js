const grid = document.getElementById("grid-container");
const matchesText = document.getElementById("matches");
const easyBtn = document.getElementById("easy-btn");
const mediumBtn = document.getElementById("medium-btn");
const hardBtn = document.getElementById("hard-btn");
const playAgain = document.getElementById("play-again-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const winScreen = document.getElementById("win-screen");
const loadingScreen = document.getElementById("loading-screen");

let images = [];
let imagesArr = [];
let randomizedArr = [];

let choices = {
  choiceOne: null,
  choiceTwo: null,
};
let matches = [];
let close = false;
let currentSlide = null;

let matchesMade = 0;

let difficulty = null;

const animationTime = 1000;

// Loop through images in icon folder and make an array.
function fillImages() {
  for (let i = 1; i <= difficulty; i++) {
    images.push({ id: i, image: `/icons/icon${i}.png` });
  }
}

// Loop through the images array twice to make matching copies.
function addPics() {
  for (let i = 1; i <= 2; i++) {
    images.forEach((image) => imagesArr.push(image));
  }
}

// Randomize the imagesArr
function randomizeImages(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

// Set the grid size based on difficulty.
function setGrid(difficulty) {
  switch (difficulty) {
    case 10:
      grid.style.setProperty("--gridCol", 5),
        grid.style.setProperty("--gridRow", 4);
      break;

    case 15:
      grid.style.setProperty("--gridCol", 6),
        grid.style.setProperty("--gridRow", 5);
      break;

    case 20:
      grid.style.setProperty("--gridCol", 8),
        grid.style.setProperty("--gridRow", 5);
      break;
    default:
      return;
  }
}

// Loop the images array and add images to the DOM.
function addTiles() {
  imagesArr.forEach((image, index) => {
    const slide = document.createElement("div");
    const square = document.createElement("div");
    slide.classList.add("slide");
    square.classList.add("tile");
    slide.setAttribute("data-id", image.id);
    slide.setAttribute("data-slide-id", index);
    square.style.backgroundImage = `url(${image.image})`;
    square.appendChild(slide);
    grid.appendChild(square);
  });
}

// Gather the id of the image and set to the choices object. Set the slide id to the currentSlide varibale. After two choices are made reset choices, matches and currentSlide.
function chooseTiles(e) {
  const id = e.target.getAttribute("data-id");
  const slide = e.target.getAttribute("data-slide-id");
  if (choices.choiceOne === null) {
    choices.choiceOne = id;
    matches.push(e.target);
    currentSlide = slide;
  } else if (currentSlide !== slide) {
    choices.choiceTwo = id;
    matches.push(e.target);

    setTimeout(() => {
      (choices = {
        choiceOne: null,
        choiceTwo: null,
      }),
        (matches = []);
      currentSlide = null;
    }, 100);
  }
}

// Toggle the close flag to close tiles. When true remove the open class.
function closeTiles() {
  if (choices.choiceTwo !== null) {
    close = true;
    setTimeout(() => {
      document.querySelectorAll(".slide").forEach((slide) => {
        slide.classList.remove("open");
      });
      close = false;
    }, animationTime);
  }
}

// Compare tile choices in the choices object. If a match has beeen made remove event listener from tile to remove tile from the game then increase score.
function matchTiles() {
  if (choices.choiceOne === choices.choiceTwo) {
    matches.forEach((match) => {
      match.classList.add("match");
      match.removeEventListener("click", slideEvent);
      setTimeout(() => {
        match.classList.remove("slide");
        match.style.backgroundImage = "url(/images/empty-block.png)";
      }, animationTime);
    });

    matchesMade++;
    matchesText.classList.add("matchesScale");
    setTimeout(() => {
      matchesText.classList.remove("matchesScale");
    }, animationTime);
    matchesText.innerHTML = `Matches: ${matchesMade}`;
  }
}

// Run tile choosing functions and display win screen when matches made equals the difficulty.
function openSlide(e) {
  e.target.classList.add("open");

  chooseTiles(e);
  closeTiles();
  matchTiles();

  if (matchesMade === difficulty) {
    setTimeout(() => {
      gameScreen.style.display = "none";
      winScreen.style.display = "flex";
    }, animationTime);
  }
}

// Event function for tiles.
function slideEvent(e) {
  if (close === false) {
    openSlide(e);
  }
}

// Start the game.
function startGame(e) {
  difficulty = +e.target.getAttribute("value");
  startScreen.style.display = "none";
  loadingScreen.style.display = "flex";
  setTimeout(() => {
    loadingScreen.style.display = "none";
    gameScreen.style.display = "flex";
    fillImages();
    addPics();
    randomizeImages(imagesArr);
    addTiles();
    setGrid(difficulty);

    document.querySelectorAll(".slide").forEach((slide) => {
      slide.addEventListener("click", slideEvent);
    });
  }, animationTime);
}

// Restart the game.
function restartGame() {
  images = [];
  imagesArr = [];
  randomizedArr = [];
  matches = [];
  matchesMade = 0;
  matchesText.innerText = `Matches ${matchesMade}`;
  gameScreen.style.display = "none";
  winScreen.style.display = "none";
  startScreen.style.display = "flex";
  document.querySelectorAll(".tile").forEach((tile) => grid.removeChild(tile));
}

easyBtn.addEventListener("click", (e) => startGame(e));
mediumBtn.addEventListener("click", (e) => startGame(e));
hardBtn.addEventListener("click", (e) => startGame(e));
playAgain.addEventListener("click", () => restartGame());
