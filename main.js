// DOM Elements
const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const upperCaseElement = document.getElementById('uppercase');
const lowerCaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumbers,
	symbols: getRandomSymbol
}

// Events
generateElement.addEventListener('click', () => {
	const length = lengthElement.value;
	const hasUpper = upperCaseElement.checked;
	const hasLower = lowerCaseElement.checked;
	const hasNumbers = numbersElement.checked;
	const hasSymbols = symbolsElement.checked;

	resultElement.innerText = generatePassword(
		hasUpper,
		hasLower,
		hasNumbers,
		hasSymbols,
		length,
	);
});

// ClipBoard
clipboardElement.addEventListener('click', () => {
	const textArea = document.createElement('textarea');
	const password = resultElement.innerText;

	if (!password) {
		return;
	}

	textArea.value = password;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy');
	textArea.remove();
	alert('Password copied to clipboard')
})

//Generate password Function
function generatePassword(lower, upper, number, symbols, length) {

	let generatedPassword = '';

	const typesCount = lower + upper + number + symbols;

	const typesArr = [{
		lower
	}, {
		upper
	}, {
		number
	}, {
		symbols
	}].filter(item => Object.values(item)[0]);

	if (typesCount === 0) {
		return '';
	}

	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}

	const finalPassword = generatedPassword.slice(0, length);

	return finalPassword;
}

// Generator functions
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

function getRandomNumbers() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
};

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)]
}