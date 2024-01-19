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

const mainNavbar = document.getElementById('main-navbar') as HTMLElement;
const sidebar = document.getElementById('sidebar') as HTMLElement;
navbarItems.forEach((item) => {
    const childForMain = document.createElement('a');
    const childForSide = document.createElement('a');
    childForMain.innerHTML = item.displayName;
    childForMain.href = item.href;
    childForMain.className = 'clickable hide-on-mobile';

    childForSide.innerHTML = item.displayName;
    childForSide.href = item.href;
    childForSide.className = 'clickable';

    mainNavbar.appendChild(childForMain);
    mainNavbar.appendChild(document.getElementById('theme-toggle') as HTMLButtonElement);
    mainNavbar.appendChild(document.getElementById('sidebar-on') as HTMLButtonElement);

    sidebar.appendChild(childForSide);
});

window.onscroll = () => {
    const navbar = document.getElementById('main-navbar') as HTMLElement;
    const top = 50;
    navbar.classList.toggle('sticky', window.scrollY > top);
};

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
