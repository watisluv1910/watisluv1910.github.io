const header = document.querySelector('header');

let border = convertRemToPixels(
    getComputedStyle(document.body)
    .getPropertyValue('--col-gap-default')
    .slice(0, -3)
    ) / 2;

document.addEventListener('scroll', function() {
    if (window.scrollY > border & !header.classList.contains('rolled-up')) {
        header.classList.add('rolled-up');
    } else if (window.scrollY <= border & header.classList.contains('rolled-up')) {
        header.classList.remove('rolled-up');
    }
});

/**
 * @param  {} rem
 * @param  {} .fontSize
 */
function convertRemToPixels(rem) {    
    return rem * parseFloat(
        getComputedStyle(document.documentElement).fontSize
        );
};