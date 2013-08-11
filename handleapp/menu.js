/**
 * Created with JetBrains WebStorm.
 * User: LE
 * Date: 13-8-11
 * Time: 下午10:36
 * To change this template use File | Settings | File Templates.
 */

var mongo = require("../lib/mongoClient.js"),
    handleBase = require("./handleAppBase.js").handleBase;

var _handle = {
    add:function(header,response){

    },
    getlist:function(header,response){

    },
    update:function(header,response){

    },
    remove:function(header,response){

    }
};

var app = new  handleBase("menu",_handle);

app.isAuthorization = false;

function handle(header,response){
    return app.handle(header,response);
}

module.exports.handle = handle;