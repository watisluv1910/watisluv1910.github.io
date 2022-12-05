const switchers = document.querySelectorAll('.theme-switcher');
const html = document.documentElement;

switchers.forEach((switcher) => {
    switcher.addEventListener('click', toggleTheme);
});

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
    // Give only dark or light part of theme name
    toggleIcons(themeName.split('-')[1]);
}

// function to toggle between light and dark theme
function toggleTheme() {
   if (localStorage.getItem('theme') === 'theme-dark'){
       setTheme('theme-light');
   } else {
       setTheme('theme-dark');
   }
}

// Immediately invoked function to set the theme on initial load
(function () {
   if (localStorage.getItem('theme') === 'theme-dark') {
       setTheme('theme-dark');
   } else {
       setTheme('theme-light');
   }
})();

// Function to toggle between light and dark icons
function toggleIcons(theme) {
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
        const src = img.getAttribute('src');
        const newSrc = src.replace(/light|dark/, theme);

        img.setAttribute('src', newSrc);
    });
}