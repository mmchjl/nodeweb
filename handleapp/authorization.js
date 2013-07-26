/**
 * Created with JetBrains WebStorm.
 * User: NL_LE
 * Date: 13-6-28
 * Time: 下午1:37
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
    login:function(header,response){
          var option={
              collection:"user",
              query:{
                  account:header.queryString.account,
                  password:utility.MD5(header.queryString.password)
              }
          }
        mongo.findOne(option,function(err,data){
            if(err){
                utility.handleException(err);
                response.endJson({result:false,code:500,msg:err.message});
            }else{
                response.endJson({result:true,code:200});
            }
        })
    },
    check:function(header,response){
        var account = header.queryString.account;
        _h.checkExists(account,function(result){
            if(result){
                response.end(JSON.stringify({result:false,code:0}));
            }else{
                response.end(JSON.stringify({result:true,code:1}));
            }
        })
    }
};

var _h = {
    checkExists:function(accout,callback){
        var option = {
            collection:"user",
            query:{
                account:accout
            }
        };
        mongo.findOne(option,function(err,data){
            if(err){
                utility.handleException(err);
            }
            if(utility.isNull(data)){
               callback(false);
            }else{
                callback(true);
            }

        })
    }
};

module.exports.handle = handle;