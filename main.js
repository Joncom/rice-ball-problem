var ask = 'enter space-separated rice ball sizes: ';

// used to make output pretty
indentation = 0;
function indent() {
    var output = '';
    for(var i=0; i<indentation; i++) {
        output += '    ';
    }
    return output;
}

// running in node?
if(typeof process !== 'undefined') {

    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(ask, function(input) {
        run(input);
        rl.close();
    });
} else {
    run(prompt(ask));
}

function run(input) {

    // convert input string into an array of sizes
    var sizes = input.trim().split(' ');

    // parse sizes from strings to integers
    sizes = sizes.map(function(size) {
        return parseInt(size);
    });

    solve(sizes);
}

function solve(sizes) {
    console.log(indent() + 'solving for ' + sizes);

    var merges = get_merges(sizes);
    console.log(indent() + merges.length + ' possible merges');

    // no more possible merges?
    if(merges.length === 0) {

        // we're done!!
        var max_size = Math.max.apply(null, sizes);
        console.log(indent() + 'max size is ' + max_size);
        return max_size;
    }

    // we're going a level deeper
    // indent for readability
    indentation++;

    // recursively check all possible merges
    var max_sizes = [0];
    for (var i = 0; i < merges.length; i++) {
        console.log(indent() + 'merge #' + (i+1));
        var max_size = solve(merge(sizes, merges[i].index, merges[i].count));
        max_sizes.push(max_size);
    }

    // we're back!
    // unindent for readability
    indentation--;

    // return the max size discovered
    var max_size = Math.max.apply(null, max_sizes);
    console.log(indent() + 'max size is ' + max_size);
    return max_size;
}

function merge(sizes, index, count) {

    // calculate merged size
    var merged_size = 0;
    for (var i = index; i < index + count; i++) {
        merged_size += sizes[i];
    }

    // copy the sizes array
    var new_sizes = sizes.slice();

    // remove old sizes from the array, and
    // insert the new merged size
    new_sizes.splice(index, count, merged_size);

    return new_sizes;
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
