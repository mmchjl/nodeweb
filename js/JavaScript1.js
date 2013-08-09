﻿Namespace.Register("init");
init={
    init:function(){
        window.onresize = function(){
            var temp = $("div.left_div");
            if(temp.length>=0){
                if(window.innerWidth<=1000){
                    $("div.left_div").hide();
                    $(".user_login").hide();
                }else if(window.innerWidth>1000&&temp.css("display")=="none"){
                    $("div.left_div").show();
                    $(".user_login").show();
                }
            }
        };
        $("a.about").unbind("click").bind("click",function(){
            NengLongTemplateLoad({
                app:"index",
                cmd:"about"
            });
        })
        $("a.home").unbind("click").bind("click",function(){
            NengLongTemplateLoad({
                app:"index",
                cmd:"home"
            });
        })
        $("a.head").unbind("click").bind("click",function(){
            var type = this.getAttribute("aType");
            NengLongTemplateLoad({
                app:"index",
                cmd:"main",
                params:{
                    "list.type_int":type,
                    he:"hesef"+type
                }
            });
        });

        $("#loginPanel").on("hidden",function(){
            $("#loginUserName").val("");
            $("#loginPassword").val("");
        })
        $("#btn_login").unbind("click").bind("click",function(){
            var acc = $("#loginUserName").val();
            var pwd = $("#loginPassword").val();
            Nenglong.Ajax.PostData("./authorization/login",{account:acc,password:pwd},function(data){
                $("#loginPanel").modal("hide");
                console.dir(data);
            })
        });
    }
};

Namespace.Register("blogType");
blogType = {
    count:0,
    init:function(){
        var container = $("#blog_container");

        $(".closed").unbind("click").bind("click",function(){
            $("#myModal input:text").val("");
            $("#modalUpdate input:text").val("");
        });

        $("a.backRoute",container).unbind("click").bind("click",function(){
              NengLongTemplateLoad({
                  app:"index",
                  cmd:"init"
              });
        });

        $("#btn_save").unbind("click").bind("click",function(){
            var name = $("#inputEmail").val();
            $.post("./blog/add",{name_str:name,adder_str:"黄俊乐",addDate_date:(new Date()).getTime()},function(result){
                var _result = JSON.parse(result);
                if(_result.result){
                    NengLongTemplateReload();
                }
            });
        });

        $(".delete",container).unbind("click").bind("click",function(){
              var id = $(this).parent("td").parent("tr").attr("tid");
                $.get("./blog/remove",{_id:id},function(result){
                    var _result = JSON.parse(result);
                    if(_result.result){
                        NengLongTemplateReload();
                    }
                });
        });

        $(".update",container).unbind("click").bind("click",function(){
            var id = $(this).parent("td").parent("tr").attr("tid");
            var name =  $("tr[tid="+id+"]").find("td:eq(1)").text();
            initUpdateModal(id,name);

        });

        function initUpdateModal(id,name){
            $("#modalUpdate input:text").val(name);
            $("#btn_update").click(function(){
                var _name =$("#modalUpdate input:text").val();
                if(_name&&_name.length>0){
                    $.get("./blog/update",{_id:id,name_str:_name},function(result){
                        var _result = JSON.parse(result);
                        if(_result.result){
                            NengLongTemplateReload();
                        }else{

                        }
                    });
                }else{
                    alert("不能为空");
                }
            });
        }
    }
};

Namespace.Register("circle");
circle = {
    init:function(){
            editor1 = KindEditor.create('#content', {
                cssPath : './css/prettify.css',
                uploadJson : './file/uploadimg',
                fileManagerJson : './asp.net/file_manager_json.ashx',
                allowFileManager : true,
                afterCreate : function() {
                    var self = this;
                }
            });
            $("#btn_badge").unbind("click").bind("click",function(){
                var _new = $("#txt_badge").val().Trim();
                if(_new){
                   $("#badges").append("<span class='badge badge-info mbadge'>"+_new+"</span>");
                }
                $("span.mbadge").unbind("dblclick").bind("dblclick",function(){
                    $(this).remove();
                })
            });
            $("#btn_submit").unbind("click").bind("click",function(){
                var title = $("#txt_title").val();
                var type=$("#sel_type").val();
                var badges = [];
                $("#badges span").each(function(index,obj){
                    badges.push($(obj).text());
                });
                var content = editor1.html();
                var synopsis = $("#txt_synopsis").val();
                if(title==""){
                    $("#txt_title").addClass("error");
                    return;
                }
                var obj={
                    title_str:title,
                    tags:badges,
                    content_str:content,
                    synopsis_str:synopsis,
                    type_int:type,
                    updateTime_date:(new Date()).getTime()
                };
                Nenglong.Ajax.PostData("./article/add",{data:JSON.stringify(obj)},function(data){
                    console.dir(data);
                },function(){
                    console.log("请求失败");
                })
            });
    }
};

Namespace.Register("detail");
detail = {
    init:function(){
        $("div.article").each(function(index,obj){
            var t = $(obj).text().Trim();
            $(obj).html(t);
        });
        (function(){
            var temp = $.cookies.get("thumb");
            if(temp){
                $(".commentshow").each(function(index,obj){
                    var commentId = $(obj).attr("commentId");
                    if(commentId&&temp.indexOf(commentId)!=-1){
                       $("i[articleid]",obj).css("color","gray")
                    }
                });
            }
        })();
        $("#detail_submit").unbind("click").bind("click",function(){
            var id = $("div.comment").attr("aid");
            var nickName = $("#detail_nickName").val();
            var mail = $("#detail_email").val();
            var commentData = $("#detail_comment").val();
            var obj = {
                id:id,
                commentId: Guid("N"),
                nickname_str:nickName,
                mail_str:mail,
                comment_str:commentData,
                addDate_date:(new Date()).getTime()
            };
            Nenglong.Ajax.PostData("./article/comment",{data:JSON.stringify(obj)},function(){
                NengLongTemplateReload();
            },function(){
                alert("fail to comment")
            });
            console.dir(obj);
        })
        $("div.commentshow").hover(function(){
            $("a.reply",this).css("display","inline");
        },function(){
            $("a.reply",this).css("display","none");
        });
        $(".author a.reply").unbind("click").bind("click",function(){
            var cid = $(this).parent("div").parent("div").attr("commentId");
            if(cid){
                var $t = $("div[refCommentId="+cid+"]");
                if($t.css("display")=="block"){
                    $t.fadeOut(300);
                }else{
                    $t.fadeIn(300);
                }
            }
        });
        $(".thumb").unbind("click").bind("click",function(){
            $this = $(this);
            var commentId = $this.parent().parent().attr("commentId");
            if(!commentId) return;
            var aid= $this.attr("articleId"),
                type = $this.hasClass("up")?1:-1;
            if($.cookies.get("thumb")&&$.cookies.get("thumb").indexOf(commentId)!=-1) return;
            Nenglong.Ajax.GetData("./article/thumb",{
                articleId_str:aid,
                commentId_str:commentId,
                type_int:type
            },function(){
                var t = $this.text();
                t = parseInt(t);
                t++;
                $this.text(t);
                $("div[commentId="+commentId+"] i[articleid]").css("color","gray");
                var t =  $.cookies.get("thumb");
                if(!t){t=commentId.toString();
                }else{
                    t+="_"+commentId.toString();
                }
                $.cookies.set("thumb",t);
            },function(){
                alert("服务器错误");
            })
        })
    }
}

Namespace.Register("range");
range={
    init:function(){
        $("a.rangeList").unbind("click").bind("click",function(){
            var id = this.getAttribute("aid");
            if(id){
                NengLongTemplateLoad({
                    app:"index",
                    cmd:"detail",
                    params:{
                        id:id
                    }
                });
            }
        });
    }
};

Namespace.Register("list");
list={
    init:function(){
        $(".list_title").unbind("click").bind("click",function(){
            var id = this.getAttribute("aid");
            if(id){
                NengLongTemplateLoad({
                    app:"index",
                    cmd:"detail",
                    params:{
                        id:id
                    }
                });
            }
        });
        (function(){
            $(".list_check").hide()
        })()
        $(".articleItem").hover(function(){
            $(".list_check",this).show();
        },function(){
            $(".list_check",this).hide();
        })
    }
};

Namespace.Register("tags");
tags={
    init:function(){}
};

Namespace.Register("home");
home={
    init:function(){

    }
};

