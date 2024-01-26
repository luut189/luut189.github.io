import { ELEMENT_DELAY } from './constants';

interface Section {
    associatedSection: HTMLElement;
    displayText: string;
    selected: boolean;
}

const mainSectionSelector = document.getElementById('main-section-selector')!
    .firstElementChild as HTMLDivElement;
const sideSectionSelector = document.getElementById('side-section-selector')!
    .firstElementChild as HTMLDivElement;

const sections: Section[] = [
    {
        associatedSection: document.getElementById('experience')!,
        displayText: 'Experience',
        selected: false,
    },
    {
        associatedSection: document.getElementById('skill')!,
        displayText: 'Skills',
        selected: false,
    },
    {
        associatedSection: document.getElementById('project')!,
        displayText: 'Projects',
        selected: false,
    },
    {
        associatedSection: document.getElementById('playground')!,
        displayText: 'Playground',
        selected: true,
    },
];

// can be undefined, but will be handle correctly
let currentSelectedSection: Section = sections.find((sec) => {
    return sec.selected;
})!;

export function initSectionSelector() {
    mainSectionSelector.replaceChildren();
    sideSectionSelector.replaceChildren();
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
        sec.associatedSection.classList.remove('inactive');
        sec.associatedSection.classList.add('active');
        ele.classList.add('selected');
    } else {
        sec.associatedSection.classList.remove('active');
        sec.associatedSection.classList.add('inactive');
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

    currentSelectedSection.associatedSection.style.transform = 'translate(0, 1rem)';
    currentSelectedSection.associatedSection.style.opacity = '0';
    setTimeout(() => {
        currentSelectedSection.associatedSection.style.transform = 'translate(0)';
        currentSelectedSection.associatedSection.style.opacity = '1';
    }, ELEMENT_DELAY);

    initSectionSelector();
}
