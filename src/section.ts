import { ELEMENT_DELAY } from './constants';

type Section = {
    HTMLSection: HTMLElement;
    displayText: string;
    selected: boolean;
};

const mainSectionSelector = document.getElementById('main-section-selector')!
    .firstElementChild as HTMLDivElement;
const sideSectionSelector = document.getElementById('side-section-selector')!
    .firstElementChild as HTMLDivElement;

const sections: Section[] = [
    {
        HTMLSection: document.getElementById('experience')!,
        displayText: 'Experience',
        selected: false,
    },
    {
        HTMLSection: document.getElementById('skill')!,
        displayText: 'Skills',
        selected: false,
    },
    {
        HTMLSection: document.getElementById('project')!,
        displayText: 'Projects',
        selected: false,
    },
    {
        HTMLSection: document.getElementById('playground')!,
        displayText: 'Playground',
        selected: true,
    },
];

// can be undefined, but will be handle correctly
let currentSelectedSection: Section = sections.find((sec) => {
    return sec.selected;
})!;

export function initSectionSelector() {
    sections.forEach((sec) => {
        const liForMain = document.createElement('li');
        const liForSide = document.createElement('li');

        setupElement(liForMain, sec);
        setupElement(liForSide, sec);

        mainSectionSelector.appendChild(liForMain);
        sideSectionSelector.appendChild(liForSide);
    });
}

function setupElement(ele: HTMLElement, sec: Section) {
    ele.textContent = sec.displayText;
    if (sec.selected) {
        sec.HTMLSection.classList.remove('inactive');
        sec.HTMLSection.classList.add('active');
        ele.classList.add('selected');
    } else {
        sec.HTMLSection.classList.remove('active');
        sec.HTMLSection.classList.add('inactive');
    }

    ele.addEventListener('click', () => {
        handleClick(sec);
    });
}

function handleClick(sec: Section) {
    if (currentSelectedSection == sec) return;
    if (currentSelectedSection === undefined) currentSelectedSection = sec;
    currentSelectedSection.selected = false;
    currentSelectedSection = sec;

    sec.selected = true;

    currentSelectedSection.HTMLSection.style.transform = 'translate(0, 1rem)';
    currentSelectedSection.HTMLSection.style.opacity = '0';
    setTimeout(() => {
        currentSelectedSection.HTMLSection.style.transform = 'translate(0)';
        currentSelectedSection.HTMLSection.style.opacity = '1';
    }, ELEMENT_DELAY);

    for (let i = 0; i < sections.length; i++) {
        let sec = sections[i];

        if (sec.selected) {
            mainSectionSelector.children.item(i)?.classList.add('selected');
            sideSectionSelector.children.item(i)?.classList.add('selected');
            sec.HTMLSection.classList.remove('inactive');
            sec.HTMLSection.classList.add('active');
        } else {
            mainSectionSelector.children.item(i)?.classList.remove('selected');
            sideSectionSelector.children.item(i)?.classList.remove('selected');
            sec.HTMLSection.classList.remove('active');
            sec.HTMLSection.classList.add('inactive');
        }
    }
}
