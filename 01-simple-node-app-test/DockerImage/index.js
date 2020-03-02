var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

//-->following two line needed for POST/PUT etc.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function (req, res) {
    res.json({ msg: "Use '/sum' with POST to add a and b" });
});

router.post('/sum', function (req, res) {
    try {
        var data = req.body;

        if (data) {
            var a = data.a;
            var b = data.b;
            if(!a || !b){
                res.status(500).json({ msg: "Input not valid" });    
            }
            var c = a + b;
            res.status(200).json({sum: c});
        }
        else {
            res.status(500).json({ msg: "Input not valid" });
        }
    }
    catch (ex) {
        res.status(500).json({ msg: ex.message });
    }

});

app.use('/', router);
app.listen(9090, function () {
    console.log("Started listening at 9090");
});