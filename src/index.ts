'use strict';

import { initLink } from './link';
import { initNavBar } from './navbar';
import { initQuote } from './quotes';
import { initSort } from './sort';
import { initTheme } from './theme';
import { initToDo } from './todo';

function initAnimation() {
    const buttonClickable = document.getElementsByTagName('button');
    for (const button of buttonClickable) {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.8)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

initTheme();
initNavBar();
initQuote();
initLink();
initToDo();
initSort();

initAnimation();
