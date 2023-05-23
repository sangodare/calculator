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

// sets theme to the theme stored in the local storage as soon as the domcontentloaded event is fired
document.addEventListener('DOMContentLoaded', switchTheme);


//The calculator
class Calculator {
    constructor(displayScreen) {
        this.displayScreen = displayScreen;
        this.reset();
    }

    reset() {
        this.display = '';
        this.operation = undefined;
    }

    delete() {
        this.display = this.display.toString().slice(0, -1);
        if(this.display[0] === '-' && this.display.length === 1) this.display = this.display.toString().slice(0, -1);  
    }

    attachNumber(number) {
        if(number === '.' && this.display.includes('.')) return;
        this.display = this.display.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.display === '') return;

        if(this.oldValue !== '') {
            this.compute();
        };

        this.operation = operation;
        this.oldValue = this.display;
        this.display = '';
    }

    compute() {
        let computation;
        const oldValue = parseFloat(this.oldValue)
        const newValue = parseFloat(this.display);

        if(isNaN(oldValue) || isNaN(newValue)) return; 

        switch (this.operation) {
            case '+':
                computation = oldValue + newValue;
                break;
            case '-':
                computation  = oldValue - newValue;
                break;
            case 'x':
                computation = oldValue * newValue;
                break;
            case '/':
                computation = oldValue / newValue;
                break;
            default: 
                return;                      
        }
        
        this.display = computation;
        this.operation = undefined;
    }

    displayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        };

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        };
      
    }

    updateDisplay() {
        this.displayScreen.innerText = this.displayNumber(this.display);
    }

}

const numberkeys = document.querySelectorAll('[data-number]');
const operationKeys = document.querySelectorAll('[data-operation]');
const equalsKey = document.querySelector('[data-equals]');
const delKey = document.querySelector('[data-del]');
const resetKey = document.querySelector('[data-reset]');
const displayScreen = document.querySelector('[data-display]');
 
const calc = new Calculator(displayScreen);


// Event listeners
numberkeys.forEach(numberkey => {
    numberkey.addEventListener('click', function() {
        calc.attachNumber(numberkey.value);
        calc.updateDisplay();
    });
});

resetKey.addEventListener('click', function() {
    calc.reset();
    calc.updateDisplay();
});

operationKeys.forEach(operationKey => {
        operationKey.addEventListener('click', function() {
        calc.chooseOperation(operationKey.value);
        calc.updateDisplay(); 
    });
});

equalsKey.addEventListener('click', function() {
    calc.compute();
    calc.updateDisplay();  
});

delKey.addEventListener('click', function() {
    calc.delete();
    calc.updateDisplay();
});