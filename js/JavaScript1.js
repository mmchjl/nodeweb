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
                var content = editor1.html().HtmlEncode();
                if(title==""){
                    $("#txt_title").addClass("error")
                    return;
                }
                var obj={
                    title_str:title,
                    tags:badges,
                    content_str:content,
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
            var t = $(obj).text();
            $(obj).html(t);
        })
    }
}
