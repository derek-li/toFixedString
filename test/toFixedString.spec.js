tests({
	
	'It should return the value rounded to the nearest whole number when no precision is specified': function() {
  	eq(toFixedString(1), "1");
    eq(toFixedString(1.01), "1");
    eq(toFixedString(1.5), "2");
  },
  	
  'It should return the value with precision number of 0s, if value has no fraction and precision is specified': function () {
  	eq(toFixedString(1,2), "1.00");
    eq(toFixedString(0,2), "0.00");
  },
  	
  'It should add 0s to the end while the length of the fraction is less than the precision': function () {
   	eq(toFixedString(1.126,4), "1.1260");
  },
	
  'It should pass when precision is equal to length of fraction': function() {
	  eq(toFixedString(0.0615,4), "0.0615");
  },

	'It should pass for 10.235': function () {
  	eq(toFixedString(10.235,2), "10.24");
  },
  	
  'It should pass for 0.615': function () {
   	eq(toFixedString(0.615,2), "0.62");
  },
  	
  'It should pass for 1.005': function () {
   	eq(toFixedString(1.005,2), "1.01");
  },
  	
  'It should pass for 9.99': function () {
   	eq(toFixedString(9.999,2), "10.00");
  },

  'It should pass for properly format negative numbers': function() {
    eq(toFixedString(-0.05,1), "-0.1");
    eq(toFixedString(-100, 2), '-100.00');
    eq(toFixedString(-100.05, 1), '-100.1');
    eq(toFixedString(-100.04, 1), '-100.0');
    eq(toFixedString(-100.55, 1), '-100.6');
  },

  'It should round correctly if there are more than one zeros after the dot': function() {    
  	eq(toFixedString(0.00265,3), "0.003");
  	eq(toFixedString(10.00244,3), "10.002");
  }

});
