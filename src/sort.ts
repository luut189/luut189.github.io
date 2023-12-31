import { getRandomInt } from './utils';

interface Sorter {
    name: string;
    function: Function;
}

const wrapper = document.getElementById('sorting') as HTMLDivElement;
const startSortButton = document.getElementById('sort-start') as HTMLButtonElement;
const startRandomButton = document.getElementById('random-start') as HTMLButtonElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;
const algorithmSelector = document.getElementById('sort-select') as HTMLSelectElement;

const defaultWidth = 5;
const scale = 20;
let totalBar = document.documentElement.offsetWidth / scale;
let barValue: number[] = [];

let chosenAlgorithmIndex = 0;
const sortingFunction: Sorter[] = [
    {
        name: 'Bubble Sort',
        function: bubbleSort,
    },
    {
        name: 'Insertion Sort',
        function: insertionSort,
    },
];

sortingFunction.forEach((sorter) => {
    const option = document.createElement('option');
    option.text = sorter.name;

    algorithmSelector.add(option);
});

addEventListener('resize', () => {
    initBar(false);
});
initBar(true);

startSortButton.addEventListener('click', () => {
    sortBar();
});
startRandomButton.addEventListener('click', () => {
    randomizeBar();
});
resetButton.addEventListener('click', () => {
    initBar(false);
});

function getBarStyle(value: number, color: string) {
    return `margin: 0; width: ${
        totalBar / 20 > defaultWidth ? totalBar / 20 : defaultWidth
    }px; height: ${value}px; background-color: ${color}`;
}

function colorBar(color: string, bar: HTMLElement, delay = 1) {
    bar.style.backgroundColor = color;
    setTimeout(() => {
        bar.style.backgroundColor = 'var(--bar-color)';
    }, delay);
}

function initBar(firstInit: boolean) {
    totalBar = document.documentElement.offsetWidth / scale;
    if (!firstInit) {
        let id = window.setTimeout(function () {}, 0);
        while (id--) {
            window.clearTimeout(id);
        }
    }
    barValue = [];
    for (let i = 0; i < totalBar; i++) {
        const value = getRandomInt(50, 300);
        barValue.push(value);
    }
    recreateBar(barValue);
}

function recreateBar(barValue: number[]) {
    wrapper.replaceChildren();
    barValue.forEach((value) => {
        const bar = document.createElement('div');
        bar.setAttribute('style', getBarStyle(value, 'var(--bar-color)'));
        wrapper.appendChild(bar);
    });
}

function smoothBarColor(color: string) {
    let index = 0;
    flashBar();
    function flashBar() {
        const bars = wrapper.children;
        colorBar(color, bars.item(index) as HTMLElement, 200);
        index++;
        if (index < totalBar) setTimeout(flashBar, 10);
    }
}

function isSorted(): boolean {
    let sorted = true;
    for (let i = 0; i < barValue.length - 1; i++) {
        if (barValue[i] > barValue[i + 1]) {
            sorted = false;
            break;
        }
    }
    if (sorted) {
        smoothBarColor('green');
    }
    return sorted;
}

function bubbleSort(delay: number) {
    let i = 0,
        j = 0;
    const bars = wrapper.children;
    innerLoop();

    function innerLoop() {
        if (isSorted()) return;
        if (barValue[j] > barValue[j + 1]) {
            let temp = barValue[j];
            barValue[j] = barValue[j + 1];
            barValue[j + 1] = temp;
            recreateBar(barValue);
            colorBar('red', bars.item(j) as HTMLElement);
            colorBar('green', bars.item(j + 1) as HTMLElement);
        }
        j++;
        if (j < bars.length - i - 1) {
            setTimeout(innerLoop, delay);
        } else {
            j = 0;
            i++;
            setTimeout(innerLoop, delay);
        }
    }
}

function insertionSort(delay: number) {
    const bars = wrapper.children;
    let i = 1;
    let key = barValue[i];
    let j = i - 1;
    innerLoop();
    function innerLoop() {
        if (j >= 0 && barValue[j] > key) {
            barValue[j + 1] = barValue[j];
            recreateBar(barValue);
            j--;
            setTimeout(innerLoop, delay);
        } else {
            i++;
            key = barValue[i];
            j = i - 1;
            if (i < barValue.length) setTimeout(innerLoop, delay);
            else smoothBarColor('green');
        }
        barValue[j + 1] = key;
        colorBar('red', bars.item(j + 1) as HTMLElement);
        colorBar('green', bars.item(j) as HTMLElement);
    }
}

function sortBar(delay = 1) {
    chosenAlgorithmIndex = algorithmSelector.selectedIndex;
    if (isSorted()) return;
    sortingFunction[chosenAlgorithmIndex].function(delay);
    return;
}

function randomizeBar(delay = 1) {
    let id = window.setTimeout(function () {}, 0);
    while (id--) {
        window.clearTimeout(id);
    }
    let i = 0;
    const bars = wrapper.children;
    innerLoop();

    function innerLoop() {
        const randomIndex = getRandomInt(0, totalBar);
        let temp = barValue[i];
        barValue[i] = barValue[randomIndex];
        barValue[randomIndex] = temp;
        recreateBar(barValue);
        colorBar('purple', bars.item(i) as HTMLElement);
        colorBar('cyan', bars.item(randomIndex) as HTMLElement);
        i++;
        if (i < totalBar) setTimeout(innerLoop, delay);
        else smoothBarColor('var(--font-color)');
    }
}
