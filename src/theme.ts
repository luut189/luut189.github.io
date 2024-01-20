export function initTheme() {
    const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;

    themeToggle.addEventListener('click', toggleTheme);

    const defaultTheme = 'theme-dark';
    const theme = localStorage.getItem('theme') || defaultTheme;
    setTheme(theme);

    function setTheme(themeName: string) {
        const oppositeTheme = themeName === 'theme-dark' ? 'theme-light' : 'theme-dark';
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;

        themeToggle.classList.replace(themeName, oppositeTheme);

        const themeToggleTooltip = document.getElementById(
            'theme-toggle-tooltip'
        ) as HTMLSpanElement;
        themeToggleTooltip.innerHTML = `Switch ${oppositeTheme.replace('-', ' ')}`;
    }

    function toggleTheme() {
        const isDark = localStorage.getItem('theme') === 'theme-dark';
        setTheme(isDark ? 'theme-light' : 'theme-dark');
    }
}
