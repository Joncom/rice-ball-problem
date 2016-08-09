const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('Enter (space separated) rice ball sizes: ', function(sizes) {
	sizes = sizes.split(' ');
	var max_size = solve(sizes);
	console.log('max size: ' + max_size);
	rl.close();
});

function solve(sizes) {
	var merges = get_merges(sizes);

	// no more possible merges?
	if(merges.length === 0) {

		// we're done!!
		// return max value in sizes array
		return Math.max.apply(null, sizes);
	}

	// recursively check all possible merges
	var max_sizes = [];
	for (var i = 0; i < merges.length; i++) {
		var max_size = solve(merge(sizes, merges[i].index, merges[i].count));
		max_sizes.push(max_size);
	}

	// return the max size that was discovered
	return Math.max.apply(null, max_sizes);
}

function merge(sizes, index, count) {

	// calculate merged size
	var merged_size = 0;
	for (var i = index; i < index + count; i++) {
		merged_size += sizes[i];
	}

	// create new sizes array,
	// remove old sizes from array,
	// insert new size into array
	return sizes.slice().splice(index, count, merged_size);
}

function get_merges(sizes) {
	var merges = [];
	[1, 2].forEach(function(look_ahead) {
		for (var i = 0; i < sizes.length - look_ahead; i++) {
			var a = sizes[i];
			var b = sizes[i + look_ahead];
			if (a === b) {
				merges.push({
					index: i,
					count: look_ahead + 1
				});
			}
		}
	});
	return merges;
}
