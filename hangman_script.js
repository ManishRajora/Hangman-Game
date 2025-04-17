const wordEl = document.getElementById('word');
const genere = document.getElementById('genere');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const final_msg = document.getElementById('final-msg');
const notification = document.getElementById('notification-container');
const figure_part = document.querySelectorAll('.figure-part');
const win_figure_part = document.querySelectorAll('.win_figure');
const alphabet_btn = document.querySelectorAll('.alphabet');

const word_genere = ['Animal', 'Horror', 'Continent'];
const words = {
    'Animal' : ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Monkey', 'Gorilla', 'Chimpanzee', 'Dog', 'Cat', 'Horse', 'Cow', 'Pig', 'Sheep', 'Goat', 'Seal', 'Fox', 'Wolf', 'Deer', 'Bear', 'Rabbit', 'Squirrel', 'Mouse', 'Beaver', 'Otter', 'Skunk', 'Raccoon', 'Kangaroo', 'Koala', 'Hippo', 'Rhino', 'Camel', 'Lama', 'Cheetah', 'Leopard', 'Jaguar', 'Puma', 'Hyena', 'Sloth', 'Bison', 'Buffalo', 'Hedgehog', 'Mole', 'Panda', 'Baboon', 'Platypus', 'Porcupine', 'Mongoose'],
    'Horror': ["scary", "monster", "ghost", "evil", "fear", "haunted", "creepy", "paranormal", "demon", "vampire", "zombie", "curse"],
    'Continent' : ['Asia', 'Africa', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica']
};

let selected_genere = word_genere[Math.floor(Math.random() * word_genere.length)];
let selected_word = words[selected_genere][Math.floor(Math.random() * words[selected_genere].length)].toUpperCase();

const correct_letters = [];
const wrong_letters = [];

// show hidden word
function displayWord(){
    wordEl.innerHTML = `${selected_word.split('').map(letter => `<span class='letter'>${correct_letters.includes(letter) ? letter : ''}</span>`).join('')}`;
    genere.innerText = `${selected_genere}:`;

    const inner_word = wordEl.innerText.replace(/\n/g, '');
    if(inner_word === selected_word){
        setTimeout(() => {
            final_msg.innerText = 'Congratulations! You Won 😄';
            popup.style.display = 'flex';
        }, 100);
    }
}

// update figure part on each wrong letter
function updateFigurePart(){
    figure_part.forEach((part, index) => {
        const errors = wrong_letters.length;
        if(index < errors){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    });

    // checking if lost
    if(wrong_letters.length === figure_part.length){
        setTimeout(() => {
            final_msg.innerText = `Unfortunately You Lost 😭 \n The Word was "${selected_word}"`;
            popup.style.display = 'flex';
        }, 300);
    }
}

// show notification
function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// event listner on alphabet click
alphabet_btn.forEach((button) => {
    button.addEventListener('click', function(){
        const key = this.innerText;
        if(selected_word.includes(key)){
            if(!correct_letters.includes(key)){
                correct_letters.push(key);
                button.style.backgroundColor = 'Green';
                button.style.transform = 'scale(1)';
                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrong_letters.includes(key)){
                wrong_letters.push(key);
                button.style.backgroundColor = 'red';
                button.style.transform = 'scale(1)';
                updateFigurePart();
            }else{
                showNotification();
            }
        }
    });
});

playAgainBtn.addEventListener('click', function(){
    window.location.reload();
});

displayWord();