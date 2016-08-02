let request = require('request');
let readlineSync = require('readline-sync');

console.log('welcome!');


function getInput() {
    let zipcode = readlineSync.question('请输入邮编：');
    translate(zipcode);
}

function translate(zipcode) {
    let option = {
        url:"http://localhost:3000/translator",
        method:"POST",
        json:true,
        body:{'zipcode':zipcode}
    };
    request(option,function (error, response, body) {
        console.log(body);
        getInput();
    });
}

getInput();