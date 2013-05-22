/**
 * Created with JetBrains WebStorm.
 * User: LE
 * Date: 13-5-5
 * Time: 下午4:03
 * To change this template use File | Settings | File Templates.
 */

var redis = require("redis"),
    client = {};

exports.redis = function(){
    try
    {
        if(typeof (client)==undefined){
            console.info("call createClient");
            client = redis.createClient();
        }
        return client;
    }catch(e){
        throw e;
    }

}


exports.hGetAll = function(key){
    client.hgetall(key,function(err,data){
        if(err) throw err;
    });
}