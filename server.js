var http = require("http");
var fs = require("fs");

var myServer = http.createServer(function(req, res) {
    var html = fs.readFileSync("./dist/index.html");
    res.write(html);
    res.end();
});

myServer.listen("3100", function(err) {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("服务器3100");
});
