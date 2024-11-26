let con = document.querySelectorAll(".con");
let pc = document.querySelectorAll(".pc");
let triangle = document.querySelector(".triangle");
let random;
let user = document.querySelector(".user");
let machine = document.querySelector(".machine");
let winModal = document.querySelector(".win-modal");
let winner = document.querySelector(".winner");
let play = document.querySelector(".play-again");
let btnRule = document.querySelector(".btn-rule");
let ruleModal = document.querySelector(".rule-modal");
let close = document.querySelector(".close");
let computerScoreElem = document.querySelectorAll(".score span")[0];
let userScoreElem = document.querySelectorAll(".score span")[1];

let scores = JSON.parse(localStorage.getItem("scores")) || {
  user: 0,
  computer: 0,
};
updateScores();

con.forEach((element, index) => {
  element.addEventListener("click", () => {
    user.style.opacity = "1";
    triangle.style.display = "none";
    con.forEach((item) => {
      item.style.display = "none";
    });
    element.style.display = "block";
    element.classList.add("show");

    random = Math.floor(Math.random() * 3);
    setTimeout(() => {
      machine.style.opacity = "1";
      pc[random].style.display = "block";
      pc[random].classList.add("right");

      setTimeout(() => {
        determineWinner(index, random);
      }, 500);
    }, 500);
  });
});

play.addEventListener("click", () => {
  window.location.reload();
});

btnRule.addEventListener("click", () => {
  ruleModal.style.display = "block";
});

close.addEventListener("click", () => {
  ruleModal.style.display = "none";
});

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    showResult("TIE UP");
  } else if (
    (userChoice === 0 && computerChoice === 2) ||
    (userChoice === 1 && computerChoice === 0) ||
    (userChoice === 2 && computerChoice === 1)
  ) {
    scores.user++;
    showResult("YOU WIN");
  } else {
    scores.computer++;
    showResult("YOU LOST");
  }
  updateScores();
}

function showResult(message) {
  winModal.style.display = "grid";

  winner.textContent = "";

  if (message === "YOU WIN") {
    winner.style.display = "block";
    winner.textContent = `${message} AGAINST PC`;
  } else if (message === "YOU LOST") {
    winner.style.display = "block";
    winner.textContent = `${message} AGAINST PC`;
  } else if (message === "TIE UP") {
    winner.style.display = "block";
    winner.textContent = message;
  }
}

function updateScores() {
  computerScoreElem.textContent = scores.computer;
  userScoreElem.textContent = scores.user;

  localStorage.setItem("scores", JSON.stringify(scores));
}
