import { ELEMENT_DELAY } from './constants';

export function initLink() {
    const http = 'https://';
    const linkSaverWrapper = document.getElementById('link-saver') as HTMLDivElement;
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
        link.textContent = web.name;
        link.style.transform = 'scale(0)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, linkDelay);
        linkDelay += ELEMENT_DELAY;
        linkSaverWrapper.appendChild(link);
    });
}
