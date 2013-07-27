//mime类型
var mime = {
	avi:"video/x-msvideo",
	bmp:"image/bmp",
    css:"text/css",
	doc:"application/msword",
	exe:"application/octet-stream",
	gif:"image/gif",
	htm:"text/html",
	html:"text/html",
	ico:"image/x-icon",
	jpe:"image/jpeg",
	png:"image/png",
	jpeg:"image/jpeg",
	jpg:"image/jpeg",
	js:"text/javascript",
	swf:"application/x-shockwave-flash",
	txt:"text/plain",
	wav:"audio/x-wav",
	xla:"application/vnd.ms-excel",
	xlc:"application/vnd.ms-excel",
	xlm:"application/vnd.ms-excel",
	xls:"application/vnd.ms-excel",
	xlt:"application/vnd.ms-excel",
	xlw:"application/vnd.ms-excel",
	zip:"application/zip",
	mp4:"video/mp4",
	mp3:"application/octet-stream",
    woff:"application/font-woff",
    svg:"image/svg+xml",
    ttf:"application/font-ttf",
    otf:"application/font-otf",
    eot:"application/font-eot"
};

var forbiden =[
	"/favicon.ico",
    "/handleapp",
    "/lib",
    "/logfile",
    "/app.js" ,
    "/config.js",
    "/handler.js",
    "/route.js",
    "/temp",
    "/server.js"
];

var mongo_config = {
    server:"127.0.0.1",
    port:27017,
    databaseName:"test"
};

var redis_config = {
    password:"mmc0246810",
    server:"127.0.0.1",
    port:6578
};

var runtime = {
    isauth:false,
    isDebug:true,
    isLog:true,
    isLogDb:false,
    isOpenUnCaughtException:true,
    basePath:__dirname,
    sessionMode:0,
    uploadDir:__dirname+"\\temp"
};

var language={
    serverErr:"服务器繁忙"
};

var powerList={


};

module.exports.config = {
    mime:mime,
    forbiden:forbiden,
    c_mongo:mongo_config,
    c_redis:redis_config,
    runtime:runtime,
    language:language
}