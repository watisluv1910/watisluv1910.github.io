const switchers = document.querySelectorAll('.theme-switcher');
const html = document.documentElement;

switchers.forEach((switcher) => {
    switcher.addEventListener('click', function() {
        
        // add/remove class theme-dark to html element if it doesn't already have it
        // and remove theme-light if it has it
        if (!html.classList.contains('theme-dark')) {
            html.classList.remove('theme-light');
            html.classList.add('theme-dark');

            editImgSrc('-dark');
        } else {
            html.classList.remove('theme-dark');
            html.classList.add('theme-light');

            // if the theme is light, change the image src to the light version
            editImgSrc('-light');
        }

    });
});

function editImgSrc(theme) {
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
        const src = img.getAttribute('src');
        const newSrc = src.replace(/-light|-dark/, theme);

        img.setAttribute('src', newSrc);
    });
}