"use strict";
const canvas = document.getElementById('tic-tac-toe');
const context = canvas.getContext('2d');
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = 'red';
context.font = '30px Arial';
context.fillText('Testing Field', 0, canvas.height / 2);
