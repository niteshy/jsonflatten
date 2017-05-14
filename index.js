/**
 * Created by niteshyadav on 14/05/17.
 */
'use strict';

var debug = require("debug")("index");
var fs = require('fs');
var Parser = require('./parser.js');

function readInput(filename) {
    debug(" input file = ", filename);
    return fs.readFileSync(filename, "utf8");
}

function writeOutput(res, file) {
    debug("input - ", res);
    fs.writeFile(file, JSON.stringify(res, null, 2), 'utf8', function(err) {
        if (err) {
            return console.error("Could not write output: ", err);
        }
        console.log("The file was saved!");
    });
}

function runner() {
    var data = readInput("./inputs/input1.json");
    var result = Parser(JSON.parse(data));
    writeOutput(result, "./output/output1.json");
}

runner();
