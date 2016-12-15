/**
 * Created by poojam on 10/7/2016.
 */
/**
 * Created by poojam on 10/7/2016.
 */

var _ = require('lodash');
var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false }
];

_.filter(users, function(o) {
    console.log(o.user+"\n");
});



