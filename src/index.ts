'use strict';
const anchorClickable = document.getElementsByTagName('a');
const buttonClickable = document.getElementsByTagName('button');
console.log(buttonClickable.length);

for (const anchor of anchorClickable) {
    anchor.addEventListener('mouseover', () => {
        anchor.style.transform = 'scale(0.8)';
    });
    anchor.addEventListener('mouseleave', () => {
        anchor.style.transform = 'scale(1)';
    });
}
for (const button of buttonClickable) {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.8)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    });
}
