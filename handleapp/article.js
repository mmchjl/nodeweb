/**
 * Created with JetBrains WebStorm.
 * User: NL_LE
 * Date: 13-7-26
 * Time: 上午11:18
 * To change this template use File | Settings | File Templates.
 */

var mongo  = require("../lib/mongoClient.js"),
    handleBase = require("./handleAppBase.js").handleBase;

function handle(header,response){
    app.handle(header,response)
}

var _handler = {
    add:function(header,response){
        var t = JSON.parse(header.fields.data);
        t=utility.objectValid(t);
        var newobject = {};
        newobject.type_int = t.type_int;
        newobject.title_str = t.title_str||"";
        newobject.content_str = t.content_str||"";
        newobject.updateTime_date = parseInt(t.updateTime_date);
        newobject.tags=[];
        if(!utility.isNull(t.tags)){
            for(var i=0;i< t.tags.length;i++){
                newobject.tags.push({
                    name_str: t.tags[i],
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
                return response.endJson({result:false,data:{code:500}});
            }
            response.endJson({result:true,data:{code:200}});
            console.dir(data);
        });
    },
    getlist:function(header,response){
        var opt={
            collection:"article",
            query:{}
        };
        if(header.get("type_int")) opt.query.type_int =parseInt(header.get("type_int"));
        //if(header.get("tags"))
        mongo.query(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false,data:{
                    code:500
                }});
            }
            for(var i =0;i<data.list.length;i++){
                data.list[i].content_str = data.list[i].content_str.HtmlDecode()
            }
            response.endJson({
                result:true,
                data:data
            });
        });
    },
    getrange:function(header,response){
        var opt={
            collection:"article",
            query:{},
            fields:{_id:1,title_str:1}
        };
        mongo.query(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false,data:{code:500}});
            }
            response.endJson({
                result:true,
                data:data
            });
        });
    } ,
    gettags:function(header,response){

    },
    list:function(header,response){
        var opt={
            collection:"article",
            query:{},
            fields:{
                _id:1,
                title_str:1,
                updateTime_date:1,
                tags:1
            }
        };
        if(header.get("type_int")) opt.query.type_int =parseInt(header.get("type_int"));
        //if(header.get("tags"))
        mongo.query(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({
                    result:false,
                    data:data
                })
            }
            response.endJson({
                result:true,
                data:data
            });
        });
    },
    detail:function(header,response){
        var opt = {
            collection:app.opt.collection,
            query:{
                _id:header.get("id")
            }
        };
        mongo.findOne(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false,data:{code:500}});
            }
            if(utility.isNull(data)) return response.endJson({result:false});
            data.result = true;
            response.endJson(data);
        })
    }
};

var app = new handleBase("article",_handler);

module.exports.handle = handle;