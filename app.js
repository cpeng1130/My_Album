var express = require("express");

var app= express();
var router=require("./controller/router.js");

app.set("view engine","ejs");


app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.get("/admin",function (req,res) {
    res.send("admin");
});
app.get("/",router.showIndex);
app.get("/:albumName",router.showAlbum);
app.get("/:up",router.showUp);
app.post("/:up",router.doPost);

app.use(function(req,res){
    res.render("err",{
        "baseurl": req.pathname
    });
});
app.listen(3000);