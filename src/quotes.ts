import { getRandomInt } from './utils';

interface Quote {
    text: string;
    author: string;
}

export function initQuote() {
    const quoteWrapper = document.getElementById('quote') as HTMLDivElement;

    fetch('https://type.fit/api/quotes')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const randomQuote = data[getRandomInt(0, data.length)] as Quote;
            const quoteText = randomQuote.text;
            const quoteAuthor = randomQuote.author.split(', ')[0];

            const quoteTextElement = document.createElement('div');
            const quoteAuthorElement = document.createElement('div');

            quoteTextElement.textContent = quoteText;

            quoteAuthorElement.textContent = quoteAuthor;
            quoteTextElement.appendChild(quoteAuthorElement);

            quoteWrapper.appendChild(quoteTextElement);
        });
}
