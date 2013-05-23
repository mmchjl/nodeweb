var handler = require("./handler");
var formidable = require("formidable");
var querystring = require("querystring");
var path = require("path");
var util = require("util");
var  config = configuration.config,
    event = require("events"),
    url = require("url"),
    redis = require("./lib/redis.js"),
    session = require("./lib/session.js");

function route(request,response){
	 var _header = new header(request,response);
}

//过滤禁止访问的请求
function filter(header){
	var _path = header.handler;
    var _file = header.path;
	var forbiden = config.forbiden;
    var result = forbiden.Exists(function(obj){
          if( obj==_path||obj==_file){
              return true;
          }else{
              return false;
          }
    })
	return result;
}


util.inherits(header,event.EventEmitter);
function header(request,response){
	event.EventEmitter.call(this);
    this.starthandletime = new Date();
	this.rawUrl = request.url;
	this.path = this.rawUrl.indexOf("?")==-1?this.rawUrl:this.rawUrl.split("?")[0];
	this.queryString = this.rawUrl.indexOf("?")>0?querystring.parse(this.rawUrl.split("?")[1]):{};
    this.tempUrl = url.parse(this.rawUrl,true);
	this.method = request.method;
	this.handler = path.dirname(this.tempUrl.pathname);
    this.action = path.basename(this.tempUrl.pathname);
	this.baseName = path.basename(this.path);
	this._extname = path.extname(this.baseName);
	var len = path.extname(this.baseName).length;
	this.extname = this._extname.indexOf(".")==0?this._extname.substr(1,len):"";
	this.cookie= request.headers.cookie?querystring.parse(request.headers.cookie,"; ","="):{};
    this.session = {};
    this.session.sessionId = this.cookie.sessionId;
    this.auth =false;
    if(filter(this)) return;
    var first = request.socket.ondata.arguments[0],
        second = request.socket.ondata.arguments[1],
        thrid = request.socket.ondata.arguments[2];
    if(this.method=="POST"){
        var formdata = first.slice(second,thrid).toString().split("\r\n\r\n");
        var fields = querystring.parse(formdata[1]);
        this.fields = fields;
    }
    if(utility.isUndefined(this.session.sessionId)){
        session.getSession(function(session){
            response.setHeader("Set-Cookie","sessionId="+session.sessionId);
            this.session.session = session.session;
            this.session.sessionId = session.sessionId;
            this.emit("finish",this,response);
            utility.debug("path:"+this.path+"：header中不存在sessionId,但已经赋值："+session.sessionId)
        }.bind(this));
    }else{
       session.getSession(this.session.sessionId,function(__session){
           if(__session==null){
               session.getSession(function(_session){
                   response.setHeader("Set-Cookie","sessionId="+_session.sessionId);
                   this.session.session = _session.session;
                   this.session.sessionId = _session.sessionId;
                   utility.debug("path:"+this.path+"：header中存在sessionId，但是服务器端不存在与之对应的session，但已赋值："+_session.sessionId)
                   this.emit("finish",this,response);
               }.bind(this))
           }else{
                this.session.session = __session.session;
                this.session.sessionId = __session.sessionId;
                utility.debug("path:"+this.path+"：header 中存在sessionid，同时服务器端有与之对应的session:"+__session.sessionId)
                this.emit("finish",this,response);
           }
       }.bind(this))
    }
}
header.prototype.on("finish",function(head,response){
		// console.log(response);
		if(!filter(head)){
			try{
				handler.handle(head,response);
			}
			catch(e){
				 console.dir(e);
				response.writeHead(500,{
					"Content-type":" text/html"
				})
				response.write("server wrong~");
				response.write("<br/>"+e.message);
				response.end();
               utility.handleException(e);
			}
		}else{
            response.writeHead(404,{
                "Content-Type":"text/plain chartset=utf8",
                "Powder-By":"Node"
            });
			response.end();
		}
	})


exports.route= route;