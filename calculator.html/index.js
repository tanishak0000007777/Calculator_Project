// Get all the buttons
const result_element = document.getElementById('result');
const clear_button = document.getElementById('clear_button');
const delete_button = document.getElementById('delete_button');
const div_button = document.getElementById('div_button');
const multiply_button = document.getElementById('multiply_button');
const add_button = document.getElementById('add_button');
const sub_button = document.getElementById('sub_button');
const equal_button = document.getElementById('equal_button');
const point_button = document.getElementById('point_button');
const numberbtns = document.querySelectorAll('.number');

// Initialize the variables
let result = '';
let op = '';
let prevOp = '';

// Function to append a number
const append_number = (number) => {
    if (number === '.' && result.includes('.')) return;
    result += number;
    updateDisplay();
};

// Function to update display
const updateDisplay = () => {
    if (op) {
        result_element.innerText = `${prevOp} ${op} ${result}`;
    } else {
        result_element.innerText = result;
    }
};

// Function to select an operator
const selectop = (operatorvalue) => {
    if (result === '') return;

    if (op !== '' && prevOp !== '') {
        calclate_result();
    }

    op = operatorvalue;
    prevOp = result;
    result = '';
    updateDisplay();
};

// Function to calculate result
const calclate_result = () => {
    let eval_result;
    const prev = parseFloat(prevOp);
    const curr = parseFloat(result);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (op) {
        case '+': eval_result = prev + curr; break;
        case '-': eval_result = prev - curr; break;
        case '*': eval_result = prev * curr; break;
        case '/': eval_result = prev / curr; break;
        default: return;
    }

    result = eval_result.toString();
    op = '';
    prevOp = '';

    updateDisplay();
};

// Function to clear display
const clr_display = () => {
    result = '';
    prevOp = '';
    op = '';
    updateDisplay();
};

// Function for backspace (delete)
const del_last_digit = () => {
    if (result !== '') {
        result = result.slice(0, -1);
    } else if (op !== '') { 
        op = '';
        result = prevOp; 
        prevOp = '';
    }
    updateDisplay();
};

// Add event listeners
numberbtns.forEach(button => {
    button.addEventListener('click', () => {
        append_number(button.innerText);
    });
});

point_button.addEventListener('click', () => append_number('.'));

add_button.addEventListener('click', () => selectop('+'));
sub_button.addEventListener('click', () => selectop('-'));
multiply_button.addEventListener('click', () => selectop('*'));
div_button.addEventListener('click', () => selectop('/'));

equal_button.addEventListener('click', () => {
    if (result === '') return;
    calclate_result();
    updateDisplay();
});

clear_button.addEventListener('click', clr_display);
delete_button.addEventListener('click', del_last_digit);
