const wordEl = document.getElementById('word');
const genere = document.getElementById('genere');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const final_msg = document.getElementById('final-msg');
const notification = document.getElementById('notification-container');
const figure_part = document.querySelectorAll('.figure-part');
const win_figure_part = document.querySelectorAll('.win-figure');
const win_figure_arm_up = document.querySelectorAll('.win-figure-arm-up');
const win_figure_arm_down = document.querySelectorAll('.win-figure-arm-down');
const alphabet_btn = document.querySelectorAll('.alphabet');
const current_score = document.getElementById('score1');
const high_score = document.getElementById('score2');
const definition_container = document.getElementById('definition-container');
const hint_para = document.getElementById('hint-para');
const definition_btn = document.getElementById('definition-btn');
const letter_btn = document.getElementById('letter-btn');
const close_hint_btn = document.getElementById('close-hint');
const exitBtn = document.getElementById('exit');

const word_genere = ['Animal', 'Horror', 'Continent', 'Fantasy', 'Bird', 'Electronics item', 'Daily use electric item', 'Action Movie', 'Indian Comedy Movie', 'Horror Movie', 'Fantasy Movie'];
const words = {
    'Animal' : ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Monkey', 'Gorilla', 'Chimpanzee', 'Dog', 'Cat', 'Horse', 'Cow', 'Pig', 'Sheep', 'Goat', 'Seal', 'Fox', 'Wolf', 'Deer', 'Bear', 'Rabbit', 'Squirrel', 'Mouse', 'Beaver', 'Otter', 'Skunk', 'Raccoon', 'Kangaroo', 'Koala', 'Hippo', 'Rhino', 'Camel', 'Lama', 'Cheetah', 'Leopard', 'Jaguar', 'Puma', 'Hyena', 'Sloth', 'Bison', 'Buffalo', 'Hedgehog', 'Mole', 'Panda', 'Baboon', 'Platypus', 'Porcupine', 'Mongoose'],
    'Horror': ["scary", "monster", "ghost", "evil", "fear", "haunted", "creepy", "paranormal", "demon", "vampire", "zombie", "curse"],
    'Continent' : ['Asia', 'Africa', 'Europe', 'NorthAmerica', 'SouthAmerica', 'Australia', 'Antarctica'],
    "Fantasy": ["magic", "dragon", "elf", "sword", "kingdom", "quest", "sorcerer", "mythical", "artifact", "prophecy", "hero", "villain", "spell", "ancient", "forest", "castle", "enchantment", "destiny", "creature", "legend"],
    'Bird' : ['Falcon', 'Sparrow', 'Robin', 'Cardinal', 'Finch', 'Eagle', 'Hawk', 'Owl', 'Pigeon', 'Dove','Crow', 'Raven', 'Stork', 'Heron', 'Crane', 'Kingfisher', 'Woodpecker', 'Hummingbird', 'Swallow', 'Martin', 'Wren', 'Warbler', 'Thrush', 'Nightingale', 'Mockingbird', 'Canary', 'Parrot', 'Cockatoo', 'Macaw', 'Pelican', 'Seagull', 'Albatross', 'Penguin', 'Ostrich', 'Emu', 'Kiwi', 'Turkey', 'Duck', 'Goose', 'Swan', 'Pheasant', 'Quail', 'Partridge', 'Grouse', 'Peacock', 'Flamingo', 'Toucan', 'Jay', 'Magpie', 'Kite', 'Pelican'],
    'Electronics item' : ['Resistor', 'Capacitor', 'Inductor', 'Diode', 'Transistor', 'Microcontroller', 'Microprocessor', 'Sensor', 'Actuator', 'Amplifier', 'Oscillator', 'Filter', 'Rectifier', 'Inverter', 'Converter', 'Semiconductor', 'Display', 'LED', 'LCD', 'OLED', 'Speaker', 'Microphone', 'Antenna', 'Breadboard', 'Multimeter', 'Oscilloscope', 'Potentiometer', 'Thermistor', 'Photodiode', 'Transducer', 'Optocoupler'],
    'Daily use electric item' : ['Bulb', 'Fan', 'Refrigerator', 'Television', 'Smartphone', 'Laptop', 'Oven', 'Iron', 'Heater', 'AC', 'Toaster', 'Stove', 'Cooker', 'HairDryer', 'Adapter', 'Socket', 'Switch', 'MCB', 'Fuse', 'Inverter', 'Stabilizer', 'Remote', 'Dishwasher', 'Camera', 'Doorbell', 'Headphones', 'Earphones', 'AlarmClock'],
    'Action Movie': ['Rambo', 'Predator', 'Commando', 'RoboCop', 'Speed', 'Taken', 'Avengers', 'Skyfall', 'Dredd', 'Run', 'Batman', 'Terminator', 'Superman', 'Joker', 'Flash', 'Deadpool', 'Antman', 'Hulk', 'Ironman', 'CaptainAmerica', 'BlackWidow', 'Hawkeye', 'Spiderman', 'Wolverine', 'WonderWoman', 'KGF', 'Salaar', 'War', 'IndependenceDay', 'Pushpa', 'RRR', 'StarWars', 'Mandalorian', 'Loki', 'Thor', 'Krrish'],
    'Indian Comedy Movie' : ['Welcome', 'Housefull', 'Dhamaal', 'Golmaal', 'Hungama', 'Dhol', 'Partner', 'NoEntry', 'PK', 'DreamGirl', 'Stree', 'HeraPheri', 'Hulchul', 'Ishq', 'Ready', 'BhoolBhulaiyaa', 'NoProblem'],
    'Horror Movie' : ['Annabelle', 'Insidious', 'Exorcism', 'TheRing', 'Conjuring', 'EvilDead'],
    'Fantasy Movie' : ['HarryPotter', 'Zathura', 'Jumanji', 'HellBoy', 'Ghostbusters', 'Avatar', 'Hobbit']
};

let selected_genere = word_genere[Math.floor(Math.random() * word_genere.length)];
let selected_word = words[selected_genere][Math.floor(Math.random() * words[selected_genere].length)].toUpperCase();

const correct_letters = [];
const wrong_letters = [];

let curr_score = parseInt(localStorage.getItem('current_score')) || 0;
let hi_score = localStorage.getItem('high_score') || 0;

displayScores();

getDefinition();
// getting data from dictionary API
async function getDefinition(){
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selected_word}`);
    const data = await response.json();

    if(data.title){
        hint_para.innerText = 'No hint required';
    }else{
        const req_data = data['0'].meanings;
        const definition = req_data['0'].definitions['0'].definition;
        hint_para.innerText = definition;
    }
}

// update current score
function updateCurrentScore(points){
    curr_score += points;
    current_score.innerText = curr_score;
    localStorage.setItem('current_score', curr_score);
}

// update high score and put in local storage
function updateHighScore(){
    if(curr_score > hi_score){
        hi_score = curr_score;
        localStorage.setItem('high_score', hi_score);
    }
    high_score.innerText = hi_score;
}

// display Scores
function displayScores(){
    current_score.innerText = curr_score;
    high_score.innerText = hi_score;
}

let interval_ID;   // declare variable to store interval ID to clear interval in playAgain event
// show hidden word
function displayWord(){
    wordEl.innerHTML = `${selected_word.split('').map(letter => `<span class='letter'>${correct_letters.includes(letter) ? letter : ''}</span>`).join('')}`;
    genere.innerText = `${selected_genere}`;

    const inner_word = wordEl.innerText.replace(/\n/g, '');
    if(inner_word === selected_word){
        figure_part.forEach(part => {
            part.style.display = 'none';
        });
        win_figure_part.forEach(part => {
            part.style.display = 'block';
        });

        win_figure_arm_up.forEach(part => {
            part.style.display = 'block';
        });

        let arm_up = false;
        interval_ID = setInterval(() => {
            if (arm_up) {
                win_figure_arm_up.forEach(part => {
                    part.style.display = 'block';
                });
                win_figure_arm_down.forEach(part => {
                    part.style.display = 'none';
                });
            } else {
                win_figure_arm_up.forEach(part => {
                    part.style.display = 'none';
                });
                win_figure_arm_down.forEach(part => {
                    part.style.display = 'block';
                });
            }
            arm_up = !arm_up;
        }, 400);

        updateCurrentScore(10);  // award of 10 points on winning
        updateHighScore();

        setTimeout(() => {
            final_msg.innerText = 'Congratulations! You Won 😄';
            popup.style.display = 'flex';
        }, 2000);
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
        localStorage.removeItem('current_score');
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

// show hint -> definition
definition_btn.addEventListener('click', function(){
    updateCurrentScore(-5);
    definition_container.style.display = 'flex';
});

// hide hint 
close_hint_btn.addEventListener('click', function(){
    definition_container.style.display = 'none';
});

// play again
playAgainBtn.addEventListener('click', function(){
    window.location.reload();
});

exitBtn.addEventListener('click', function(){
    window.close();
});

displayWord();