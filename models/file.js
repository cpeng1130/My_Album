var fs= require("fs");

exports.getAllAlbums=function (callback) {
    fs.readdir("./uploads",function (err,files) {
        if(err){
            callback("can not find uploads file",null);
            return;
        }
        var allAlbums=[];
        console.log(__dirname);
        console.log(files);
        (function iterator(i){
            if(i==files.length){
               callback(null,allAlbums);
               return;
            }
            fs.stat("./uploads/"+files[i],function(err,stats){
                if(err){
                    callback("can not find file"+files[i],null);
                    return;
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);

    });
   // return ["xxx","xxx"];
};

exports.getAllImageByAlbumName=function (albumName,callback) {
    console.log("albumName"+albumName);
    fs.readdir("./uploads/"+albumName,function (err,files) {
        if(err){
            callback("cannot find this file by function getAllImageByAlbumName",null);
            return;
        }
        var allImages=[];
        (function iterator(i){
            if(i==files.length){
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/"+albumName+"/"+files[i],function (err,stats) {
                if(err){
                    callback("can not find file"+file[i],null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            });

        })(0)
    });
};