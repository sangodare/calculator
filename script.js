'use strict';

// Theme Switcher
const themes = document.querySelectorAll('input[name="theme"]');

// store theme in local storage
const storeTheme = function(theme) {
    localStorage.setItem('theme', theme);
};

const switchTheme = function() {
    const activeTheme = localStorage.getItem('theme');
    themes.forEach(theme => {
        if(theme.id === activeTheme) {
            theme.checked = true;
            document.documentElement.className = activeTheme;
        }
    });
};

themes.forEach(theme => theme.addEventListener('input', function(){
    storeTheme(theme.id);
    switchTheme();
}));

// sets theme to the stored in the local storage as soon as the domcontentloaded event is fired
document.addEventListener('DOMContentLoaded', switchTheme);