var levelup = require('level');
var opt = { valueEncoding: 'json' };
var db = levelup('./testdb2', opt);

db.batch()
    .put('fruits!apple', {
        name: 'Apple',
        price: 300,
        color: 'red'    
    })
    .put('fruits!orange', {
        name: 'Orange',
        price: 200,
        color: 'orange'    
    })
    .put('fruits!banana', {
        name: 'Banana',
        price: 400,
        color: 'yellow'    
    })
    .put('fruits!kiwi', {
        name: 'Kiwi',
        price: 700,
        color: 'green'    
    })
    .put('snack!potato', {
        name: 'PotatoChips',
        price: 900,
        color: 'beige'    
    })
    .put('snack!choco', {
        name: 'Chocolate',
        price: 800,
        color: 'black'    
    })
    .write(testKeys);

function testKeys() {
    console.log("keys:");
    db.createKeyStream()
        .on('data', function(key) {
            console.log(" - " + key);
        })
        .on('end', testKeyValues);
}

function testKeyValues() {
    console.log('\nkey-value-list:');
    db.createReadStream()
        .on('data', function(data) {
            var key = data.key;
            var o = data.value;
            console.log('+ key = ' + data.key);
            console.log('| name = ' + o.name);
            console.log('| color = ' + o.color);
            console.log('| price = ' + o.price);
        })
        .on('end', testSearch);
}

function testSearch() {
    console.log('\nrange-search');
    var opt = {
        start: 'fruits!',
        end: 'fruits!\xFF'
    };
    db.createReadStream(opt)
        .on('data', function(data) {
            console.log('+ key = ' + data.key);
        })
        .on('end', function() {
            console.log('ok');
        });
}
