var shadow = null;

function showPanel(url, width, height, isbackground) {
    if (!url) {
        url = "all - Node.js 中文手册.htm";
    }
    if (!width) {
        width = 500;
    }
    if (!height) {
        height = 500;
    }
    var aa = "    <div  class='easyui-draggable' data-options=\"handle:'#title'\" style='width: " + (width - 1) + "px; height: " + (height - 1) + "px; background: #fafafa; border: 1px solid #ccc; margin-top: 10px'><div id='title' style='padding: 5px; background: #ccc; color: #fff'>Title<span style='display:inline-block;float:right;margin-right:5px;cursor:pointer' onclick='removeShadow()'>关闭</span></div><iframe src='" + url + "' style='width:" + width + "px;height:" + (height - 28) + "px;border:none' ></iframe></div>";
    var div = document.createElement("div");
    div.id = "divid";
    div.style.zIndex = 999;
    div.style.position = "absolute";
    div.innerHTML = aa;
    if (isbackground) {
        addShadow(div);
    }
    document.body.appendChild(div);
    $(div).draggable();
}

function addShadow(d, h) {
    shadow = document.createElement("div");
    shadow.style.position = "fixed";
    shadow.style.top = "0px";
    shadow.style.left = "0px";
    shadow.style.width = "100%";
    shadow.style.height = "100%";
    shadow.style.backgroundColor = "black";
    shadow.style.opacity = "0.5";
    document.body.appendChild(shadow);
}
function removeShadow() {
    try {
        if (shadow != null) {
            document.body.removeChild(shadow);
        }
        document.body.removeChild(document.getElementById("divid"));
    } catch (e) {

    }
}

$(function () {
    //showPanel();
})
