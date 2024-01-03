"use strict";
const wrapper = document.getElementById('sorting');
const defaultWidth = 5;
const totalBar = 50;
let barValue = [];
createBar();
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function getBarStyle(value, color) {
    return `margin: 0; width: ${totalBar / 20 > defaultWidth ? totalBar / 20 : defaultWidth}px; height: ${value}px; background-color: ${color}`;
}
function swap(colorA, colorB, nodeA, nodeB) {
    var _a;
    nodeA.style.backgroundColor = colorA;
    nodeB.style.backgroundColor = colorB;
    setTimeout(() => {
        nodeA.style.backgroundColor = 'var(--bar-color)';
        nodeB.style.backgroundColor = 'var(--bar-color)';
    }, 1);
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
    // Move `nodeA` to before the `nodeB`
    (_a = nodeB.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(nodeA, nodeB);
    // Move `nodeB` to before the sibling of `nodeA`
    parentA === null || parentA === void 0 ? void 0 : parentA.insertBefore(nodeB, siblingA);
}
function createBar() {
    wrapper.replaceChildren();
    let id = window.setTimeout(function () { }, 0);
    while (id--) {
        window.clearTimeout(id);
    }
    barValue = [];
    for (let i = 0; i < totalBar; i++) {
        const value = getRandomInt(50, 300);
        barValue.push(value);
        const bar = document.createElement('div');
        bar.setAttribute('style', getBarStyle(value, 'var(--bar-color)'));
        wrapper.appendChild(bar);
    }
}
function sortBar(delay = 1) {
    let i = 0, j = 0;
    const bars = wrapper.children;
    innerLoop();
    function innerLoop() {
        if (barValue[j] > barValue[j + 1]) {
            swap('red', 'green', bars.item(j), bars.item(j + 1));
            let temp = barValue[j];
            barValue[j] = barValue[j + 1];
            barValue[j + 1] = temp;
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
        const randomIndex = getRandomInt(0, wrapper.childElementCount);
        swap('purple', 'cyan', bars.item(i), bars.item(randomIndex));
        let temp = barValue[i];
        barValue[i] = barValue[randomIndex];
        barValue[randomIndex] = temp;
        i++;
        if (i < wrapper.childElementCount)
            setTimeout(innerLoop, delay);
    }
}
