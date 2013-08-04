/**
 * Created with JetBrains WebStorm.
 * User: LE
 * Date: 13-8-3
 * Time: 下午8:12
 * To change this template use File | Settings | File Templates.
 */

var mongo  = require("../lib/mongoClient.js"),
    fs = require("fs"),
    path = require("path");

function handle(header,response){
    response.writeHead(200,{
        "Content-Type":"text/plain"
    });
    var action = header.action;
    if(_handler[action]!=undefined){
        _handler[action](header,response);
    }else{
        response.end();
    }
}

var _handler = {
    uploadimg:function(header,response){
        console.dir(header.files)
        _filePath = header.files.imgFile.path;
        var name = path.basename(_filePath);
        var extName = path.extname(header.files.imgFile.name);
        var newName = utility.Format("{0}{1}",name,extName);
        fs.rename(_filePath,utility.Format("{0}{1}",_filePath,extName),function(err){
            if(err) {
                utility.handleException(err);
                return response.endJson({
                    error:1
                });
            }
            var url = utility.Format("./temp/{0}",path.basename(newName));
            response.endJson({
                error:0,
                url:url
            });
        })
        console.dir({
            config:configuration.config.runtime.uploadDir,
            path:_filePath,
            filePath:newName,
            url:utility.Format("./temp/{0}",path.basename(newName))
        });
    }
};

module.exports.handle = handle;