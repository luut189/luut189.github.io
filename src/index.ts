'use strict';
import { ELEMENT_DELAY } from './constants';

const http = 'https://';
const linkSaverWrapper = document.getElementById(
    'link-saver'
) as HTMLDivElement;
const savedWebsite = [
    {
        name: 'Facebook',
        url: 'facebook.com',
    },
    {
        name: 'YouTube',
        url: 'youtube.com',
    },
];

let linkDelay = ELEMENT_DELAY;
savedWebsite.forEach((web) => {
    const link = document.createElement('a');
    link.className = 'clickable';
    link.href = http + web.url;
    link.innerHTML = web.name;
    link.setAttribute('style', 'transform: scale(0)');
    setTimeout(() => {
        link.setAttribute('style', 'transform: scale(1)');
    }, linkDelay);
    linkDelay += ELEMENT_DELAY;
    linkSaverWrapper.appendChild(link);
});

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
