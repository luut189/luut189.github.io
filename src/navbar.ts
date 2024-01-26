interface NavBarItem {
    displayName: string;
    href: string;
}

const navbarItems: NavBarItem[] = [
    {
        displayName: 'Resume',
        href: '/resume.pdf',
    },
    {
        displayName: 'Lorem Ipsum',
        href: '/',
    },
    {
        displayName: 'Contact',
        href: '#about',
    },
];

export function initNavBar() {
    const mainNavbar = document.getElementById('main-navbar') as HTMLElement;
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    const intro = document.getElementById('intro') as HTMLDivElement;
    intro.style.marginTop = `${mainNavbar.offsetHeight * 1.5}px`;

    window.addEventListener('resize', () => {
        intro.style.marginTop = `${mainNavbar.offsetHeight * 1.5}px`;
    });

    navbarItems.forEach((item) => {
        const childForMain = document.createElement('a');
        const childForSide = document.createElement('a');
        childForMain.textContent = item.displayName;
        childForMain.href = item.href;
        childForMain.className = 'nav-clickable hide-on-mobile';

        childForSide.textContent = item.displayName;
        childForSide.href = item.href;
        childForSide.className = 'nav-clickable';

        mainNavbar.appendChild(childForMain);
        mainNavbar.appendChild(document.getElementById('theme-toggle') as HTMLButtonElement);
        mainNavbar.appendChild(document.getElementById('sidebar-on') as HTMLButtonElement);

        sidebar.appendChild(childForSide);
    });

    document.getElementById('sidebar-on')?.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar') as HTMLElement;

        sidebar.style.display = 'flex';
        sidebar.style.transform = 'translate(100rem)';
        setTimeout(() => {
            sidebar.style.transform = 'translate(0rem)';
        }, 10);
    });

    document.getElementById('sidebar-off')?.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar') as HTMLElement;
        sidebar.style.transform = 'translate(0rem)';
        setTimeout(() => {
            sidebar.style.transform = 'translate(100rem)';
        }, 10);
        setTimeout(() => {
            sidebar.style.display = 'none';
        }, 200);
    });
}
