function toFixedString (value, precision) {
	
	if(typeof value !== 'number') {
		throw new TypeError('First argument must be a number.')
	}
	//Utility
	var valueAsString = value.toString();
	var splitString = valueAsString.split('.');
	var integerPart = splitString[0];
	var fractionPart = splitString[1];
	var result, negative;

	if(integerPart[0] === '-') {
		negative = '-';
		integerPart = integerPart.substring(1,integerPart.length);
	}

	var round = function(fraction, precision) {

		var lastDigit;
		var length;

		lastDigit = fraction[precision]; 
		fraction = fraction.substring(0, precision); 
		length = fraction.length;

		fraction = Number(fraction); 
		lastDigit = Number(lastDigit); 

		if(lastDigit >= 5) {
			fraction = fraction + 1; 
		} 

		fraction = fraction.toString();

		if(fraction.length < length) {
			var numberOfZerosLost = length - fraction.length;
			for(var i = 0; i < numberOfZerosLost; i++) {
				fraction = '0' + fraction;
			}
		}

		return fraction;
	}
	//Case 1: Precision is 0
	if(precision === 0 || precision === undefined) {
		var firstDigit;
		if(fractionPart) {
			firstDigit = Number(fractionPart[0]);	
		}
		if(firstDigit >= 5) {
			integerPart = Number(integerPart) + 1;
			integerPart = integerPart.toString();
		}
		return integerPart;
	//Case 2: Precision is greater than fraction length
	} if(!fractionPart || fractionPart.length < precision) {
		if(!fractionPart) {
			fractionPart = '';
			for(var i = 0; i < precision; i++) {
				fractionPart = fractionPart + '0';
			}
		} else {
			while(fractionPart.length < precision) {
				fractionPart = fractionPart + '0';
			}
		}
	//Case 3: Potential rollover 1.99 --> 2.00
	} else if(fractionPart[0] === '9') {
		fractionPart = round(fractionPart, precision);
		if(fractionPart.length > precision) {
			fractionPart = fractionPart.substring(1,precision) + '0';
			integerPart = Number(integerPart) + 1;
			integerPart = integerPart.toString();
		}
	//Base case
	} else {
		fractionPart = round(fractionPart, precision);
		fractionPart = fractionPart.substring(0,precision);
	}
	//Append negative sign if original value was negative
	if(negative === '-') {
		result = negative + integerPart + '.' + fractionPart;	
	} else {
		result = integerPart + '.' + fractionPart;
	}

	return result;
}
