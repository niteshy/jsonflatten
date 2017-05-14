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
    debug("result - ", res);
    fs.writeFile(file, JSON.stringify(res, null, 2), 'utf8', function(err) {
        if (err) {
            return console.error("Could not write output: ", err);
        }
        console.log("Output is saved in " + file);
    });
}

function runner() {
    var data = readInput("./inputs/input1.json");
    var result = Parser(JSON.parse(data));
    debug("input = ", data);
    var outputDir = "./output";
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
    Object.keys(result).forEach(function (key) {
        writeOutput(result[key], "./output/" + key + ".json");
    });
}

runner();
