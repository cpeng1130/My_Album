/**
 * Created by Peng on 2016-11-25.
 */
var file=require("../models/file.js");
var formidable = require('formidable');
var path=require('path');
var fs=require("fs");

var sd = require('silly-datetime');
exports.showIndex=function(req,res){
   /* res.render("index",{
        "albums":file.getAllAlbums()
    });*/
    file.getAllAlbums(function(err,allAlbums){
        if(err){
           return res.send(err);
           
        }
        res.render("index",{
            "albums":allAlbums
        });
    });
};
exports.showAlbum=function (req,res,next) {
    var albumName=req.param("albumName");
    //console.log(albumName);
    file.getAllImageByAlbumName(albumName,function(err,imageArray){
        if(err){
          next();
            return;
        }
        res.render("album",{
            "albumName":albumName,
            "images": imageArray
        });

    })
};
exports.showUp=function (req,res) {
    file.getAllAlbums(function(err,albums){
        if(err){
            res.render("err");
            return;
        }
        res.render("up",{
            "albums":albums
        });

    });

};
exports.doPost=function (req,res) {

        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir=path.normalize(__dirname+"/../temp_up_pic/");
        form.parse(req, function (err, fields, files,next) {

            var fileSize=files.picName.size;
            if(fileSize>1024){
                res.send("file size is over 1024");
                fs.unlink(files.picName.path);
                return;
            }
            var ttt=sd.format(new Date(),"YYYYMMDDHHmmss");
            var ran=parseInt(Math.random()*89999+10000);
            var extname= path.extname(files.picName.name);


            console.log(fields);
            console.log(files);
            var oldpath=files.picName.path;
            var newpath=path.normalize(__dirname+"/../uploads/"+fields.picFileName+"/"+ttt+ran+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("cannot changing file name");
                    return;
                }


            });
            if(err){
                next();
                return;
            }
           /* res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));*/
        });

};