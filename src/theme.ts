const themeToggleButtons = document.getElementsByClassName('theme-toggle');

for (const toggleButton of themeToggleButtons) {
    toggleButton.addEventListener('click', toggleTheme);
}

const defaultTheme = 'theme-dark';
const theme = localStorage.getItem('theme') || defaultTheme;
setTheme(theme);

function setTheme(themeName: string) {
    const oppositeTheme =
        themeName === 'theme-dark' ? 'theme-light' : 'theme-dark';
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;

    for (const toggleButton of themeToggleButtons) {
        toggleButton.classList.replace(themeName, oppositeTheme);
    }

    const themeToggleTooltip = document.getElementsByClassName('theme-toggle-tooltip');
    for (const tooltip of themeToggleTooltip) {
        tooltip.innerHTML = `Switch ${oppositeTheme.replace('-', ' ')}`;
    }
}

function toggleTheme() {
    const isDark = localStorage.getItem('theme') === 'theme-dark';
    setTheme(isDark ? 'theme-light' : 'theme-dark');
}
