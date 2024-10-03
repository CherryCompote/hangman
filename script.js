const words = ["candy","dessert","sunday","underscore","teleport"];
const words2 = ["bedtime","disgusting","rectangle","sesame",
"sneakers"];

let selectedText;

if(Math.random() < 0.5){
  selectedText=words[Math.floor(Math.random() * words.length)];
 }else{
  selectedText=words2[Math.floor(Math.random() * words2.length)];
}

let maskedWord = '_ '.repeat(selectedText.length);

let attempts = 7;

document.getElementById('wordDisplay').textContent = maskedWord;

console.log('the word/sentence is', selectedText)

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
    document.querySelector('.wordDisplay').textContent = `Congratulations! You got the word! The word was: ${selectedText}.`;
  }
  disableKeyboard();
}
function refreshPage() {
      location.reload();
}