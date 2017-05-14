/**
 * Created by niteshyadav on 14/05/17.
 */
'use strict';

var _       = require("underscore");
var chai    = require("chai");
var expect  = require('chai').expect;
var assert = require('chai').assert
chai.should();
chai.use(require('chai-things'));


var testname = "Parser";
var Parser = require("../parser.js");

describe('#Test-' + testname, function() {
    describe("#Validate " + testname + ": " , function() {
        it(testname + ' output should be equal {"": []}', function() {
            expect(Parser([])).to.deep.equal({"": []});
        });
        it(testname + ' output should be equal expected', function() {
            var input1 =  {
                'key1' :[{ 'id': 123, 'a' : '1' }]
            };
            var output1 = { key1: [ { __index: '0', id: 123, a: '1' } ] };
            assert.deepEqual(Parser(input1), output1);
        });

        it(testname + ' output should be equal expected', function() {
            var input1 =  {
                'key1' :[{ "id": 123, "a" : "1" },
                         { "id": 345, "b" : "2" } ]
            };
            var output1 =  {
                'key1':[{ '__index': '0', 'id': 123, 'a' : '1' },
                    { '__index': '1', 'id': 345, 'b' : '2' } ]
            };
            assert.deepEqual(Parser(input1), output1);
        });

        it(testname + ' output should be equal expected', function() {
            var input1 =  {
                'key1' :[{ "id": 123, "a" : "1", "key2" :[ {"c" : "3"}, {"d" : "4"} ]},
                         { "id": 345, "b" : "2" } ]
            };
            var output1 =  {
                'key1':[{ '__index': '0', 'id': 123, 'a' : '1' },
                        { '__index': '1', 'id': 345, 'b' : '2' } ],
                'key1_key2':[{ '__index': '0', 'id': 123, 'c': '3'},
                             { '__index': '1', 'id': 123, 'd': '4'} ]
            };
            assert.deepEqual(Parser(input1), output1);
        });

        it(testname + ' output should be equal expected', function() {
            var input1 =  {
                "restaurants": [{
                    "id": "58b868503c6f4d322fa8f552",
                    "version": "asdjasd",
                    "address": {
                        "building": "1007",
                        "coord": "[­73.856077, 40.848447]",
                        "street": "Morris Park Ave",
                        "zipcode": "10462"
                    },
                    "borough": "Bronx",
                    "cuisine": "Bakery",
                    "grades": [
                        {
                            "date": "2014­03­03T00:00:00.000Z",
                            "grade": "A",
                            "score": {
                                "x": 1,
                                "y": 2
                            }
                        }, {
                            "date": "2011­11­23T00:00:00.000Z",
                            "grade": "A",
                            "score": {
                                "x": 11,
                                "y": 22
                            }
                        }
                    ],
                    "name": "Morris Park Bake Shop"
                }]
            }
            var output1 =  {
                "restaurants_address": [
                    {
                        "__index": "0",
                        "id": "58b868503c6f4d322fa8f552",
                        "building": "1007",
                        "coord": "[­73.856077, 40.848447]",
                        "street": "Morris Park Ave",
                        "zipcode": "10462"
                    }
                ],
                "restaurants_grades_score": [
                    {
                        "__index": "0",
                        "id": "58b868503c6f4d322fa8f552",
                        "x": 1,
                        "y": 2
                    },
                    {
                        "__index": "1",
                        "id": "58b868503c6f4d322fa8f552",
                        "x": 11,
                        "y": 22
                    }
                ],
                "restaurants_grades": [
                    {
                        "__index": "0",
                        "id": "58b868503c6f4d322fa8f552",
                        "date": "2014­03­03T00:00:00.000Z",
                        "grade": "A"
                    },
                    {
                        "__index": "1",
                        "id": "58b868503c6f4d322fa8f552",
                        "date": "2011­11­23T00:00:00.000Z",
                        "grade": "A"
                    }
                ],
                "restaurants": [
                    {
                        "__index": "0",
                        "id": "58b868503c6f4d322fa8f552",
                        "version": "asdjasd",
                        "borough": "Bronx",
                        "cuisine": "Bakery",
                        "name": "Morris Park Bake Shop"
                    }
                ]
            };
            assert.deepEqual(Parser(input1), output1);
        });
    });
});
