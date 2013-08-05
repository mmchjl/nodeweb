/**
 * Created with JetBrains WebStorm.
 * User: NL_LE
 * Date: 13-8-5
 * Time: 下午2:55
 * To change this template use File | Settings | File Templates.
 */


function handleBase(collection,handler){
    this.opt={};
    this.opt.collection = collection||"";
    this._handler=handler||{};
}

handleBase.prototype.handle=function(header,response){
    response.writeHead(200,{
        "Content-Type":"text/plain; charset=utf-8"
    });
    var action = header.action.toLowerCase();
    if(this._handler[action]!=undefined){
        this._handler[action](header,response);
    }else{
        response.end();
    }
};

module.exports.handleBase = handleBase;