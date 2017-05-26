var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.get('/[0-9]+$',function(req,res){
    var nums = +req.url.slice(1);
    var tStr = new Date(nums);
    var natuT = tStr.toLocaleDateString();
    var result = {
        'unix':nums,
        'natural':natuT
    };
    res.end(JSON.stringify(result));
    console.log(JSON.stringify(result));
});

app.get('/*',function(req,res){
    var urls = req.url.slice(1);
    var strDecode = decodeURI(urls);
    var d = new Date(strDecode),result;
    if(!!d.getFullYear()){
        var unixT = d.getTime(),natuT = d.toLocaleDateString();
        result = {
            'unix':unixT,
            'natural':natuT
        };
        res.end(JSON.stringify(result));
        return;
    }
    result = {
        'unix':null,
        'natural':null
    };
    res.end(JSON.stringify(result));
})

app.listen('8080');