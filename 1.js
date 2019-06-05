var client = require('cheerio-httpcli');

var code = 'USDKRW=X';
var url = 'http://finance.yahoo.com/q';

client.fetch(url, { 's': code }, function(err, $, res) {
    if (err) {
        console.log('error');
        return;
    }
    var str = $('#quote-header-info > div > div > div > span:nth-child(1)').text();
    str = str.replace(/,/g, "");
    var arr = str.match(/\d+[.]\d*/g);

    console.log(code);
    console.log(arr[0]);
});