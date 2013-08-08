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
        newobject.synopsis_str = t.synopsis_str||"";
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
        response.removeCookie("sessionId");
        if(header.get("type_int")) opt.query.type_int =parseInt(header.get("type_int"));
        mongo.query(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false,data:{
                    code:500
                }});
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
            fields:{_id:1,title_str:1,views:1,"comments.commentId":1}
        };
        mongo.query(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false,data:{code:500}});
            }
            if(data){
                for(var i=0;i<data.list.length;i++) {
                    if(data.list[i].comments){
                        data.list[i].replies = data.list[i].comments.length;
                        delete data.list[i].comments;
                    }else{
                        data.list[i].replies = 0;
                    }
                }
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
                tags:1,
                views:1,
                "comments.commentId":1,
                synopsis_str:1
            },
            sort:[["updateTime_date",-1]]
        };
        if(header.get("type_int")) opt.query.type_int =parseInt(header.get("type_int"));
        //if(header.get("tags"))
        mongo.query(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({
                    result:false,
                })
            }
            if(data){
                for(var i=0;i<data.list.length;i++) {
                    if(data.list[i].comments){
                        data.list[i].replies = data.list[i].comments.length;
                        delete data.list[i].comments;
                    }else{
                        data.list[i].replies=0;
                    }
                }
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
            },
            newObject:{
                $inc:{views:1}
            }
        };
        mongo.update(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false,data:{code:500}});
            }else{
                delete  opt.newObject;
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
        });
    },
    comment:function(header,response){
        var temp = JSON.parse(header.fields.data);
        if(temp){
            temp = utility.objectValid(temp);
        }else{
            return response.endJson({result:false});
        }
        var id = temp.id;
        delete temp.id
        var opt = {
            collection:app.opt.collection,
            query:{_id:id},
            newObject:{
                $push:{
                    comments:
                    temp
                }
            }
        }
        mongo.update(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return response.endJson({result:false});
            }
            return response.endJson({result:true});
        });
    },
    thumb:function(header,response){
        var id = header.queryString.articleId_str,
            commentId = header.queryString.commentId_str,
            isYes = header.queryString.type_int==1?true:false;
        var opt={
                collection:app.opt.collection,
                query:{
                    _id:id,
                    "comments.commentId":commentId
                },
                newObject:{
                    $inc:{
                       "comments.$.yes":1
                    }
                }
            };
         if(!isYes) {
             opt.newObject.$inc["comments.$.no"] = 1;
             delete opt.newObject.$inc["comments.$.yes"];
         }
        mongo.update(opt,function(err,data){
            if(err){
                utility.handleException(err);
                return   response.endJson({result:false})
            }
            return response.endJson({result:true})
        });

    }
};

var app = new handleBase("article",_handler);

module.exports.handle = handle;