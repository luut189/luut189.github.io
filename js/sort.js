"use strict";
const wrapper = document.getElementById('sorting');
const defaultWidth = 5;
const scale = 20;
let totalBar = document.documentElement.offsetWidth / scale;
let barValue = [];
addEventListener('resize', initBar);
initBar();
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function getBarStyle(value, color) {
    return `margin: 0; width: ${totalBar / 20 > defaultWidth ? totalBar / 20 : defaultWidth}px; height: ${value}px; background-color: ${color}`;
}
function colorBar(color, bar, delay = 1) {
    bar.style.backgroundColor = color;
    setTimeout(() => {
        bar.style.backgroundColor = 'var(--bar-color)';
    }, delay);
}
function initBar() {
    totalBar = document.documentElement.offsetWidth / scale;
    let id = window.setTimeout(function () { }, 0);
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
function recreateBar(barValue) {
    wrapper.replaceChildren();
    barValue.forEach((value) => {
        const bar = document.createElement('div');
        bar.setAttribute('style', getBarStyle(value, 'var(--bar-color)'));
        wrapper.appendChild(bar);
    });
}
function smoothBarColor(color) {
    let index = 0;
    flashBar();
    function flashBar() {
        const bars = wrapper.children;
        colorBar(color, bars.item(index), 200);
        index++;
        if (index < totalBar)
            setTimeout(flashBar, 10);
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
    if (isSorted())
        return;
    let i = 0, j = 0;
    const bars = wrapper.children;
    innerLoop();
    function innerLoop() {
        if (isSorted())
            return;
        if (barValue[j] > barValue[j + 1]) {
            let temp = barValue[j];
            barValue[j] = barValue[j + 1];
            barValue[j + 1] = temp;
            recreateBar(barValue);
            colorBar('red', bars.item(j));
            colorBar('green', bars.item(j + 1));
        }
        j++;
        if (j < bars.length - i - 1) {
            setTimeout(innerLoop, delay);
        }
        else {
            j = 0;
            i++;
            setTimeout(innerLoop, delay);
        }
    }
}
function randomizeBar(delay = 1) {
    let id = window.setTimeout(function () { }, 0);
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
        colorBar('purple', bars.item(i));
        colorBar('cyan', bars.item(randomIndex));
        i++;
        if (i < totalBar)
            setTimeout(innerLoop, delay);
        else
            smoothBarColor('var(--font-color)');
    }
}
