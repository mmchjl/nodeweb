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

        function initToolbarBootstrapBindings() {
            var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                    'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                    'Times New Roman', 'Verdana'],
                fontTarget = $('[title=Font]').siblings('.dropdown-menu');
            $.each(fonts, function (idx, fontName) {
                fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
            });
            $('a[title]').tooltip({container:'body'});
            $('.dropdown-menu input').click(function() {return false;})
                .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
                .keydown('esc', function () {this.value='';$(this).change();});

            $('[data-role=magic-overlay]').each(function () {
                var overlay = $(this), target = $(overlay.data('target'));
                overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
            });
            if ("onwebkitspeechchange"  in document.createElement("input")) {
                var editorOffset = $('#editor').offset();
                //$('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
            } else {
                $('#voiceBtn').hide();
            }
        };
        function showErrorAlert (reason, detail) {
            var msg='';
            if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
            else {
                console.log("error uploading file", reason, detail);
            }
            $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+
                '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
        };
        initToolbarBootstrapBindings();
        $("#editor").wysiwyg();
        window.prettyPrint && prettyPrint();

        $("#btn_addtag").unbind("click").bind("click",function(){
            var txt = $("#txt_tags").val();
            if(txt=="") return;
            $("#txt_tags").val("");
            $("#btn_addtag").after("<div class='badge'>"+txt+"</div>");
        });

        $("#btn_article_submit").unbind("click").bind("click",function(){
            var title = $("#txt_title").val();
            var tags =[];
            $(".badge").each(function(index,obj){tags.push($(obj).html());});
            var content = $("#editor").html().HtmlEncode();
            article = {
                title_str:title,
                tag:tags,
                content_str:content,
                updateTime_date:(new Date()).getTime()
            };
            console.log(JSON.stringify(article));
            $.post("article/add",{data:JSON.stringify(article)},function(data){
                console.dir(data);
            });
        });
    }
};

