import { getRandomInt } from './utils';

interface Sorter {
    name: string;
    function: Function;
}

export function initSort() {
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
        {
            name: 'Selection Sort',
            function: selectionSort,
        },
        {
            name: 'Merge Sort',
            function: mergeSort,
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
        if (!firstInit) clearProcess();
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

    async function smoothBarColor(color: string) {
        const bars = wrapper.children;
        for (let i = 0; i < totalBar; i++) {
            colorBar(color, bars.item(i) as HTMLElement, 200);
            await timeout(10);
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
        return sorted;
    }

    async function bubbleSort(delay: number) {
        const bars = wrapper.children;
        let index = 0;
        while (true) {
            let isFlag = false;
            for (let j = 0; j < barValue.length - index - 1; j++) {
                if (barValue[j] > barValue[j + 1]) {
                    let temp = barValue[j];
                    barValue[j] = barValue[j + 1];
                    barValue[j + 1] = temp;
                    isFlag = true;
                    recreateBar(barValue);
                    colorBar('red', bars.item(j) as HTMLElement);
                    colorBar('green', bars.item(j + 1) as HTMLElement);
                }
                await timeout(delay);
            }
            index++;
            if (!isFlag) break;
        }
    }

    async function insertionSort(delay: number) {
        const bars = wrapper.children;
        for (let i = 1; i < barValue.length; i++) {
            let key = barValue[i];
            let j = i - 1;

            while (j >= 0 && barValue[j] > key) {
                let temp = barValue[j];
                barValue[j] = barValue[j + 1];
                barValue[j + 1] = temp;
                recreateBar(barValue);
                colorBar('red', bars.item(j + 1) as HTMLElement);
                colorBar('green', bars.item(i) as HTMLElement);
                j--;
                await timeout(delay);
            }
        }
    }

    async function selectionSort(delay: number) {
        const bars = wrapper.children;
        for (let i = 0; i < barValue.length; i++) {
            let min = i;
            for (let j = i + 1; j < barValue.length; j++) {
                if (barValue[min] > barValue[j]) {
                    min = j;
                }
                recreateBar(barValue);
                colorBar('green', bars.item(i) as HTMLElement);
                colorBar('red', bars.item(j) as HTMLElement);
                await timeout(delay);
            }
            let temp = barValue[i];
            barValue[i] = barValue[min];
            barValue[min] = temp;
        }
        recreateBar(barValue);
    }

    async function mergeSort(delay: number) {
        await innerMerge(0, barValue.length - 1);

        async function innerMerge(left: number, right: number) {
            if (left < right) {
                let middle = left + Math.floor((right - left) / 2);

                await innerMerge(left, middle);
                await innerMerge(middle + 1, right);

                await merge(left, middle, right);
            }
        }

        async function merge(left: number, middle: number, right: number) {
            const bars = wrapper.children;
            let leftLength = middle - left + 1;
            let rightLength = right - middle;

            let leftArr: number[] = [];
            let rightArr: number[] = [];

            for (let i = 0; i < leftLength; i++) {
                leftArr[i] = barValue[left + i];
            }

            for (let i = 0; i < rightLength; i++) {
                rightArr[i] = barValue[middle + 1 + i];
            }

            let i = 0,
                j = 0,
                k = left;

            while (i < leftLength && j < rightLength) {
                if (leftArr[i] < rightArr[j]) {
                    barValue[k] = leftArr[i];
                } else {
                    barValue[k] = rightArr[j];
                }
                await timeout(delay);
                recreateBar(barValue);
                colorBar('red', bars.item(k) as HTMLElement);
                colorBar('green', bars.item(leftArr[i] < rightArr[j] ? i : j) as HTMLElement);
                if (leftArr[i] < rightArr[j]) i++;
                else j++;
                k++;
            }

            while (i < leftLength) {
                barValue[k] = leftArr[i];
                await timeout(delay);
                recreateBar(barValue);
                colorBar('red', bars.item(k) as HTMLElement);
                colorBar('green', bars.item(i) as HTMLElement);
                i++;
                k++;
            }

            while (j < rightLength) {
                barValue[k] = rightArr[j];
                await timeout(delay);
                recreateBar(barValue);
                colorBar('red', bars.item(k) as HTMLElement);
                colorBar('green', bars.item(j) as HTMLElement);
                j++;
                k++;
            }
        }
    }

    async function sortBar(delay = 1) {
        startSortButton.disabled = true;
        chosenAlgorithmIndex = algorithmSelector.selectedIndex;
        if (isSorted()) return;
        await sortingFunction[chosenAlgorithmIndex].function(delay);
        finishSort();
        return;
    }

    async function randomizeBar(delay = 1) {
        clearProcess();
        const bars = wrapper.children;
        for (let i = 0; i < totalBar; i++) {
            const randomIndex = getRandomInt(0, totalBar);
            let temp = barValue[i];
            barValue[i] = barValue[randomIndex];
            barValue[randomIndex] = temp;
            recreateBar(barValue);
            colorBar('purple', bars.item(i) as HTMLElement);
            colorBar('cyan', bars.item(randomIndex) as HTMLElement);
            await timeout(delay);
        }
        smoothBarColor('var(--font-color)');
    }

    function finishSort() {
        startSortButton.disabled = false;
        smoothBarColor('green');
    }

    function clearProcess() {
        let id = window.setTimeout(function () {}, 0);
        while (id--) {
            window.clearTimeout(id);
        }
        startSortButton.disabled = false;
    }

    async function timeout(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
