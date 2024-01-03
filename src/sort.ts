const wrapper = document.getElementById('sorting') as HTMLDivElement;
const defaultWidth = 5;
const scale = 20;
let totalBar = document.documentElement.offsetWidth / scale;
let barValue: number[] = [];

addEventListener('resize', initBar);
initBar();

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

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

function initBar() {
    totalBar = document.documentElement.offsetWidth / scale;
    let id = window.setTimeout(function () {}, 0);
    while (id--) {
        window.clearTimeout(id);
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

function isSorted() {
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

function sortBar(delay = 1) {
    if (isSorted()) return;
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
