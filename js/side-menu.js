const sideMenu = document.querySelector('.side-menu');
const menuOpen = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const sideMenuContainer = document.querySelector('.side-menu__container');

menuOpen.addEventListener('click', function() { // TODO: Make available only in landscape non-mobile view
    sideMenuContainer.classList.toggle('menu-open');
    header.classList.toggle('menu-open');

    if (sideMenuContainer.classList.contains('menu-open')) {
        sideMenu.setAttribute('aria-expanded', 'true');
        sideMenuContainer.classList.add('grid-col-span-2');

        // Replace .grid-col-start-2 with .grid-col-start-3
        // when the menu is open for each element
        // with the class .grid-col-start-2

        document.querySelectorAll('.grid-col-start-2').forEach((el) => {
            el.classList.remove('grid-col-start-2');
            el.classList.add('grid-col-start-3');
        });
    } else {
        sideMenu.setAttribute('aria-expanded', 'false');
        sideMenuContainer.classList.remove('grid-col-span-2');

        document.querySelectorAll('.grid-col-start-3').forEach((el) => {
            el.classList.remove('grid-col-start-3');
            el.classList.add('grid-col-start-2');
        });
    }
});

const sideMenuItems = document.querySelectorAll('.menu__item');

sideMenuItems.forEach((item) => {
    item.addEventListener('click', function() {
        item.classList.toggle('expanded');
    });
});

