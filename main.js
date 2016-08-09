const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('Enter (space separated) rice ball sizes: ', function(answer) {

	rl.close();
});