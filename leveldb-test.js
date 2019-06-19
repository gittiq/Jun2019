var levelup = require('level');
var db = levelup('./testdb');

db.put('Apple', 'red', function(err) {
    if (err) {
        console.log('Error: put', err);
        return;
    }
    testGet();
});


function testGet() {
    db.get('Apple', function(err, value) {
        if (err) {
            console.log('Error', err);
            return;
        }
        console.log('Apple=' + value);
        testBatch();
    })
}

function testBatch() {
    db.batch().put('Mango', 'yellow')
            .put('Banana', 'yellow')
            .put('Kiwi', 'green')
            .write(function() {
                testGet2();
            });
}

function testGet2() {
    db.get('Banana', function(err, value) {
        if (err) {
            console.log('Error', err);
            return;
        }
        console.log('Banana=', value);
    })
}

