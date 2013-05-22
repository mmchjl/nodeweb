﻿var htmlEditor;
function FCKeditor_OnComplete(editorInstance) {
    htmlEditor = editorInstance;
    htmlEditor.onerror = function() {
        event.returnValue = false;
        return false;
    };
    if (typeof (htmlEditor_OnComplete) != "undefined") {
        htmlEditor_OnComplete();
    }
}


/*
function NengLong_CMP_Web_SetTabStripStyle(id) {
var obj = document.getElementById(id);
obj.tabDefaultStyle = NengLong_Tab_DefaultStyle;
obj.tabSelectedStyle = NengLong_Tab_SelectedStyle;
obj.tabHoverStyle = NengLong_Tab_HoverStyle;

for (var i = 0; i < obj.numTabs; i++) {
var tab = obj.getTab(i);
tab.setAttribute("title", tab.getAttribute("innerText"));
}

}*/
/* 通用函数 */
var string = {
    Format: function() {
        if (!arguments[0]) {
            return "";
        }
        if (arguments.length == 1) {
            return arguments[0];
        }
        else if (arguments.length >= 2) {

            for (var i = 1; i < arguments.length; i++) {
                arguments[0] = arguments[0].replace(new RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
            }
            return arguments[0].replace(new RegExp("\\{", "gm"), "{").replace(new RegExp("\\}", "gm"), "}");
        }
    }
};


String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.LTrim = function() {
    return this.replace(/(^[\\s]*)/g, "");
};

String.prototype.RTrim = function() {
    return this.replace(/([\\s]*$)/g, "");
};
String.prototype.HtmlDecode = function() {
    return this.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
};
String.prototype.HtmlEncode = function() {
    return this.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
function isUndefined(obj) {
    return typeof (obj) == "undefined";
}
function isNull(obj) {
    return typeof (obj) == "undefined" || obj == null;
}
Array.prototype.ConvertAll = function(fun) {
    var r = [];
    for (var i = 0; i < this.length; i++) {
        r.push(fun(this[i]));
    }
    return r;
};
Array.prototype.FindAll = function(fun) {
    var r = [];
    for (var i = 0; i < this.length; i++) {
        if (fun(this[i])) r.push(this[i]);
    }
    return r;
};
Array.prototype.Find = function(fun) {
    for (var i = 0; i < this.length; i++) {
        if (fun(this[i])) return this[i];
    }
    return null;
};
Array.prototype.Exists = function(fun) {
    for (var i = 0; i < this.length; i++) {
        if (fun(this[i])) return true;
    }
    return false;

};
Array.prototype.Each = function(fun) {
    for (var i = 0; i < this.length; i++) {
        fun(this[i]);
    }
};
function CloneObj(target) {
    var obj = {};
    if (typeof target == "object") {
        var cb = arguments.callee;
        if (target instanceof Array) {
            for (var i = 0, obj = [], l = target.length; i < l; i++) {
                obj.push(cb(target[i]));
            }
            return obj;
        }
        for (var i in target) {
            obj[i] = cb(target[i]);
        }
        return obj;
    }
    return target;
}
/*
function NengLong_Refresh() {
location.href = location.href;
}*/

/*function NengLong_Trim(str) {
return str.replace(/(^\s*)|(\s*$)/g, "");
}
function NengLong_ArrayIndex(arr, obj) {
for (var i = 0; i < arr.length; i++) {
if (arr[i] == obj) {
return i;
}
}
return -1;
}
function NengLong_InsertCell(row, className, text) {
var cell = document.createElement('td');
cell.className = className;
cell.innerText = text;
row.appendChild(cell);

return cell;
}
function NengLong_InsertCheckBox(container, id, name, value) {
var chk = document.createElement("input");
chk.type = "checkbox";
chk.id = id;
chk.value = value;
container.appendChild(chk);

var label = document.createElement("label");
label.htmlFor = id;
label.innerText = name;
container.appendChild(label);

return chk;
}*/
function NengLong_Reflow() {
    $(document.body).hide().show();
}
function NengLong_Download_File(str) {
    //if (top.dialogHeight) {
    if (document.getElementById("Iframe_NengLong_Download_File") == null) {
        document.body.insertAdjacentHTML("beforeEnd", "<IFRAME ID='Iframe_NengLong_Download_File' NAME='Iframe_NengLong_Download_File' WIDTH='0' HEIGHT='0'></IFRAME>");
    }
    Iframe_NengLong_Download_File.location.href = str;
    // }
    // else {
    //     window.open(str);
    // }
}

function NengLong_LoadSound(id, url, autoStart) {
    var item = document.createElement("EMBED");
    item.name = id;
    item.id = id;
    item.src = url;
    item.loop = false;
    item.autoStart = autoStart;
    item.hidden = true;
    item.style.width = "0px";
    item.style.height = "0px";
    document.body.appendChild(item);

    return item;
}
function NengLong_PlaySound(id, url) {
    if (document.getElementById(id) != null) {
        var item = document.getElementById(id);
        item.url = url;
        item.play();
    }
    else {
        NengLong_LoadSound(id, url, true);
    }
}


/*
Cookie类
*/
//构造函数：用指定的名称和可选的性质为指定的文档创建一个cookie对象
//参数：
//	document：	保存cookie的Document对象。必需。
//	name：		指定cookie名的字符串。必需。
//	hours：		一个可选取的数字，指定从现在起到cookie过期的小时数。
//	path：		一个可选的字符串，指定了cookie的路径性质。
//	domain：	一个可选的字符串，指定了cookie的域性质。
//	secure：	一个可选取布尔值，如果为true，需要一个安全的cookie。
function Cookie(document, name, hours, path, domain, secure) {
    //	该对象所有预定义的属性都以'$'开头，
    //	这是为了与存储cookie中的属性值区别开。
    this.$document = document;
    this.$name = name;
    if (hours) {
        this.$expiration = new Date((new Date()).getTime() + hours * 3600000);
    }
    else {
        this.$expiration = null;
    }
    if (path) {
        this.$path = path;
    }
    else {
        this.$path = null;
    }
    if (domain) {
        this.$domain = domain;
    }
    else {
        this.$domain = null;
    }
    if (secure) {
        this.$secure = true;
    }
    else {
        this.$secure = false;
    }
}

Cookie.prototype.store = function() {
    // 首先遍历 cookie 对象的属性，并将cookie值连接起来。
    // 由于 cookie 将等号和分号作为分隔符，
    // 所以我们使用冒号和&来分隔存储在单个cookie值中的状态变量。
    // 注意，我们对第个状态的值进行转义，以防它含有标点符号或其他非法字符。
    var cookieval = "";
    for (var prop in this) {
        // 忽略所有名字以$开头的属性和所有方法

        if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) {
            continue;
        }

        if (cookieval != "") {
            cookieval += '&';
        }

        cookieval += prop + ':' + escape(this[prop]);
    }

    //既然我们已经有了cookie值，就可以连接完整的cookie串，
    // 其中包括名字和创建 cookie 对象时指定的各种性质。
    var cookie = this.$name + '=' + cookieval;
    if (this.$expiration) {
        cookie += ';expires=' + this.$expiration.toGMTString();
    }
    if (this.$path) {
        cookie += ';path=' + this.$path;
    }
    if (this.$domain) {
        cookie += ';domain=' + this.$domain;
    }
    if (this.$secure) {
        cookie += ';secure';
    }
    // 下面设置 Document.cookie 属性来保存 cookie。
    this.$document.cookie = cookie;
};

// 该函数是 cookie对象的 load()方法。
Cookie.prototype.load = function() {
    // 首先得到属于该文档的所有 cookie 的列表。
    // 通过读 Document.cookie 属性可以实现这一点。

    var allcookies = this.$document.cookie;
    if (allcookies == "") {
        return false;
    }
    // 下面从列表中提取已命名的cookie。
    var start = allcookies.indexOf(this.$name + '=');
    if (start == -1) {
        //该页未定义cookie
        return false;
    }
    //跳过名字和等号
    start += this.$name.length + 1;

    var end = allcookies.indexOf(';', start);
    if (end == -1) {
        end = allcookies.length;
    }
    var cookieval = allcookies.substring(start, end);

    // 既然我们已经提取出了已命名的cookie的值，
    // 就何以把字分割存储到状态变量名和值中。
    // 名字 / 值对由&分隔，名字和值之间则由冒号分隔。
    // 我们使用 split() 方法解析所有数据。
    //分割成名字/值对。
    var a = cookieval.split('&');

    for (var i = 0; i < a.length; i++) {
        a[i] = a[i].split(':');
    }

    // 既然我们已经解析了 cookie 值，
    // 就可以设置 cookie 对象中的状态变量的名字和值。
    // 注意我们对属性值调用了unescape()方法，因为存储它们时调用了escape()方法。
    for (var i = 0; i < a.length; i++) {
        this[a[i][0]] = unescape(a[i][1]);
    }

    //完成了，返回成功代码。
    return true;
};

//该函数是 cookie 对象的 remove() 方法
Cookie.prototype.remove = function() {
    var cookie;
    cookie = this.$name + '=';
    if (this.$path) {
        cookie += ';path=' + this.$path;
    }
    if (this.$domain) {
        cookie += ';domain=' + this.$domain;
    }
    cookie += ';expires=Fri, 02-Jan-1970 00:00:00 GMT';

    this.$document.cookie = cookie;
};
/*
END Cookie类
*/

//========================================================命名空间Begin===========================================================
var dc = new Object();
var Namespace = new Object();
Namespace.Register = function(fullNS) {
    var nsArray = fullNS.split('.');
    var sEval = "";
    var sNS = "";
    for (var i = 0; i < nsArray.length; i++) {
        if (i != 0) sNS += ".";
        sNS += nsArray[i];
        sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();";
    }
    if (sEval != "") eval(sEval);
};
Namespace.Exists = function(fullNS) {
    var nsArray = fullNS.split('.');
    var sNS = "";
    for (var i = 0; i < nsArray.length; i++) {
        if (i != 0) sNS += ".";
        sNS += nsArray[i];
        if (eval("typeof(" + sNS + ") == 'undefined'")) {
            return false;
        }
    }
    return true;
};
//========================================================命名空间End=============================================================

//========================================================系统函数Begin=============================================================
Namespace.Register("dc.System");
dc.System.LoadCss = function(file) {
    var cssTag = document.getElementById('loadCss');
    var head = document.getElementsByTagName('head').item(0);
    if (cssTag) head.removeChild(cssTag);
    var css = document.createElement('link');
    css.href = file;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.id = 'loadCss';
    head.appendChild(css);
};
dc.System.LoadJsList = function(files, onload, iscache) {
    if (files.length > 0) {
        Nenglong.System.LoadJs(files.shift(), function() {
            Nenglong.System.LoadJsList(files, onload);
        }, iscache);

    }
    else {
        onload();
    }
};
dc.System.LoadJs = function(file, onload, iscache) {
    var js = $("script");
    var exists = false;
    if (typeof (iscache) == undefined || iscache == null) {
        iscache = false;
    }
    for (var i = 0; i < js.length; i++) {
        if (js[i].src == file) { exists = true; break; }
    }
    if (exists) {
        onload();
    }
    else {
        $.loadScript(file, onload, iscache);
    }
};
dc.System.ObjectEqual = function(obj1, obj2) {
    if (obj1 == obj2) return true;
    var equal = true;
    $.each(obj1, function(key, value) {
        if (typeof (obj2[key]) == "undefined" || obj2[key] != value) {
            equal = false;
        }
    });
    if (equal) {
        $.each(obj2, function(key, value) {
            if (typeof (obj1[key]) == "undefined" || obj1[key] != value) {
                equal = false;
            }
        });
    }
    return equal;
};

dc.System.GetJqObjectById = function(idOrJq) {
    var $jq = null;

    if (idOrJq instanceof jQuery)
        $jq = idOrJq;
    else if (typeof (idOrJq) != "undefined" && idOrJq.length > 0) {
        $jq = $("#" + idOrJq);
    }

    return $jq;
};

Namespace.Register("dc.System.Url");
dc.System.Url.GetQueryString = function(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var sUrl = window.location.search;
    if (typeof (url) != "undefined") sUrl = Nenglong.System.Url.Query(url);
    var r = sUrl.replace("?", "").match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
dc.System.Url.RegEx = function(url) {
    //如果加上/g参数，那么只返回$0匹配。也就是说arr.length = 0 
    var re = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;
    //re.exec(url); 
    var arr = url.match(re);
    return arr;
};
dc.System.Url.Host = function(url) {
    var arr = Nenglong.System.Url.RegEx(url);
    return typeof (arr[2]) == "undefined" ? "" : arr[2];
};
dc.System.Url.Path = function(url) {
    var arr = Nenglong.System.Url.RegEx(url);
    return typeof (arr[4]) == "undefined" ? "" : arr[4];
};
dc.System.Url.FileName = function(url) {
    var arr = Nenglong.System.Url.RegEx(url);
    return typeof (arr[5]) == "undefined" ? "" : arr[5];
};
dc.System.Url.Query = function(url) {
    var arr = Nenglong.System.Url.RegEx(url);
    var str = typeof (arr[7]) == "undefined" ? '' : arr[7];
    str += typeof (arr[6]) == "undefined" ? '' : arr[6];
    if (str.indexOf("#!") >= 0)
        return str.replace("#!", "&");
    else if (str.indexOf("#") >= 0)
        return str.replace("#", "&");
    else
        return str;
};

//获取参数列表
dc.System.Url.QueryParams = function(url) {
    var sUrl;
    if (typeof (url) != "undefined")
        sUrl = url;
    else
        sUrl = window.location.href;
    var query = Nenglong.System.Url.Query(sUrl);
    if (query.length > 1) {
        // 获取链接中参数部分
        var queryString = query.substring(query.indexOf("?") + 1);
        // 分离参数对 ?key=value&key2=value2
        var parameters = queryString.split("&");
        if (parameters.length > 0) {
            var pos, paraName, paraValue;
            var qs = {};
            var qstr = '';
            for (var i = 0; i < parameters.length; i++) {
                // 获取等号位置
                pos = parameters[i].indexOf('=');
                if (pos == -1) { continue; }

                qstr += ',\"' + parameters[i].substring(0, pos) + '\":\"' + parameters[i].substring(pos + 1) + '\"';
            }
            if (qstr.length > 1) {
                qstr = '{' + qstr.substring(1) + '}';
                qs = eval("(" + qstr + ")");
                return qs;
            }
        }
    }
    return null;
};
//========================================================系统函数End===============================================================

//=======================================================模板函数BEGIN=============================================================
//$.jTemplatesDebugMode(true);
Namespace.Register("Nenglong.Template");
var G_TemplateList = {};

var NengLong_Template_Default_Options = {
    app: "",
    cmd: "",
    content: "",
    isPanel: false,
    parent: "form1",
    templateUrl: "",
    dataUrl: "",
    data: null,
    filterData: true,
    requestType: "get",
    params: {},
    preload: function(opt) { },
    onload: function(opt, data) { },
    unload: function(opt) { }
};
if (typeof (G_Template_Params) == "undefined") {
    var G_Template_Params = {
        module: "communicate",
        panel: "div_Main",
        cmd: "",
        app: "",
        options: {},
        defaultCmd: "",
        defaultApp: "",
        currentPath: { panel: "", cmd: "", app: "", data: {}, path: {}, options: {} },
        historyPathList: [],
        historyPathList2: [],
        onload: [],
        unload: []
    };
}


Nenglong.Template.G_Route = G_TemplateList;

//-------------------------------------------------类Begin---------------------------------------------------------------------
function NengLongTemplate() {
    this.templateOnLoadContextArray = [];
    this.loadingTemplateCount = 0;
    this.loadingTemplateCountIncludeOnload = 0;
    this.appAndCmdTemp = [];
}

NengLongTemplate.prototype.load = function(ops, isExtendBySelf, deep, isExtendPrevLoadParams, extendOnloadEvent) {
    if ($.isPlainObject(ops)) {
        ops = new Array(ops);
    }
    if ($.isArray(ops)) {
        for (var i = 0; i < ops.length; i++) {
            var options = null;
            var p = {};
            var cO = this.getTemplateOptions(ops[i]);
            if (isExtendPrevLoadParams) {
                var prevList = $("#" + cO.content).data("prevOptions");
                if (typeof (prevList) != "undefined") p = prevList[prevList.length - 1];
                //p = $("#" + cO.content).data("options");
            }
            if (isExtendBySelf) {
                options = $.extend(deep, {}, NengLong_Template_Default_Options, cO, p, ops[i]);
            } else {
                options = $.extend(deep, {}, NengLong_Template_Default_Options, cO, p);
            }
            //设最后的参数
            G_Template_Params.options = options;

            Nenglong.Template.G_Navi.saveLoadRoute(options);

            this.templateLoad(options, extendOnloadEvent);
        }
    }
};

NengLongTemplate.prototype.showLoading = function(content) {
    var con = $("#" + content);
    var $loading = con.find(".loading");
    if ($loading.length == 0) {
        $loading = $('<div class="loading"><div class="loadpic"></div><div class="NewsLoad"></div></div>');
        con.prepend($loading);
    }
    var height = con.height();
    var width = con.width();
    $loading.height(height).width(width);
    $loading.find(".NewsLoad").height(height).width(width);
    $loading.find(".loadpic").css("top", function() { return (($loading.height() - $(this).height()) / 2); }).css("left", function() { return (($loading.width() - $(this).width()) / 2); });
};

NengLongTemplate.prototype.hideLoading = function(content) {
    if (typeof (content) != "undefined" && content.length > 0) {
        //$('#' + content).find(".loading").remove();
    }
    else {
        //$('.loading').remove();
    }
}

NengLongTemplate.prototype.templateLoad = function(options, extendOnloadEvent) {
    //加载前函数
    var contentList = options.content.split(",");
    var _this = this;
    $.each(contentList, function(index, content) {
        if (options.showLoading)
            _this.showLoading(content);
    });

    if (options.preload(options) == false) {
        $.each(contentList, function(index, content) {
            if (options.showLoading)
                _this.hideLoading(content);
        });
        return;
    }
    //正常加载
    if (options.content.length == 0) {
        alert("app " + options.app + " cmd " + options.cmd + " content Id is empty");
        $.each(contentList, function(index, content) {
            if (options.showLoading)
                _this.hideLoading(content);
        });
        return;
    };
    this.loadingTemplateCount++;
    this.loadingTemplateCountIncludeOnload++;

    var urlList = options.templateUrl.split(",");
    if (contentList.length != urlList.length) {
        alert("content count is not equal to templateUrl count");
        $.each(contentList, function(index, content) {
            if (options.showLoading)
                _this.hideLoading(content);
        });
        return;
    };
    var contents = [];

    for (var i = 0; i < contentList.length; i++) {
        var $content = $("#" + $.trim(contentList[i]));
        if (options.isPanel && $content.length == 0) {
            $content = $(string.Format("<div id='{0}'></div>", $.trim(contentList[i])));
            $content.appendTo("#" + options.parent);
        };
        var url = $.trim(urlList[i]);
        if (url.indexOf("~") >= 0) {
            url = url.replace('~', NENGLONG_CMP_URL_BASE).replace("//", "/");
        }
        else if (url.indexOf(NENGLONG_CMP_URL_BASE) != 0 && url.indexOf("http://") < 0) {
            url = NENGLONG_CMP_URL_TEMPLATE + url;
        }
        //app应用跨域时
        if (url.indexOf("http://") >= 0 && url.indexOf(window.location.host) < 0) {
            url = Nenglong.System.App.GetProxyUrl(url);
        }
        $content.setTemplateURL(url, null, { filter_data: options.filterData });
        contents.push($content);
    }

    if (this.templateUnload(contents, options, true) == false) {
        G_NengLongLoading.animate(100);
        G_NengLongLoading.hide();
        return;
    }

    var dataUrl = options.dataUrl;
    if (typeof (options.data) != "undefined" && options.data != null && $.isPlainObject(options.data)) {
        this.templateOnLoadContextArray.push({ "options": options, "data": options.data, extendOnload: extendOnloadEvent });
        this.templateProcess(options, options.data, contents);
    }
    else {
        if (dataUrl != "") {
            if (dataUrl.indexOf("http://") < 0) {
                dataUrl = NENGLONG_CMP_URL_BASE + dataUrl;
            } else if (url.indexOf(window.location.host) < 0) {
                dataUrl = Nenglong.System.App.GetProxyUrl(dataUrl, options.params);
            }
            $.ajax({
                type: options.requestType,
                dataType: "json",
                url: dataUrl,
                data: options.params,
                success: function(data) {
                    _this.templateOnLoadContextArray.push({ "options": options, "data": data, extendOnload: extendOnloadEvent });
                    _this.templateProcess(options, data, contents);
                },
                error: function(rs) {
                    if (rs.status != 0) {
                        _this.loadingTemplateCount--;
                        //contents[0].html('loading error!');
                        //设置loading动画begin
                        G_NengLongLoading.animate(100);
                        G_NengLongLoading.hide();
                        //设置loading动画end
                        Nenglong.UI.AlertMessage("数据加载失败、请重试！", function() {
                            var contentList = options.content.split(",");
                            $.each(contentList, function(index, content) {
                                _this.hideLoading(content);
                            });
                        });
                    }
                }
            });
        } else {
            this.templateOnLoadContextArray.push({ "options": options, "data": null, extendOnload: extendOnloadEvent });
            this.templateProcess(options, null, contents);
        }
    }
};

NengLongTemplate.prototype.templateUnload = function(contents, options, findChildren) {
    var r = true;
    for (var i = 0; i < contents.length; i++) {
        var opt = contents[i].data("currentOptions");
        if (opt) {
            if (findChildren) {
                var list = [];
                $("[templateLoad=true]", contents[i]).each(function() { list.push($(this)); });
                if (list.length > 0) {
                    var sr = this.templateUnload(list, options, false);
                    if (r != false)
                        r = sr;
                }
            }
            var sr = opt.unload(opt, options);
            if (r != false)
                r = sr;
        }
        if (r != false) {
            contents[i].attr("templateLoad", "true");
            if (findChildren)
                contents[i].data("currentOptions", options);
            else
                contents[i].data("currentOptions", null);
        }
    }

    for (var i = 0; i < G_Template_Params.unload.length; i++) {
        var sr = G_Template_Params.unload[i](opt, options);
        if (rv != false)
            r = sr;
    }

    if (r != false)
        Nenglong.Template.G_Path.releasePath(opt);

    return r;
};


NengLongTemplate.prototype.templateProcess = function(options, data, contents) {
    //G_Template_Params.LoadPath(G_Template_Params.options);
    //var _this = this;
    for (var i = 0; i < contents.length; i++) {
        contents[i].processTemplate(data);
        var domList = $("[template=true][load=true]", contents[i]).toArray();
        for (var j = 0; j < domList.length; j++) {
            this.load(getDomAppAndCmd(domList[j]));
        }
    };
    this.loadingTemplateCount--;
    //设置loading动画begin
    var p = G_NengLongLoading.progress + 30 / this.loadingTemplateCount;
    G_NengLongLoading.animate(p > 90 ? 90 : p);

    //设置loading动画end
    if (this.loadingTemplateCount == 0) {
        //一个指令中加载其它指令时，取第一个为路径指令。
        G_Template_Params.currentPath.panel = this.appAndCmdTemp[0].panel;
        G_Template_Params.currentPath.app = this.appAndCmdTemp[0].app;
        G_Template_Params.currentPath.cmd = this.appAndCmdTemp[0].cmd;
        G_Template_Params.currentPath.data = data;
        G_Template_Params.currentPath.path = G_Template_Params.options.path;

        //for (var i = this.templateOnLoadContextArray.length - 1; i >= 0; i--) {
        for (var i = 0; i < this.templateOnLoadContextArray.length; i++) {
            for (var j = 0; j < G_Template_Params.onload.length; j++) {
                G_Template_Params.onload[j](this.templateOnLoadContextArray[i].options, this.templateOnLoadContextArray[i].data);
            }

            Nenglong.Template.G_Path.addHistory(this.templateOnLoadContextArray[i].options, this.templateOnLoadContextArray[i].data);

            this.templateOnLoadContextArray[i].options.onload(this.templateOnLoadContextArray[i].options, this.templateOnLoadContextArray[i].data);
            if (this.templateOnLoadContextArray[i].extendOnload && $.isFunction(this.templateOnLoadContextArray[i].extendOnload))
                this.templateOnLoadContextArray[i].extendOnload(this.templateOnLoadContextArray[i].options, this.templateOnLoadContextArray[i].data);

            this.loadingTemplateCountIncludeOnload--;

            var contentIds = this.templateOnLoadContextArray[i].options.content.split(",");
            for (var j = 0; j < contentIds.length; j++) {
                var $con = $("#" + contentIds[j]);
                if ($con.length > 0) {
                    var prevList = $con.data("prevOptions");
                    if (typeof (prevList) == "undefined") {
                        $con.data("prevOptions", []);
                        prevList = $con.data("prevOptions");
                    }
                    prevList.push(this.templateOnLoadContextArray[i].options);
                    if (prevList.length > 10) prevList.shift();
                    //$("#" + contentIds[j]).data("options", this.templateOnLoadContextArray[i].options);
                }
            };

        }

        //设置loading动画begin
        G_NengLongLoading.animate(100);
        G_NengLongLoading.hide();
        //设置loading动画end
    }
    if (this.loadingTemplateCountIncludeOnload == 0) {
        Nenglong.Template.G_Navi.createNaviFromRoute(options);
        Nenglong.Template.G_Path.createPath();
    }
};

NengLongTemplate.prototype.getTemplateOptions = function(obj) {
    var app = obj.app, cmd = obj.cmd;
    var returnVal = null;

    if (typeof (app) != "undefined" && app != null) G_Template_Params.app = app;
    if (typeof (cmd) != "undefined" && cmd != null) G_Template_Params.cmd = cmd;
    var cApp = G_Template_Params.app, cCmd = G_Template_Params.cmd;

    if (typeof (G_TemplateList[cApp]) == "undefined") {
        returnVal = G_TemplateList[G_Template_Params.defaultApp][G_Template_Params.defaultCmd];
    }
    else {
        if (typeof (G_TemplateList[cApp][cCmd]) == "undefined") {
            var defaultObj = null;
            $.each(G_TemplateList[cApp], function(key, value) { defaultObj = value; return false; });
            if (defaultObj != null)
                returnVal = defaultObj;
            else
                returnVal = G_TemplateList[G_Template_Params.defaultApp][G_Template_Params.defaultCmd];
            //if (typeof (cmd) == "undefined") {
            //    return G_TemplateList[cApp][G_Template_Params.defaultCmd];
            //}
            //else {
            //    return G_TemplateList[G_Template_Params.defaultApp][cmd];
            //}
        }
        else {
            returnVal = G_TemplateList[cApp][cCmd];
        }
    }
    if (returnVal.isPanel) {
        G_Template_Params.panel = returnVal.content;
        G_Template_Params.module = returnVal.app;
    }
    this.appAndCmdTemp.push({ panel: G_Template_Params.panel, app: returnVal.app, cmd: returnVal.cmd });
    return returnVal;
};
//-------------------------------------------------类End-----------------------------------------------------------------------

//-------------------------------------------------以下是模板公有函数--------------------------------------------------------


$.ajaxSetup({
    complete: function(xhr, ts) {
        AjaxSetupcomplete(xhr, ts);
    },
    statusCode: {
        302: function() {
            location.href = NENGLONG_CMP_LOGINPAGE;
        }
    }
});

function AjaxSetupcomplete(xhr, ts) {
    //加上undefined判断是为了getScript跨域时不出错
    if (typeof (xhr) != "undefined" && typeof (xhr.responseText) != "undefined") {
        if (xhr.responseText == "unlogin") {
            if (top.dialogHeight) {
                top.close();
            }
            else {
                top.location.href = NENGLONG_CMP_LOGINPAGE;
            }
        }
        else if (xhr.responseText.indexOf("<SCRIPT language='javascript'>") == 0) {
            var script = xhr.responseText.replace("<SCRIPT language='javascript'>", "").replace("</SCRIPT>", "");
            eval(script);
        }
    }
}



//页面初始化
function NengLongTemplateInit() {
    $("[template=true][load=true]").each(function() {
        NengLongTemplateLoad(getDomAppAndCmd(this));
    });

    $("[template=true][click=true]").live("click", function() {
        NengLongTemplateLoad(getDomAppAndCmd(this));
    });
}

//加载模板
//isNoShowLoading不展现加载动画
function NengLongTemplateLoad(ops, isExtendBySelf, deep, isExtendPrevLoadParams, extendOnLoadEvent, isNoShowLoading) {
    if (isNoShowLoading == null || isNoShowLoading == false) {
        G_NengLongLoading.show();
    }

    if (!arguments[1]) isExtendBySelf = true;
    if (!arguments[2]) deep = false;
    if (!arguments[3]) isExtendPrevLoadParams = false;
    if (!arguments[4] && $.isFunction(arguments[4]) == false) extendOnLoadEvent = function() { };
    var o = new NengLongTemplate();
    o.load(ops, isExtendBySelf, deep, isExtendPrevLoadParams, extendOnLoadEvent);
    return;
}

//刷新最后加载的template路由
function NengLongTemplateReload(container) {
    var $container = null;
    if (typeof (container) != "undefined" && container.length > 0)
        $container = $("#" + container);
    if ($container == null || $container.length == 0) {
        NengLongTemplateLoad(G_Template_Params.options, true);
    }
    else {
        var prevOptions = $container.data("prevOptions");
        if (typeof (prevOptions) == "undefined" || prevOptions.length == 0)
            NengLongTemplateLoad(G_Template_Params.options, true);
        else
            Nenglong.Template.Load(prevOptions.pop());
    }
    //NengLongTemplateLoad({ "app": G_Template_Params.app, "cmd": G_Template_Params.cmd }, true);
}

Nenglong.Template.Reload = NengLongTemplateReload;
Nenglong.Template.Load = NengLongTemplateLoad;
Nenglong.Template.Init = NengLongTemplateInit;

//加载进入新版各功能主页
Nenglong.Template.EnterMain = function(appEntranceRouteOrFun) {
    if ($.isPlainObject(appEntranceRouteOrFun)) {
        Nenglong.Template.Load({
            app: "communicate",
            cmd: "init"
        }, true, true, false, function() { Nenglong.Template.Load(appEntranceRouteOrFun); });
    }
    else if ($.isFunction(appEntranceRouteOrFun)) {
        Nenglong.Template.Load({
            app: "communicate",
            cmd: "init"
        }, true, true, false, function() { appEntranceRouteOrFun(); });
    }
    else {
        Nenglong.UI.AlertMessage("跳转出错");
    }
};

Nenglong.Template.CheckRoute = function(app, isAlert) {
    if (typeof (Nenglong.Template.G_Route[app]) != "undefined") {
        if (typeof (isAlert) == "undefined" || isAlert) {
            Nenglong.UI.AlertMessage("Route" + app + "exist!");
        }
        return true;
    }
    return false;

};

Nenglong.Template.PrevRoute = function(contextId) {
    var prevList = $("#" + contextId).data("prevOptions");

    if (Nenglong.Template.CheckIsExistPrevRoute(contextId)) {

        if (Nenglong.Template.CheckIsExistNextRoute(contextId)) {
            var nextList = $("#" + contextId).data("nextOptions");
            var c = prevList.pop();
            c = prevList.pop();
            nextList.unshift(c);
            Nenglong.Template.Load(c);
        }
        else {
            $("#" + contextId).data("nextOptions", []);
            var nextList = $("#" + contextId).data("nextOptions");
            var c = prevList.pop();
            nextList.unshift(c);
            c = prevList.pop();
            nextList.unshift(c);
            Nenglong.Template.Load(c);
        }
    }
};
Nenglong.Template.NextRoute = function(contextId) {
    if (Nenglong.Template.CheckIsExistNextRoute(contextId)) {
        var nextList = $("#" + contextId).data("nextOptions");
        var c = nextList.shift();
        Nenglong.Template.Load(nextList[0]);
    }
};
Nenglong.Template.CheckIsExistPrevRoute = function(contextId) {
    var prevList = $("#" + contextId).data("prevOptions");
    if (typeof (prevList) == "undefined" || prevList.length <= 1) {
        return false;
    }
    return true;
};
Nenglong.Template.CheckIsExistNextRoute = function(contextId) {
    var nextList = $("#" + contextId).data("nextOptions");
    if (typeof (nextList) == "undefined" || nextList.length <= 1) {
        return false;
    }
    var prevList = $("#" + contextId).data("prevOptions");
    return Nenglong.System.ObjectEqual(prevList[prevList.length - 1], nextList[0]);
};
//---------------------------------------------------------以下是模板公有函数END------------------------------------------------------

//------------------------------------------------------------模板私有方法BEGIN--------------------------------------------------------



function getDomAppAndCmd(dom) {
    var ops = [];
    var appStr = $(dom).attr("app");
    var cmdStr = $(dom).attr("cmd");
    var apps = [], cmds = [];
    if (typeof (appStr) != "undefined") { apps = appStr.split(",") };
    if (typeof (cmdStr) != "undefined") { cmds = cmdStr.split(",") };
    for (var i = 0; i < apps.length; i++) {
        ops.push({ "app": apps[i] });
    }
    for (var i = 0; i < cmds.length; i++) {
        if (i < ops.length) {
            ops[i].cmd = cmds[i];
        } else {
            ops.push({ "cmd": cmds[i] });
        }
    }
    if (ops.length == 1) { ops = ops[0] };
    if (ops.length == 0) { ops = { "app": G_Template_Params.app, "cmd": G_Template_Params.cmd} };
    return ops;
}
//----------------------------------------------------------模板私有方法END-------------------------------------------------------------
//=============================================================模板函数END===============================================================

//=============================================================直接访问函数START===============================================================
//------------------------------------------------------------以下是页面直接访问BEGIN--------------------------------------------------
Namespace.Register("Nenglong.DirectLoad");
var NengLong_DirectLoad_Default_Options = {
    app: "",
    action: "",
    params: {},
    onload: function(opt, data) { },
    unload: function(opt) { }
};

if (typeof (G_DirectLoad_Params) == "undefined") {
    var G_DirectLoad_Params = {
        action: "",
        app: "",
        options: {},
        defaultAction: "",
        defaultApp: "",
        init: function(fun) {
            Nenglong.Template.EnterMain(fun);
        },
        onload: [],
        errorload: function() {
            Nenglong.Template.Load(G_TemplateList.navigation.init);
        }
    };
}

//直接访问
var G_DirectLoadList = {};

Nenglong.DirectLoad.getDirectLoadOptions = function(obj) {
    var app = obj.app, action = obj.action;
    var params = obj.params;
    var returnVal = null;

    if (typeof (app) != "undefined" && app != null) G_DirectLoad_Params.app = app;
    if (typeof (action) != "undefined" && action != null) G_DirectLoad_Params.action = action;
    var cApp = G_DirectLoad_Params.app, cAction = G_DirectLoad_Params.action;

    if (typeof (G_DirectLoadList[cApp]) == "undefined") {
        returnVal = null;
    }
    else {
        if (typeof (G_DirectLoadList[cApp][cAction]) == "undefined") {
            var defaultObj = null;
            $.each(G_DirectLoadList[cApp], function(key, value) { defaultObj = value; return false; });
            if (defaultObj != null)
                returnVal = defaultObj;
            else
                returnVal = null;
            //if (typeof (cmd) == "undefined") {
            //    return G_TemplateList[cApp][G_Template_Params.defaultCmd];
            //}
            //else {
            //    return G_TemplateList[G_Template_Params.defaultApp][cmd];
            //}
        }
        else {
            returnVal = G_DirectLoadList[cApp][cAction];
        }
    }

    return returnVal;
};

Nenglong.DirectLoad.Load = function(ops, deep) {
    if ($.isPlainObject(ops)) {
        ops = new Array(ops);
    };
    if ($.isArray(ops)) {
        for (var i = 0; i < ops.length; i++) {
            var options = null;
            var p = {};
            var cO = Nenglong.DirectLoad.getDirectLoadOptions(ops[i]);
            if (typeof (cO) != "undefined" && cO != null) {
                options = $.extend(deep, {}, NengLong_DirectLoad_Default_Options, cO, p, ops[i]);
                Nenglong.DirectLoad.Action(options);
            }
            else {
                alert("此操作不存在！");
                G_DirectLoad_Params.errorload();
            }
        }
    };
}

Nenglong.DirectLoad.Action = function(options) {
    if (options.onload) {
        Nenglong.Template.EnterMain(function() {
            options.onload(options.params);
        });
    }
}

//---------------------------------------------------------以上是页面直接访问END------------------------------------------------------
//=============================================================直接访问函数END===============================================================


//=============================================================验证BEGIN==================================================================
Namespace.Register("Nenglong.Com.Validate");
function NengLongValidation(fieldId) {
    if (typeof (fieldId) == "undefined") {
        return $("#form1").validationEngine("validate");
    }
    if ($("#" + fieldId + "[class*=validate]").length > 0) {
        return !$("#form1").validationEngine("validateField", "#" + fieldId + "[class*=validate]");
    }
    var re = false;
    $("#" + fieldId + " [class*=validate]").each(function() {
        re = re || $("#form1").validationEngine("validateField", this);
    });
    return !re;
}
Nenglong.Com.Validate.Validation = NengLongValidation;
//===============================================================验证END==================================================================

//=============================================================提示Tip BEGIN==============================================================
Namespace.Register("Nenglong.Com.Tip");
function NengLongTipInit() {
    $("[tooltip]").each(function() {
        var tipParams = $(this).attr("tooltip");
        if (typeof (tipParams) != "undefined") {
            tipParams = $.extend(
                {
                    fixed: false,
                    persistent: true
                },
                eval("({" + tipParams + "})")
                );
        }
        $(this).simpletip(tipParams);
        $(this).removeAttr("tooltip");
    });
}
Nenglong.Com.Tip.Init = NengLongTipInit;
G_Template_Params.onload.push(Nenglong.Com.Tip.Init);
//===============================================================提示Tip END==============================================================

//=================================================================UI BEGIN==========================================================================//
Namespace.Register("Nenglong.UI");
Namespace.Register("Nenglong.UI.TextBox");

//当输入框内容为空时，设置提示信息。
Nenglong.UI.TextBox.TextInputShowDefaultText = function(inputId, defaultText) {
    var attrName = "isempty";
    var defaultTextAttr = "defaultText";
    var $tag = Nenglong.System.GetJqObjectById(inputId);
    var text = defaultText;

    if ($tag != null && $tag.length > 0) {
        if ($tag.val().length == 0)
            $tag.val(defaultText);
        else if ($tag.val().length > 0 && (typeof (defaultText) == "undefined" || defaultText.length == 0))
            text = $tag.val();

        $tag.attr(defaultTextAttr, text);
        $tag.attr(attrName, true);

        $tag.focusin(function() {
            if ($(this).attr(attrName)) {
                $(this).val('');
            }
        }).focusout(function() {
            if ($(this).val().length == 0) {
                $(this).val($(this).attr(defaultTextAttr));
                $(this).attr(attrName, true);
            }
            else {
                $(this).removeAttr(attrName);
            }
        });
    }
};

//获取内容
Nenglong.UI.TextBox.TextInputGetText = function(inputId) {
    var $text = Nenglong.System.GetJqObjectById(inputId);
    if ($text != null && $text.length > 0 && $text.attr("isempty")) {
        return '';
    }
    else {
        return $text.val();
    }
};

//设置内容
Nenglong.UI.TextBox.TextInputSetText = function(inputId, value) {
    var $text = Nenglong.System.GetJqObjectById(inputId);
    if ($text != null && $text.length > 0) {
        if (typeof (value) == "undefined" || value.length == 0) {
            $text.val($text.attr("defaultText"));
            $text.attr("isempty", true);
        }
        else {
            $text.val(value);
            $text.removeAttr("isempty");
        }
    }
};

//设置文本框长字符数
//inputId: 文本框id，或者文本框jq对象
//maxLength：最长可输入长度
//textChangeHandle: 文本框keyup事件，事件传递的参数为文本框dom对象
//文本框长度显示地方的id
Nenglong.UI.TextBox.SetTextMaxLength = function(inputId, maxLength, textChangeHandle, textLengthDisplayContainer) {
    var $text = Nenglong.System.GetJqObjectById(inputId);
    if ($text != null && $text.length > 0) {
        if (maxLength > 0)
            $text.attr("maxLength", maxLength);
        $text.unbind("keyup.setMaxLength").bind("keyup.setMaxLength", function() {
            $sel = $(this);
            $val = $sel.val();
            maxlength = $sel.attr('maxLength');
            $length = $val.length;
            $display = Nenglong.System.GetJqObjectById(textLengthDisplayContainer);
            if ($display != null && $display.length > 0)
                $display.html($length);
            if (typeof (maxlength) != "undefined" && parseInt(maxlength) > 0 && $length > parseInt(maxlength))
                $sel.val($val.substring(0, parseInt(maxlength)));

            if (textChangeHandle) {
                textChangeHandle(this);
            }
        });
    }
};

Namespace.Register("Nenglong.UI.Select");
Nenglong.UI.Select = function(selectId) {
    var $select = Nenglong.System.GetJqObjectById(selectId);
    if ($select == null || $select.length == 0) {
        $select = $("<select></select>");
    }

    var sel = this;

    //获取下拉框jq对象
    this.GetObj = function() {
        return $select;
    };

    //获取选项数量
    this.Count = function() {
        return $select.find("option").length;
    };

    //添加选项
    //isSelect 表示是否选中新添加的项
    this.AddOption = function(value, text, isSelect) {
        if (arguments.length > 0) {
            var showtext = text;
            if (typeof (text) == "undefined")
                showtext = value;
            $select.append('<option value="' + value + '">' + showtext + '</option>');

            if (isSelect == true) {
                this.SelectedIndex(this.Count() - 1);
            }

            return true;
        }
        else
            return false;
    };

    //插入选项
    //isSelect 表示是否选中新添加的项
    this.InsertOption = function(value, text, index, isSelect) {
        if (arguments.length > 0) {
            var showtext = text;
            if (typeof (text) == "undefined")
                showtext = value;
            var showindex = index;
            if (typeof (index) == "undefined")
                showindex = 0;
            var count = this.Count();
            if (index >= count)
                showindex = count - 1;

            $select.find("option[index=" + showindex + "]").insertAfter('<option value="' + value + '">' + showtext + '</option>');

            if (isSelect == true) {
                this.SelectedIndex(index);
            }

            return true;
        }
        else
            return false;
    };

    //根据value值删除选项
    this.RemoveByValue = function(value) {
        $select.find("option[value=" + value + "]").remove();
    };

    //根据text值删除选项
    this.RemoveByText = function(text) {
        $select.find("option[text=" + text + "]").remove();
    };

    //根据index删除选项
    this.RemoveByIndex = function(index) {
        $select.find("option[index=" + index + "]").remove();
    };

    //设置change事件
    this.Change = function(fun) {
        $select.unbind("change").change(function() {
            fun($(this).val(), $select.find("option:selected").text());
        });
    };

    //设置选中index对应项
    this.SelectedIndex = function(index) {
        $select.get(0).selectedIndex = index;
        $select.change();
    };

    //设置选中值为value的项
    this.SelectedValue = function(value) {
        if (typeof (value) != "undefined" && value.length > 0) {
            $select.val(value);
            $select.change();
        } else {
            sel.SelectedIndex(0);
        }
    };

    //获取所选value值
    this.GetSelectedValue = function() {
        return $select.find("option:selected").val();
    };

    //获取所选text值
    this.GetSelectedText = function() {
        return $select.find("option:selected").text();
    };

    //获取所选index值
    this.GetSelectedIndex = function() {
        return $select.get(0).selectedIndex;
    };

    //获取value值对应text值
    this.GetTextByValue = function(value) {
        return $select.find("option[value=" + value + "]").text();
    };

    return this;
};

Namespace.Register("Nenglong.UI.Radio");
//设置radio选择项
//defaultCheckedIndex表示当radio值没有value值时，选择哪个radio，下标，从0开始
Nenglong.UI.Radio.SetChecked = function(radioName, value, defaultCheckedIndex) {
    var $radios = $('input[name=' + radioName + ']:radio');
    if ($radios.length > 0) {
        var ischecked = false;
        $radios.each(function() {
            if (this.value == value) {
                //$(this).attr("checked", true);
                this.checked = true;
                ischecked = true;
            }
            else {
                //$(this).removeAttr("checked");
                this.checked = false;
            }
        });

        if (ischecked == false) {
            var index = defaultCheckedIndex;
            if ($radios.length - 1 < defaultCheckedIndex)
                index = $radios.length - 1;

            $radios[index].checked = true;
        }
    }
};

Nenglong.UI.Radio.GetValue = function(radioName) {
    var $radios = $('input[name=' + radioName + ']:radio');
    var value = '';
    $radios.each(function() {
        if (this.checked) {
            value = this.value;
            return value;
        }
    });
    return value;
};
//设置checkbox选择项
// lrx 2012.4.11
//defaultCheckedIndex表示当checkbox值没有value值时，选择哪个checkbox，下标，从0开始
Namespace.Register("Nenglong.UI.Checkbox");
Nenglong.UI.Checkbox.GetValue = function(checkboxName) {
    var $checkbox = $('input[name=' + checkboxName + ']:checkbox');
    var value = new Array();
    $.each($checkbox, function(i, checkbox) {
        if (this.checked) {
            value.push(this.value);
        }
    });
    return value;
};


Nenglong.UI.Checkbox.SetChecked = function(checkboxName, values, defaultCheckedIndex) {
    var $checkbox = $('input[name=' + checkboxName + ']:checkbox');
    if ($checkbox.length > 0) {
        var ischecked = false;
        $checkbox.each(function() {
            if (in_array(this.value, values)) {
                this.checked = true;
                ischecked = true;
            }
            else {
                this.checked = false;
            }
        });
        if (ischecked == false) {
            var index = defaultCheckedIndex;
            if ($checkbox.length - 1 < defaultCheckedIndex)
                index = 1;
            $checkbox[index].attr("checked", true);
        }
    }

    function in_array(needle, haystack) {
        // 得到needle的类型
        var type = typeof needle;

        if (type == 'string' || type == 'number') {
            for (var i in haystack) {
                if (haystack[i] == needle) {
                    return true;
                }
            }
        }
        return false;
    }
};

//显示指定div，设置为模态窗口，居中，加遮蔽层
//addDoingEvent参数表示在添加遮蔽层后，运行addDoingEvent事件，然后再显示模态窗口
//setPositionFun参数自定义模态窗口位置，不设置此参数将默认放在窗口中间
//styleParam定义窗口样式，类型为对象，成员如下
//  style:窗口样式，
//  title: 窗口标题，
//  confirmCallback(click):确定事件，包含一个参数对象，此参数有一方法FinishClick(message)，主要用于异步处理完成后（主要是处理出错）通知窗口确定动作结果，message为窗口要显示的内容（显示错误信息）
//  cancelCallback:取消事件，
//  showLoading:点击确定后是否显示加载中图层)
Nenglong.UI.DialogShow = function(divid, addDoingEvent, setPositionFun, styleParam) {
    var $container = Nenglong.System.GetJqObjectById(divid);
    if ($container != null && $container.length > 0) {
        var $dialogWin = $container;
        var dialogId = 'dialog_' + $container.attr('id');
        if (isLoadStyle(styleParam)) {
            var title = '';
            if (typeof (styleParam.title) != 'undefined')
                title = styleParam.title;
            var showLoading = true;
            if (styleParam.showLoading == false)
                showLoading = false;
            $dialogWin = $('<table id="' + dialogId + '" class="dialogContainer" cellspacing="0" cellpadding="0"></table>');
            $dialogWin.append('<tr><th class="dialogHeader"><a href="javascript:;" class="dialogClose" ope="close"></a>' + title + '<span class="dialogMessage" ope="message"></span></th></tr>');
            $dialogWin.append('<tr><td class="dialogContent" ope="content"></td></tr>');
            $dialogWin.append('<tr><td class="dialogBottom"><a href="javascript:;" ope="confirm">确定</a></td></tr>');

            $dialogWin.find("[ope=close]").unbind("click").bind("click", function() {
                if ($.isFunction(styleParam.cancelCallback))
                    styleParam.cancelCallback();
            });
            $dialogWin.find("[ope=confirm]").unbind("click").bind("click", function() {
                var sel = $(this);
                sel.DialogWin = $dialogWin;
                sel.FinishClick = function(message) {
                    this.removeClass('clicking');
                    this.DialogWin.find("[ope=loading]").remove();
                    if (typeof (message) != "undefinded") {
                        $dialogWin.find("[ope=message]").text(message).show();
                    }
                };
                if (!sel.hasClass("clicking")) {
                    $(this).addClass("clicking");
                    var $dialogContent = $dialogWin.find("[ope=content]");
                    if (showLoading == true) {
                        var $loading = $dialogContent.find('[ope=loading]');
                        if ($loading.length == 0)
                            $loading = $('<div class="dialogLoading" ope="loading"><img/></div>').prependTo($dialogContent);

                        $loading.css({ height: $dialogContent.height(), width: $dialogContent.width(), "z-index": parseInt($dialogContent.find(":first").css("z-index")) + 1 });
                        $loading.find("img").css("top", function() {
                            return ($loading.height() - $(this).height()) / 2;
                        }).css("left", function() {
                            return ($loading.width() - $(this).width()) / 2;
                        });
                    }
                    if ($.isFunction(styleParam.confirmCallback))
                        styleParam.confirmCallback(sel);
                }
            });

            var $dialogContent = $dialogWin.find("[ope=content]");
            $dialogContent.append($container);
            $dialogWin.appendTo("body");

            $container.data("styleJq", $dialogWin);
        }
        else {
            $container.hide().appendTo("body");
        }

        $container.data("parentJq", $container.parent());
        var $shadow = $('#nenglong_shadow');
        if ($shadow.length == 0) {
            $shadow = $('<div id="nenglong_shadow" class="shadow"></div>');
            if (isIE6)
                $shadow.append('<iframe style="position:absolute;top:0;left:0;height:100%;width:100%; z-index:-1000000;filter:alpha(opacity=0);" frameborder="0"></iframe>');
        }

        //记录弹窗数量
        var referenceNum = $shadow.attr("referenceNum");
        if (typeof (referenceNum) == "undefined" || parseInt(referenceNum) == 0) {
            referenceNum = 1;

            $shadow.removeClass().addClass("shadow");
            $shadow.css({
                width: $(window).width(),
                height: $(document).height(),
                top: "0",
                left: "0",
                background: '#000000',
                "z-index": 9999
            }).appendTo("body").show();
        }
        else {
            referenceNum = parseInt(referenceNum) + 1;
        }

        $shadow.attr("referenceNum", referenceNum);

        if (addDoingEvent) {
            addDoingEvent();
        }

        if (typeof (setPositionFun) == "undefined" || !$.isFunction(setPositionFun)) {
            $dialogWin.css("position", "absolute").css("top", function() {
                return ($(window).height() - $dialogWin.height()) / 2 + $(document).scrollTop();
            }).css("left", function() {
                return ($(window).width() - $dialogWin.width()) / 2 + $(document).scrollLeft();
            });
        }
        else {
            setPositionFun($container, $dialogWin);
        }


        $dialogWin.css("z-index", 10000 + referenceNum * 1000).show();
    }

    function isLoadStyle(styleParam) {
        return typeof (styleParam) != 'undefined';
    }
};

Nenglong.UI.DialogStyle = {
    DEFAULT: 1,
    COOL: 2,
    BACKSTAGE: 3
};

Nenglong.UI.DialogHide = function(divid, isremove, forceCloseShadow) {
    var $container = Nenglong.System.GetJqObjectById(divid);

    if ($container != null && $container.length > 0) {
        var shadow = $("#nenglong_shadow");
        var referenceNum = shadow.attr("referenceNum");
        if (typeof (referenceNum) == "undefined" || parseInt(referenceNum) <= 1) {
            shadow.removeAttr("referenceNum");
            shadow.hide();
        }
        else {
            shadow.attr("referenceNum", parseInt(referenceNum) - 1);
        }

        if (forceCloseShadow != null && forceCloseShadow == true) {
            if (shadow.length > 0) {
                shadow.remove();
            }
        }

        var $dialogWin = $container.data("styleJq");
        var hasStyle = true;
        if (typeof ($dialogWin) == 'undefined') {
            $dialogWin = $container;
            hasStyle = false;
        }

        if (isremove == true) {
            $dialogWin.remove();
        }
        else {
            $container.hide();
            var parent = $container.data("parentJq");
            if (typeof (parent) != "undefined" && parent.append) {
                parent.append($container);
            }
            if (hasStyle)
                $dialogWin.remove();
        }
    }
};


//*******************************************************************************
//用于处理“点击按钮显示下拉内容，点击其他地方隐藏下拉内容”的效果
//container参数：绑定点击事件的块id或jq对象
//context参数: 下拉内容id或者jq对象
//showEvent参数：具体显示事件绑定
//hideEvent参数：具体隐藏事件绑定
//返回结果：添加了hideContext方法的按钮jq对象
//返回结果中hideContext方法作用是隐藏下拉内容，用于下拉内容内其他点击事件后隐藏下拉内容。
//参考例子：留言功能
//*********************************************************************************
Nenglong.UI.ClickShowAutoHide = function(container, contexts, showEvent, hideEvent) {
    var $container = Nenglong.System.GetJqObjectById(container);
    $container.isShow = false;
    var $contexts = [];
    var $extraContexts = [];
    if ($.isArray(contexts)) {
        for (var i = 0; i < contexts.length; i++) {
            $contexts.push(Nenglong.System.GetJqObjectById(contexts[i]));
        }
    }
    else {
        $contexts.push(Nenglong.System.GetJqObjectById(contexts));
    }
    //var $context = Nenglong.System.GetJqObjectById(contexts);
    if ($container != null && $container.length > 0) {
        $container.unbind("click.ClickShowAutoHideEvent").bind("click.ClickShowAutoHideEvent", function() {
            if ((typeof ($(this).attr("showContext")) == "undefined" || $(this).attr("showContext") == false) && (clickTarget($container) && !clickTarget($contexts) && !clickTarget($extraContexts))) {
                $container.showContext();
            }
            else {
                if (clickTarget($container) && !clickTarget($contexts))
                    $container.hideContext();
            }
        });

        $container.hideContext = function() {
            if ($container.isShow) {
                var hide = true;
                if (hideEvent) {
                    hide = hideEvent($container[0]);
                }
                if (hide != false) {
                    $(document).unbind("mousedown.ClickShowAutoHideEvent_" + $container.attr("id"));
                    $container.removeAttr("showContext");
                    $container.isShow = false;
                }
            }
        };

        $container.showContext = function() {
            var show = true;
            if (showEvent)
                show = showEvent.apply(this.caller, arguments);
            if (show != false) {
                $(document).unbind("mousedown.ClickShowAutoHideEvent_" + $container.attr("id")).bind("mousedown.ClickShowAutoHideEvent_" + $container.attr("id"), function() {
                    //var ev = window.event || e;
                    //var target = ev.target;

                    var datepicker = $.datepicker == undefined ? null : ($.datepicker.dpDiv.parent().length > 0 ? $.datepicker.dpDiv : null);

                    if (!clickTarget($container) && !clickTarget($contexts) && !clickTarget($extraContexts) && (datepicker == null || !clickTarget(datepicker))) {
                        $container.hideContext();
                    }
                });
                $(this).attr("showContext", true);
                $container.isShow = true;
            }
        };

        $container.destroy = function() {
            $container.unbind("click.ClickShowAutoHideEvent");
            $(document).unbind("mousedown.ClickShowAutoHideEvent_" + $container.attr("id"));
            $container.isShow = false;
        };

        $container.addExtraContext = function(context) {
            $extraContexts.push(Nenglong.System.GetJqObjectById(context));
        };

        $container.clearExtraContext = function() {
            $extraContexts = [];
        }
    }

    //点击在里面返回true
    function clickTarget($target) {
        var ev = window.event || e;
        if (typeof (ev) != "undefined" && typeof (ev.clientX) != "undefined") {
            var clickX = ev.clientX + $(document).scrollLeft();
            var clickY = ev.clientY + $(document).scrollTop();

            if ($.isArray($target)) {
                for (var i = 0; i < $target.length; i++) {
                    if (clickPositionIsIn($target[i], clickX, clickY))
                        return true;
                }
                return false;
            } else {
                if ($target != null && $target.length > 0) {
                    return clickPositionIsIn($target, clickX, clickY);
                } else
                    return false;
            }
        }
        else
            return false;
    }

    function clickPositionIsIn($target, x, y) {
        return $target.css("display") != 'none' && x >= $target.offset().left && x <= ($target.offset().left + $target.width()) && y >= $target.offset().top && y <= ($target.offset().top + $target.height());
    }

    return $container;
};

//显示提醒信息
//message提示信息
//continueCallback调用的function方法
Nenglong.UI.AlertMessage = function(message, continueCallback) {
    alert(message);
    if (continueCallback)
        continueCallback();
};

//弹出确认窗口
Nenglong.UI.ConfirmMessage = function(message, yesCallback, noCallback) {
    if (confirm(message)) {
        if (yesCallback)
            yesCallback();
    }
    else {
        if (noCallback)
            noCallback();
    }
};

Namespace.Register("Nenglong.UI.PageControl");
Nenglong.UI.PageControl = function(param) {
    this.setting = {
        objlist: [],
        keyName: "key",
        defaultValue: '',
        nextBtn: null,
        nextBtnClick: function(clickResult) {
        },
        prevBtn: null,
        prevBtnClick: function(clickResult) {
        },
        pageSize: 0,
        objClick: function(clickResult) {
        },
        pageChange: function(pageIndex, pageTotal) {
        }
    };

    this.isReClick = false;

    $.extend(true, this.setting, param);

    var sel = this;
    var settingParam = this.setting;

    var selectKey = '';
    var selectValue = '';
    var currentPage = 1;
    var isReflash = false;
    var currentObj = null;
    var total = settingParam.objlist.length;
    var page = computePageNum(settingParam.pageSize, total);

    //绑定向下事件
    if (settingParam.nextBtn instanceof jQuery) {
        settingParam.nextBtn.unbind("click").bind("click", function() {
            if (currentPage < page) {
                currentPage++;
                isReflash = true;
                showList();
                var clickResult = {
                    obj: $(this),
                    pageIndex: currentPage,
                    pageTotal: page
                };
                if ($.isFunction(settingParam.nextBtnClick)) {
                    settingParam.nextBtnClick(clickResult);
                }
                if ($.isFunction(settingParam.pageChange)) {
                    settingParam.pageChange(currentPage, page);
                }
            }
        });
    }

    //绑定向上事件
    if (settingParam.prevBtn instanceof jQuery) {
        settingParam.prevBtn.unbind("click").bind("click", function() {
            if (currentPage > 1) {
                currentPage--;
                isReflash = true;
                showList();
                var clickResult = {
                    obj: $(this),
                    pageIndex: currentPage,
                    pageTotal: page
                };
                if ($.isFunction(settingParam.prevBtnClick)) {
                    settingParam.prevBtnClick(clickResult);
                }
                if ($.isFunction(settingParam.pageChange)) {
                    settingParam.pageChange(currentPage, page);
                }
            }
        });
    }

    //各项点击事件
    settingParam.objlist.each(function(index, obj) {
        $(obj).unbind("click").bind("click", function() {
            sel.SelectObj(getObjValue($(this)));
        });
    });

    //选取项
    this.SelectObj = function(value) {
        var obj = getObj(value);
        var index = getIndex(value);
        currentObj = obj;
        selectKey = index;
        selectValue = value;
        changeCurrentPage(computePageNum(settingParam.pageSize, total, index));

        showList();

        var clickResult = {
            pageControl: sel,
            objlist: settingParam.objlist,
            "index": index,
            value: getObjValue(currentObj),
            obj: currentObj,
            page: currentPage
        };

        if ($.isFunction(settingParam.objClick)) {
            settingParam.objClick(clickResult);
        }

        if ($.isFunction(settingParam.pageChange)) {
            settingParam.pageChange(currentPage, page);
        }
    };

    this.Next = function() {
        var nextObj = currentObj.next();
        if (nextObj.length > 0) {
            sel.SelectObj(getObjValue(nextObj));
            return true;
        }
        return false;
    };

    this.Prev = function() {
        var prevObj = currentObj.prev();
        if (prevObj.length > 0) {
            sel.SelectObj(getObjValue(prevObj));
            return true;
        }
        return false;
    };

    this.ReClick = function() {
        sel.isReClick = true;
        currentObj.click();
        sel.isReClick = false;
    };

    this.GetSelectedDom = function() {
        return currentObj[0];
    };

    this.GetSelectedJq = function() {
        return currentObj;
    };

    isReflash = true;
    sel.SelectObj(settingParam.defaultValue);

    //显示列表

    function showList() {
        if (isReflash == true) {
            var minIndex = (currentPage - 1) * settingParam.pageSize;
            var maxIndex = currentPage * settingParam.pageSize - 1;
            if (maxIndex >= total)
                maxIndex = total - 1;

            settingParam.objlist.hide();

            for (var i = minIndex; i <= maxIndex; i++) {
                getObjByIndex(i).show();
            }

            isReflash = false;
        }
    }

    //根据值获取项

    function getObj(value) {
        var obj = settingParam.objlist.filter("[" + settingParam.keyName + "=" + value + "]");
        if (obj.length > 0)
            return obj;
        else
            return settingParam.objlist.first();
    }

    //根据值获取index

    function getIndex(value) {
        var index = settingParam.objlist.filter("[" + settingParam.keyName + "=" + value + "]").index();
        if (index == -1)
            index = 0;
        return index;
    }

    function getObjValue(obj) {
        return obj.attr(settingParam.keyName);
    }

    function getObjByIndex(index) {
        if (index < settingParam.objlist.length)
            return settingParam.objlist.eq(index);
        else
            return settingParam.objlist.first();
    }

    function computePageNum(pageSize, total, index) {
        var page = 1;
        var position = 1;

        if (typeof (index) == "undefined" || index + 1 > total) {
            position = total;
        } else if (index < 0) {
            position = 1;
        } else {
            position = index + 1;
        }

        page = parseInt(position / pageSize);
        if (position > page * pageSize)
            page++;

        return page;
    }

    function changeCurrentPage(newPage) {
        if (currentPage != newPage) {
            isReflash = true;
        }

        currentPage = newPage;
    }

    return this;
};
//=================================================================UI END==========================================================================//

//=================================================================AJAX共用方法 BEGIN==========================================================================//
Namespace.Register("Nenglong.Ajax");
Nenglong.Ajax.PostData = function(url, ops, successCallback, errorCallback, async, isStandardFormat) {
    Nenglong.Ajax.AjaxData(url, ops, successCallback, errorCallback, "post", async, isStandardFormat);
};

Nenglong.Ajax.GetData = function(url, ops, successCallback, errorCallback, async, isStandardFormat) {
    Nenglong.Ajax.AjaxData(url, ops, successCallback, errorCallback, "get", async, isStandardFormat);
};

//返回类型固定格式：
//{ 
//    Result: 获取数据结果，true表示成功，false表示出错；没有此值，也表示错误，也会调用errorCallback
//    Data: 数据，成功时返回数据json对象，失败时返回错误信息
//}
Nenglong.Ajax.AjaxData = function(url, ops, successCallback, errorCallback, ajaxType, async, isStandardFormat) {
    var _isStandardFormat = true;
    if (isStandardFormat == false)
        _isStandardFormat = false;

    var ay = true;
    if (async == false)
        ay = false;

    var type = ajaxType;
    if (!type || type.length == 0)
        type = "get";

    var dataUrl = url;
    if (url.indexOf("http://") >= 0 && url.indexOf(window.location.host) < 0) {
        if (type == "get")
            dataUrl = Nenglong.System.App.GetProxyUrl(url, ops);
        else
            dataUrl = Nenglong.System.App.GetProxyUrl(url);
    }

    $.ajax({
        "type": type,
        url: dataUrl,
        data: ops,
        dataType: "json",
        async: ay,
        success: function(data) {
            if (_isStandardFormat == true) {
                if (data && typeof (data.Result) != "undefined") {
                    if (data.Result == true) {
                        if (successCallback)
                            successCallback(data.Data);
                    } else {
                        if (errorCallback)
                            errorCallback(data.Data);
                    }
                } else {
                    if (errorCallback) errorCallback("失败");
                }
            } else {
                if (successCallback)
                    successCallback(data);
            }
        }
    }).error(function() { if (errorCallback) errorCallback('连接失败'); });
};
//=================================================================AJAX共用方法 END============================================================================//


//=====================================================交流互动的所有全局变量BEGIN==========================================
// var G_TemplateList = {};
var G_CommunicateInitOnload = [];
//=====================================================交流互动的所有全局变量END============================================


//=======================================================脚本加载后初始化BEGIN===============================================
if (typeof (G_OnLoadParams) != "undefined") {
    G_OnLoadParams.onload.push(function() {
        NengLongTemplateInit();
        $(document).unbind("keydown.pageKeyDown").bind("keydown.pageKeyDown", NengLongPageOnKeyDown);
        //$("#loading div").animate({ width: "34px" }).text("34%");
    });
}
//=======================================================脚本加载后初始化END=================================================

//=======================================================分页BEGIN=============================================================
function NenglongPageInit(options, data) {
    var $divs = $("#" + options.content + " [page=true]");
    $divs.each(function() {
        var pageCount = parseInt($(this).attr("pageCount")), pageIndex = parseInt($(this).attr("pageIndex")), pageTotal = parseInt($(this).attr("pageTotal")), app = $(this).attr("app"), cmd = $(this).attr("cmd");
        var nextBtn = $(this).find("a.next");
        var prevBtn = $(this).find("a.prve");
        var clickBtn = $(this).find("[click=true]");
        var pageClass = $(this).attr("pageClass");
        var currentPageClass = $(this).attr("currentPageClass");

        if (typeof (app) == "undefined") app = "";
        if (typeof (cmd) == "undefined") cmd = "";
        if (pageIndex <= 1) {
            pageIndex = 1; prevBtn.attr("href", "javascript:");
        }
        else {
            prevBtn.attr("href", "javascript:NenglongPageClick(" + (pageIndex - 1) + ",'" + app + "','" + cmd + "');");
        }
        if (pageIndex >= pageTotal) {
            pageIndex = pageTotal; nextBtn.attr("href", "javascript:");
        }
        else {
            nextBtn.attr("href", "javascript:NenglongPageClick(" + (pageIndex + 1) + ",'" + app + "','" + cmd + "');");
        }
        var pageList = [];
        if (pageCount >= pageTotal) {
            for (var i = 1; i <= pageTotal; i++) {
                pageList.push(i);
            }
        }
        else if (pageIndex < (pageCount / 2 + 2)) {
            for (var i = 1; i < pageCount; i++) {
                pageList.push(i);
            }
            pageList.push(0);
            pageList.push(pageTotal);
        }
        else if (pageIndex > (pageTotal - pageCount / 2 - 2)) {
            pageList.push(1);
            pageList.push(-1);
            var begin = pageTotal - pageCount + 1;
            for (var i = (begin == 2 ? 3 : begin); i <= pageTotal; i++) {
                pageList.push(i);
            }
        }
        else {
            pageList.push(1);
            pageList.push(-1);
            for (var i = pageIndex - pageCount / 2 + 1; i <= pageIndex + pageCount / 2; i++) {
                pageList.push(i);
            }
            pageList.push(0);
            pageList.push(pageTotal);
        }

        for (var i = 0; i < pageList.length; i++) {
            var index = pageList[i];
            var url = "";
            if (index == -1) {
                index = "...";
                url = "javascript:NenglongPageClick(" + (pageIndex - pageCount / 2) + ",'" + app + "','" + cmd + "');";
            }
            else if (index == 0) {
                index = "...";
                url = "javascript:NenglongPageClick(" + (pageIndex + pageCount / 2 + 1) + ",'" + app + "','" + cmd + "');";
            }
            else {
                url = "javascript:NenglongPageClick(" + index + ",'" + app + "','" + cmd + "');";
            }
            if (index == pageIndex) {
                $("<a class=\"" + (currentPageClass == undefined || currentPageClass.length == 0 ? "selected" : currentPageClass) + "\" href='javascript:'>" + index + "<em></em></a>").insertBefore(nextBtn);
            } else {
                $("<a href=\"" + url + "\"" + (pageClass == undefined || pageClass.length == 0 ? "" : (" class=\"" + pageClass + "\"")) + ">" + index + "<em></em></a>").insertBefore(nextBtn);
            }
        }

        $(this).attr("page", "false");
        clickBtn.click(function() {
            NenglongPageClick($(this).prev().val(), app, cmd);
            return false;
        }).prev().val(pageIndex);

    });

}
function NenglongPageClick(pageIndex, app, cmd) {
    if (app.length == 0) app = null;
    if (cmd.length == 0) cmd = null;
    NengLongTemplateLoad({ "app": app, "cmd": cmd, "params": { "pageIndex": pageIndex} }, true, true, true);
}
function NengLongPageOnKeyDown(e) {
    var $obj = $("[page][onkey=true]");
    if ($obj.length > 0) {
        var pageIndex = parseInt($obj.attr("pageIndex")), pageTotal = parseInt($obj.attr("pageTotal")), app = $obj.attr("app"), cmd = $obj.attr("cmd");
        if (e.keyCode == 37 && pageIndex > 1) {
            NenglongPageClick(--pageIndex, app, cmd);
        }
        if (e.keyCode == 39 && pageIndex < pageTotal) {
            NenglongPageClick(++pageIndex, app, cmd);
        }

    }

}
G_Template_Params.onload.push(NenglongPageInit);
//=========================================================分页END==========================================================

//=========================================================图片处理BEGIN==========================================================
Namespace.Register("Nenglong.Image");
//图片等比例自动缩放函数
//参数(图片,允许的宽度,允许的高度,是否固定尺寸)
Nenglong.Image.DrawImage = function(ImgD, iwidth, iheight, ops, successChangeEvent) {
    var settings = {
        isFixed: true,
        isAnimated: false
    };

    $.extend(settings, ops);

    if (successChangeEvent) {
        successChangeEvent();
    }

    if (arguments.length >= 2) {
        var image = new Image();
        image.src = $(ImgD).attr("src");

        if (iwidth > 0 && iheight > 0) { //固定最大宽、高度
            var newWidth = ImgD.width;
            var newHeight = ImgD.height;

            if (typeof (settings.isFixed) != "undefined" && settings.isFixed == false && image.width < iwidth && image.height < iheight) {
                newWidth = image.width;
                newHeight = image.height;
            }
            else {
                if (image.width > 0 && image.height > 0) {
                    if (image.width / image.height >= iwidth / iheight) {
                        newWidth = iwidth;
                        newHeight = (image.height * iwidth) / image.width;
                    } else {
                        newWidth = (image.width * iheight) / image.height;
                        newHeight = iheight;
                    }
                }
            }
            //setCenter(ImgD, iwidth, iheight);
            var $imgd = $(ImgD);
            $imgd.parent().css({
                "width": iwidth,
                "height": iheight
            });
            if (settings.isAnimated) {
                $(ImgD).animate({
                    top: 0,
                    left: 0,
                    width: newWidth,
                    height: newHeight,
                    "margin-top": (iheight - newHeight) / 2,
                    "margin-left": (iwidth - newWidth) / 2
                }, 500);
            }
            else {
                $(ImgD).css({
                    top: 0,
                    left: 0,
                    width: newWidth,
                    height: newHeight,
                    "margin-top": (iheight - newHeight) / 2,
                    "margin-left": (iwidth - newWidth) / 2
                });
            }
        }
        else if (iwidth <= 0 && iheight > 0) {      //固定高度
            ImgD.width = (image.width * iheight) / image.height;
            ImgD.height = iheight;
        }
        else if (iwidth > 0 && (typeof (iheight) == "undefined" || iheight <= 0)) {     //固定宽度
            ImgD.width = iwidth;
            ImgD.height = (image.height * iwidth) / image.width;
        }
        else {
            ImgD.width = iwidth;
            ImgD.height = iheight;
        }
    }

    function resetSize(imgDom, imgObj, resetWidth, resetHeight) {
        if (imgObj.width > 0 && imgObj.height > 0) {
            if (imgObj.width / imgObj.height >= resetWidth / resetHeight) {
                $(imgDom).animate({
                    "width": resetWidth,
                    "height": (imgObj.height * resetWidth) / imgObj.width
                }, 500);
            } else {
                $(imgDom).animate({
                    "width": (imgObj.width * resetHeight) / imgObj.height,
                    "height": resetHeight
                }, 500);
            }
        }
    }

    function setCenter(imgDom, resetWidth, resetHeight) {
        $(imgDom).queue(function() {
            $(this).parent().css({
                "width": resetWidth,
                "height": resetHeight
            });
            $(this).animate({
                "margin-top": (resetHeight - $(imgDom).height()) / 2,
                "margin-left": (resetWidth - $(imgDom).width()) / 2
            }, 500);
            $(this).dequeue();
        });
    }
};

Nenglong.Image.Fillling = function(ImgD, iwidth, iheight, successChangeEvent) {
    var image = new Image();
    image.src = $(ImgD).attr("src");
    var newWidth, newHeight;
    if (image.width <= iwidth && image.height <= iheight) {
        newHeight = iheight;
        newWidth = iwidth;
    }
    else {
        if (image.width / image.height >= iwidth / iheight) {
            newHeight = iheight;
            newWidth = iwidth * image.width / image.height;
        } else {
            newWidth = iwidth;
            newHeight = iheight * image.height / image.width;
        }
    }

    if (successChangeEvent) {
        successChangeEvent();
    }

    $(ImgD).parent().css({
        "overflow": "hidden",
        "width": iwidth,
        "height": iheight
    });
    $(ImgD).attr("width", newWidth);
    $(ImgD).attr("height", newHeight);
    $(ImgD).css({
        "margin-top": (iheight - newHeight) / 2,
        "margin-left": (iwidth - newWidth) / 2,
        "display": "block"
    });
};

//*******************************************************************************
//用于“幻灯片的相片放大缩小”的效果
//enlargeContainer参数：绑定放大点击事件的块id或jq对象
//shrinkContainer参数：绑定缩小点击事件的块id或jq对象
//Img参数: 显示位置的图片id或者jq对象
//multiple参数：放大或缩小倍数
//maxClickNum参数：最多可放大或缩小点击数
//注意：暂时不能与图片旋转同时使用
//*********************************************************************************
Nenglong.Image.EnlargeAndShrink = function(enlargeContainer, shrinkContainer, Img, multiple, maxClickNum) {
    var $enlargeContainer = Nenglong.System.GetJqObjectById(enlargeContainer);
    var $shrinkContainer = Nenglong.System.GetJqObjectById(shrinkContainer);
    var $img = Nenglong.System.GetJqObjectById(Img);
    var multipleclickNum = 0;
    if ($enlargeContainer != null && $enlargeContainer.length > 0) {
        $enlargeContainer.unbind("click").bind("click", function() {
            if (multipleclickNum < maxClickNum) {
                if (multiple < 1)
                    multiple = 1 / multiple;
                var formerWidth = $img.width();
                var formerHeight = $img.height();
                var centerTop = $img.offset().top + $img.height() / 2;
                var centerLeft = $img.offset().left + $img.width() / 2;
                $img.css({
                    width: formerWidth * multiple,
                    height: formerHeight * multiple
                }).offset({
                    top: centerTop - formerHeight * multiple / 2,
                    left: centerLeft - formerWidth * multiple / 2
                });
                multipleclickNum++;
            }
        });
    }
    if ($shrinkContainer != null && $shrinkContainer.length > 0) {
        $shrinkContainer.unbind("click").bind("click", function() {
            if (multipleclickNum > -maxClickNum) {
                if (multiple > 1)
                    multiple = 1 / multiple;
                var formerWidth = $img.width();
                var formerHeight = $img.height();
                var centerTop = $img.offset().top + $img.height() / 2;
                var centerLeft = $img.offset().left + $img.width() / 2;
                $img.css({
                    width: formerWidth * multiple,
                    height: formerHeight * multiple
                }).offset({
                    top: centerTop - formerHeight * multiple / 2,
                    left: centerLeft - formerWidth * multiple / 2
                });
                multipleclickNum--;
            }
        });
    }
};
//=========================================================图片处理END==========================================================

function NengLongSetCommunicateHeight() {
    $("#sub_left").css("height", "");
    $("#sidebar").css("height", "");
    $("#sub_right").css("height", "");
    if ($("#sub_left").height() < $("#sub_right").height()) {
        $("#sidebar").height($("#sub_right").height() - 108);
    }
    else {

        $("#sub_right").height($("#sub_left").height());
    }
    //alert($("#sub_right").height());
}


//��ʾ������Ϣ
//message��ʾ��Ϣ
//continueCallback���õ�function����
function AlertMessage(message, continueCallback) {
    Nenglong.UI.AlertMessage(message, continueCallback);
}

//����ȷ�ϴ���
function ConfirmMessage(message, yesCallback, noCallback) {
    Nenglong.UI.ConfirmMessage(message, yesCallback, noCallback);
}

//ð������
var Nenglong_Bubbling = {
    bubObj: undefined,
    t: undefined,
    showItem: function(obj) {
        if (this.bubObj == undefined) this.bubObjInit();

        var $obj = $(obj);
        if ($obj.length <= 0) return;

        this.bubObj.find(string.Format("li[key={0}]", $obj.attr("key"))).remove();
        this.bubObj.find("ul").append($obj);
        this.show();
    },
    hide: function() {
        if (this.bubObj != undefined) {
            this.bubObj.fadeOut("slow");
        } else {
            $("div.wenbox p").length == 0 ? $("div.wenbox").fadeOut(200) : null;
        }
    },
    show: function() {
        this.bubObj.fadeIn(500);
    },
    bubObjInit: function() {
        this.bubObj = $(".bubbling");
        this.bubObj.find("li").die("click").live("click", function() {
            $(this).remove();
            if (Nenglong_Bubbling.bubObj.find("li").length <= 0) {
                Nenglong_Bubbling.hide();
            }
        });
    },
    Init: function() {
        //<li><a href="#">�鿴</a><span>2011-09-30 12:35:22</span><strong>��ʱͨѶ��<em>12</em>������Ϣ</strong></li>
        Nenglong_Bubbling_Instant();
    },
    showBubble: function(obj) {
        if (obj != undefined && obj.length > 0) {
            if ($("div.wenbox").css("display") == "block") {
                $("div.wencon").css("display", "block");
                $(obj).appendTo("div.wencon");
                return;
            }
            $("div.wenbox").fadeIn(50);
            $(obj).appendTo("div.wencon");
            //debugger;
            $("a.wendown").toggle(
				function() {
				    $("div.wencon").slideUp(300, function() {
				        $("a.wendown").css({ background: "url(" + NENGLONG_CMP_URL_BASE + "Skin/Template/Default/images/wenup.gif) no-repeat center center", "margin-left": "170px" });
				        $("div.wenbottom").css("display", "none")
				    })
				}, function() {
				    $("div.wencon").slideDown(300, function() {
				        $("a.wendown").css({ background: "url(" + NENGLONG_CMP_URL_BASE + "Skin/Template/Default/images/wendown.gif) no-repeat center center", "margin-left": "170px" });
				        $("div.wenbottom").css("display", "block")
				    })
				})
				$("div.wentop a.wencannel").click(function() {
				    $("div.wenbox").fadeOut(200);
				})
        }
    }
};
//Nenglong_Bubbling.Init();

var NengLong_LoadFlash = {
    params: { contentId: "",
        height: 100,
        width: 100,
        swfScr: "",
        ops: {}
    }
    ,
    load: function() {
        var content = $("#" + this.params.contentId);
        if (content.length > 0) {
            if (content.flash != null) {
                content.html("");
                content.flash({
                    src: this.params.swfScr,
                    width: this.params.width,
                    height: this.params.height,
                    wmode: "transparent",
                    flashvars: this.params.ops,
                    allowscriptaccess: this.params.allowScriptAccess,
                    allowFullScreen: this.params.allowFullScreen
                }, {
                    version: 10
                }).show();
            }
            else {
                alert("�����jquery.flash.js�ļ�");
            }
        }
    }
};

Nenglong.System.LoadFlash = function(params) {
    NengLong_LoadFlash.params = {
        contentId: "",
        height: 100,
        width: 100,
        swfScr: "",
        ops: {}
    };
    $.extend(NengLong_LoadFlash.params, params, true);
    NengLong_LoadFlash.load();
};



//*********************************************************************************
//脚本加载
//*********************************************************************************


//*********************************** 脚本加载End *********************************