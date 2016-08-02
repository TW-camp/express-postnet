let express = require('express');
let bodyParser=require('body-parser');
let BarcodeToZipcode = require('./postnet/src/BarcodeToZipcode');
let ZipcodeToBarcode = require('./postnet/src/ZipcodeToBarcode');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function (req, res) {
    res.sendfile('./html/zipcodePage.html');
})

app.post('/index',function (req, res) {
    let show = req.body.menu;
    if(show==="1"||show==="2"){
        res.send(true);
    }else {
        res.send(false);
    }
})

app.post('/translator',function (req, res) {
    let translatorZipcode = new ZipcodeToBarcode().execute(req.body.zipcode);
    let translatorBarcode =new BarcodeToZipcode().execute(req.body.zipcode);
    if(translatorZipcode._type){
        res.send("转码结果是："+translatorZipcode._text)
    }else if(translatorBarcode._type){
        res.send("转码结果是："+translatorBarcode._text)
    }else {
        res.send("您的输入有误，请重新输入。")
    }
})
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


