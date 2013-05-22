/**
 * Created with JetBrains WebStorm.
 * User: LE
 * Date: 13-5-11
 * Time: 上午10:40
 * To change this template use File | Settings | File Templates.
 */
var mongo =require("../lib/mongoClient.js"),
    util = require("util");
var i=0;



var data =undefined;

var _handler = {
    requeststate:function(header,response){
        var opt ={
            collection:"static",
            query:{},
            fields:{
                _id:0,
                lastdate:1,
                time:1,
                path:1
            },
            sort:[["time","desc"]]
        };
        mongo.query(opt,function(err,pagedata){
                if(err){
                    utility.handleException(err);
                    response.end(configuration.config.language.serverErr);
                };
                pagedata.HandleTime = new Date() - header.starthandletime;
                response.end(JSON.stringify(pagedata));
            })
        //}
    }
};

function handle(header,response){
    response.writeHead(200,{
        "Content-Type":"text/plain"
    });
    if(header.auth){
        console.log(header.session);
    }
    var action = header.action;
    if(_handler[action]!=undefined){
        _handler[action](header,response);
    }else{
        response.end();
    }
}

exports.handle = handle;