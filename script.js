const grid = document.getElementById("grid-container");
const scoreText = document.getElementById("score");

const images = [
  {
    id: 1,
    image: "/images/cheese/cheese1.jpg",
  },
  {
    id: 2,
    image: "/images/cheese/cheese2.jpg",
  },
  {
    id: 3,
    image: "/images/cheese/cheese3.jpg",
  },
  {
    id: 4,
    image: "/images/cheese/cheese4.jpg",
  },
  {
    id: 5,
    image: "/images/cheese/cheese5.jpg",
  },
  {
    id: 6,
    image: "/images/cheese/cheese6.jpg",
  },
  {
    id: 7,
    image: "/images/cheese/cheese7.jpg",
  },
  {
    id: 8,
    image: "/images/cheese/cheese8.jpg",
  },
  {
    id: 9,
    image: "/images/cheese/cheese9.jpg",
  },
  {
    id: 10,
    image: "/images/cheese/cheese10.jpg",
  },
  {
    id: 11,
    image: "/images/moose/moose1.jpg",
  },
  {
    id: 12,
    image: "/images/moose/moose2.jpg",
  },
  {
    id: 13,
    image: "/images/moose/moose3.jpg",
  },
  {
    id: 14,
    image: "/images/moose/moose4.jpg",
  },
  {
    id: 15,
    image: "/images/moose/moose5.jpg",
  },
  {
    id: 16,
    image: "/images/moose/moose6.jpg",
  },
  {
    id: 17,
    image: "/images/moose/moose7.jpg",
  },
  {
    id: 18,
    image: "/images/moose/moose8.jpg",
  },
  {
    id: 19,
    image: "/images/moose/moose9.jpg",
  },
  {
    id: 20,
    image: "/images/moose/moose10.jpg",
  },
];

const imagesArr = [];
const randomizedArr = [];
let choices = [];
let matches = [];
let score = 0;

// this loops twice and produces the desired effect but is ridiculous. try to figure out how to write this with possibly recursive method
function addPics() {
  images.forEach((image) => imagesArr.push(image));
  images.forEach((image) => imagesArr.push(image));
}

addPics();

// this function randomizes the imagesArr
function randomizeImages(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

randomizeImages(imagesArr);

// this function adds the images into div.tile and gives the .slide div a data attribute of data-id
function addTiles() {
  imagesArr.forEach((image) => {
    const slide = document.createElement("div");
    const square = document.createElement("div");
    slide.classList.add("slide");
    square.classList.add("tile");
    slide.setAttribute("data-id", image.id);
    square.style.backgroundImage = `url(${image.image})`;
    square.appendChild(slide);
    grid.appendChild(square);
  });
}

addTiles();

// this function compares the two tiles to see if they match
function matchTiles(e) {
  choices.push(e.target.getAttribute("data-id"));
  matches.push(e.target);
  console.log(matches);
  if (choices[0] === choices[1]) {
    score++;
    scoreText.classList.add("scoreGoBig");
    setTimeout(() => {
      scoreText.classList.remove("scoreGoBig");
    }, 1000);
    scoreText.innerHTML = `Score: ${score}`;
    matches.forEach((match) => {
      match.classList.add("match");
    });
  }
}

// this function closes all tiles after two choices have been made
function closeTiles(e) {
  if (choices.length >= 2) {
    choices = [];
    matches = [];
    setTimeout(() => {
      document.querySelectorAll(".slide").forEach((slide) => {
        slide.classList.remove("open");
      });
    }, 900);
  }
}

// this function add the open class to the tiles then does the comparison of the tiles by callig matchTiles then decides if they dont match to then call clearTiles
function openSlide(e) {
  if (e.target.matches(".slide")) {
    e.target.classList.add("open");
  }
  matchTiles(e);
  closeTiles(e);
}

document.querySelectorAll(".slide").forEach((slide) => {
  slide.addEventListener("click", (e) => {
    openSlide(e);
  });
});
