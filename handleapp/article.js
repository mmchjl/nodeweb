/**
 * Created with JetBrains WebStorm.
 * User: NL_LE
 * Date: 13-7-26
 * Time: 上午11:18
 * To change this template use File | Settings | File Templates.
 */

var mongo  = require("../lib/mongoClient.js");

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
    add:function(header,response){
        var t = JSON.parse(header.fields.data);
        console.dir(t);
        var newobject = {};
        newobject.title_str = t.title_str||"";
        newobject.content_str = t.content_str||"";
        newobject.updateTime_date = parseInt(t.updateTime_date);
        newobject.tag=[];
        if(!utility.isNull(t.tag)){
                for(var i=0;i< t.tag.length;i++){
                    newobject.tag.push({
                        name_str: t.tag[i],
                        hit:0
                    });
                }
            }
        var option={
            collection:"article",
            query:{},
            newObject:newobject
        }
        console.dir(option);
        mongo.insert(option,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false,code:500});
            }
            response.endJson({result:true,code:200});
            console.dir(data);
        });
    }
};

module.exports.handle = handle;