/**
 * Created by niteshyadav on 14/05/17.
 */
'use strict';

var _ = require("underscore");
var debugArr = require("debug")("parser");
var debugObj = require("debug")("object");

var Parser = function(data) {
    var output = {};
    function parseArray(cur, prev, additional) { // return array
        debugArr(" cur = ", cur, " prev = ", prev, " add = ", additional);
        var temp = [];
        for (var i = 0, l = cur.length; i < l; i++) {
            //debugArr(" cur[",i,"] - ", cur[i]);
            additional = _.extend(additional, {"__index": i.toString()});
            if (typeof cur[i] === 'object') {
                var t = recurse(cur[i], prev, additional);
                //debugArr("PARSE result from recurse  t = ", t);
                temp.push(t);
            } else {
                temp.push(cur[i]);
            }
        }
        debugArr(" return - ", temp);
        return temp;
    }
    function recurse (cur, prev, additional) {
        debugObj("REC: cur = ", cur, " prev = ", prev, "add =", additional);
        var result =  _.extend({}, additional);
        if (typeof cur === 'object') {
            if (! _.isArray(cur)) { // normal object
                Object.keys(cur).forEach(function (key) {
                    var value = cur[key];
                    //debugObj(" key = ", key, " value = ", value);
                    if (typeof value === 'object') {
                        var n = prev ? prev + "_" +key: key;
                        if (cur["id"]) {
                            additional = _.extend(additional, {"id": cur["id"]});
                        }

                        if (_.isArray(value)) { // value is array
                            if (output[n]) {
                                output[n] = _.union(output[n], parseArray(value, n, additional));
                            } else {
                                output[n] = parseArray(value, n, additional);
                            }
                            debugObj(" output after parseArray = ", output);
                        } else { // value is normal object
                            if (output[n]) {
                                output[n] = _.union(output[n], [recurse(value, n, additional)]);
                            } else {
                                output[n] = [recurse(value, n, additional)];
                            }
                            debugObj(" output after recurse = ", output);
                        }

                    } else { // native value key: value
                        result[key] = value;
                    }
                });
            } else { // incase only array is given
                output[prev] = parseArray(cur, prev, additional);
            }
        } else {
            // invalid json
            console.error("invalid json");
        }

        debugObj(" return - ", result);
        return result;
    }
    recurse(data, "", {});
    return output;
};

module.exports = Parser;