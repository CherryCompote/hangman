let words3 =[]

const words3Data =
  localStorage.getItem('words3');
if (words3Data) {
  words3 = JSON.parse(words3Data);
}

if (words3.length === 0) {
  window.location.replace("404.html")
  
}

let index = Math.floor(Math.random() * words3.length)
let selectedText =
  words3[index];
let maskedWord = '_ '.repeat(selectedText.length);

let attempts = 7;

document.getElementById('wordDisplay').textContent = maskedWord;

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
console.log(alphabet)
const keyboardDiv = document.getElementById('keyboard');

alphabet.forEach(letter => {
  const button = document.createElement('button');
  button.textContent = letter.toUpperCase();
  button.addEventListener('click', function(){
    guessLetter(letter, this);
  })
  keyboardDiv.appendChild(button);
})

function guessLetter(guess, button){
  if(selectedText.includes(guess)){
    button.classList.add('correct');
    revealLetter(guess);
  }else{
    button.classList.add('incorrect');
    attempts--;
    updateHangmanImage();
    document.querySelector('.scoreBoard').textContent = `Attempts left: ${attempts}`;

    if (attempts === 0){
      removeWord();
      document.querySelector('.wordDisplay').textContent
      =`Game Over! The word was:${selectedText}.`;
      setTimeout(()=> location.reload(),5000);
      }  
  }
}
function revealLetter(letter) {
  let updatedWord = '';
  for (let i = 0; i < selectedText.length; i++) {
    if (selectedText[i] === letter) {
      updatedWord += letter + ' ';
    } else {
      updatedWord += maskedWord[i * 2] + ' ';
    }
  }
  maskedWord = updatedWord;
  document.getElementById('wordDisplay')
.textContent = maskedWord;
  checkGameStatus();
}

function updateHangmanImage() {
  const imgPath =`Images/hangman${7 - attempts}.png`;
  document.getElementById('hangmanImg').src = imgPath
}

function checkGameStatus() {
  if (!maskedWord.includes('_')){
    removeWord();
    document.querySelector('.wordDisplay').textContent = `Congratulations! You got the word! The word was: ${selectedText}.`;
  }
  disableKeyboard();
}
function refreshPage() {
      location.reload();
    }

function removeWord(){
  words3.splice(index, 1);
  localStorage.setItem("words3", JSON.stringify(words3));
}