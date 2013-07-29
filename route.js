﻿﻿var handler = require("./handler");
var formidable = require("formidable");
var querystring = require("querystring");
var path = require("path");
var util = require("util");
var  config = configuration.config,
    event = require("events"),
    url = require("url"),
    redis = require("./lib/redis.js"),
    session = require("./lib/session.js");

formidable.IncomingForm.uploadDir = configuration.config.uploadDir;
function route(request,response){
    if(request.method=="POST"){
        var form =new formidable.IncomingForm();
        form.parse(request,function(err,fields,files){
            if(err) utility.handleException(err);  form.uploadDir
            request.fields = fields;
            request.files = files;
            var _header = new header(request,response);
        });
    }else{
        request.fields = {};
        request.files = {};
        var _header = new header(request,response)
    }
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
    if(filter(this)) return this.emit("finish",this,response);
    this.fields = request.fields;
    this.files = request.files;
    if(utility.isUndefined(this.session.sessionId)){
        session.getSession(function(session){
            response.setCookie({
                key:"sessionId",
                value:session.sessionId
            });
            this.session.session = session.session;
            this.session.sessionId = session.sessionId;
            this.emit("finish",this,response);
        }.bind(this));
    }else{
       session.getSession(this.session.sessionId,function(__session){
           if(__session==null){
               session.getSession(function(_session){
                   response.setCookie({
                       key:"sessionId",
                       value:_session.sessionId
                   });
                   this.session.session = _session.session;
                   this.session.sessionId = _session.sessionId;
                   //utility.debug("path:"+this.path+"：header中存在sessionId，但是服务器端不存在与之对应的session，但已赋值："+_session.sessionId)
                   this.emit("finish",this,response);
               }.bind(this))
           }else{
                this.session.session = __session.session;
                this.session.sessionId = __session.sessionId;
                //utility.debug("path:"+this.path+"：header 中存在sessionid，同时服务器端有与之对应的session:"+__session.sessionId)
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

header.prototype.get = function(name){
    if(this.queryString[name]){
        return this.queryString[name];
    }else if(this.fields[name]){
        return this.fields[name];
    }else{
        return undefined;
    }
}



exports.route= route;