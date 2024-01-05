'use strict';

const anchorClickable = document.getElementsByTagName('a');
const buttonClickable = document.getElementsByTagName('button');
for (const anchor of anchorClickable) {
    anchor.addEventListener('mouseover', () => {
        anchor.setAttribute('style', 'transform: scale(0.8)');
    });
    anchor.addEventListener('mouseleave', () => {
        anchor.setAttribute('style', 'transform: scale(1)');
    });
}
for (const button of buttonClickable) {
    button.addEventListener('click', () => {
        button.setAttribute('style', 'transform: scale(0.8)');
        setTimeout(() => {
            button.setAttribute('style', 'transform: scale(1)');
        }, 200);
    });
}