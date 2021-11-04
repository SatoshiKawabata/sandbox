const geohash = require('ngeohash');
// const a = geohash.decode_bbox('xph992');
// console.log(a);
var latlon = geohash.decode('xph992');
console.log(latlon);
console.log(latlon.latitude);
console.log(latlon.longitude);