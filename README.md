readfilebyline
==============

## Read file line by line for node js
```
    var Rl = require('readfilebyline'),
        rl = new Rl('filename');
    rl.on('data', function (linedata) { // do something });
    rl.on('end', function () { // end });
```
