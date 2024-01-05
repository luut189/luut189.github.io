const themeToggleButton = document.getElementById(
    'theme-toggle'
) as HTMLButtonElement;

themeToggleButton.addEventListener('click', toggleTheme);

const defaultTheme = 'theme-dark';
const theme = localStorage.getItem('theme') || defaultTheme;
setTheme(theme);

function setTheme(themeName: string) {
    const oppositeTheme =
        themeName === 'theme-dark' ? 'theme-light' : 'theme-dark';
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;

    themeToggleButton.classList.replace(themeName, oppositeTheme);

    const toggleButtonTooltip = document.getElementById(
        'theme-toggle-tooltip'
    ) as HTMLSpanElement;
    toggleButtonTooltip.innerHTML = `Switch ${oppositeTheme.replace('-', ' ')}`;
}

function toggleTheme() {
    const isDark = localStorage.getItem('theme') === 'theme-dark';
    setTheme(isDark ? 'theme-light' : 'theme-dark');
}
