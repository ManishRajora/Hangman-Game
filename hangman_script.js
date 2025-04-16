const wordEl = document.getElementById('word');
const genere = document.getElementById('genere');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const final_msg = document.getElementById('final-msg');
const notification = document.getElementById('notification-container');
const figure_part = document.querySelectorAll('.figure-part');

const word_genere = ['Animal'];
const words = {
    'Animal' : ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Monkey', 'Gorilla', 'Chimpanzee', 'Dog', 'Cat', 'Horse', 'Cow', 'Pig', 'Sheep', 'Goat', 'Seal', 'Fox', 'Wolf', 'Deer', 'Bear', 'Rabbit', 'Squirrel', 'Mouse', 'Beaver', 'Otter', 'Skunk', 'Raccoon', 'Kangaroo', 'Koala', 'Hippo', 'Rhino', 'Camel', 'Lama', 'Cheetah', 'Leopard', 'Jaguar', 'Puma', 'Hyena', 'Sloth', 'Bison', 'Buffalo', 'Hedgehog', 'Mole', 'Panda', 'Baboon', 'Platypus', 'Porcupine', 'Mongoose'],
};

let selected_genere = word_genere[Math.floor(Math.random() * word_genere.length)];
let selected_word = words[selected_genere][Math.floor(Math.random() * words[selected_genere].length)];
console.log(selected_word);