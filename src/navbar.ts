window.onscroll = () => {
    const navbar = document.querySelector('#main-navbar') as HTMLElement;
    const top = navbar.offsetTop;
    if (window.scrollY > top) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
};

document.getElementById('sidebar-on')?.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;

    sidebar.style.display = 'flex';
    sidebar.style.transform = 'translate(100rem)';
    setTimeout(() => {
        sidebar.style.transform = 'translate(0rem)';
    }, 10);
});

document.getElementById('sidebar-off')?.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar.style.transform = 'translate(0rem)';
    setTimeout(() => {
        sidebar.style.transform = 'translate(100rem)';
    }, 10);
    setTimeout(() => {
        sidebar.style.display = 'none';
    }, 200);
});
