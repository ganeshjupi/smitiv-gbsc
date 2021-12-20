var siteUrl = 'http://ec2-54-251-142-179.ap-southeast-1.compute.amazonaws.com:9002/';
var authorization_key = "O5mGIP3VNia0JvPH2IBiwA==";

$(window).on("load",function(){
    // $(".mscroll-y").mCustomScrollbar({
    //     axis:"y",
    //     scrollEasing:"linear",
    //     scrollInertia: 600,
    //     autoHideScrollbar: "true",
    //     autoExpandScrollbar: "true"
    // });

    // $(".item-listwrap").mCustomScrollbar({
    //     scrollEasing:"linear",
    //     scrollInertia: 600,
    //     scrollbarPosition: "outside"
    // });

});

$(document).ready(function(){
    
    $(".has-sub").click(function(){
        $(this).parent().addClass("active").next(".sub-menu").slideToggle();
    });
    // $(".search-btn").click(function(){
    //     $(this).parent().toggleClass("active");
    // });
    // $(".hdr-search .close-icon").click(function(){
    //     $(".hdr-search").removeClass("active");
    // });

    $(".select-picker").selectpicker();

    // $(".label-enclose .label").click(function(){
    //     $(this).toggleClass("active");
    // });
    $(".nav-brand-res").click(function(){
        $(".left-navbar").addClass("active");
    });
    $(".menu-close").click(function(){
        $(".left-navbar").removeClass("active");
    });
    
});

function replyLink(parent_comment_id){
    var logged_user_id = $("#logged_user_id").val();
    var file_id = $("#file_id").val();
    var list_id = $("#list_id").val();

    $("#reply_cnt"+parent_comment_id).toggleClass("in");
    getSubComments(parent_comment_id,logged_user_id,file_id,list_id);
}

function updateCommentApi(comment_id, comment_text, user_id, file_id, parent_comment_id){
    fetch(siteUrl+'update_comment', {
        method: 'POST',
        body: JSON.stringify({
            comment_id: comment_id,
            comment_text: comment_text,
            user_id: user_id
        }),
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": authorization_key
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.status === 1) {
            //callback(null, response);
            jQuery(".resp_msg").html(response.message);

            jQuery(".resp_msg").fadeIn(2000);
            setTimeout(function(){ jQuery(".resp_msg").fadeOut(2000); },8000);

            jQuery(".comment-txt").removeClass('hide');
            jQuery(".update_cmnt").addClass('hide');

            this.getCommments(this.props.match.params.file_id);
        } else{
            //callback(null, response);
            jQuery(".resp_msg").html(response.message);

            jQuery(".resp_msg").fadeIn(2000);
            setTimeout(function(){ jQuery(".resp_msg").fadeOut(2000); },8000);
        }
    });
}

function getSubComments(parent_comment_id,logged_user_id,file_id,list_id){
    fetch(siteUrl+'get_sub_comments', {
        method: 'POST',
        body: JSON.stringify({
            comment_id: parent_comment_id
        }),
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": authorization_key
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        //alert(response.status);
        if (response.status === 1) {
            var comments_length = response.details.length;
            var comment_list = [];
            if(comments_length > 0){
                for(var i=0; i<comments_length; i++){
                    if(response.details[i].user_image){
                        var user_img = response.details[i].user_image
                    } else{
                        var user_img = "../../images/user-img-1.png";
                    }

                    var comment_id = response.details[i].comment_id;
                    //comment_list.push('<div class="reply_cmment_row" id="'+response.details[i].comment_id+'">gfgf</div>');
                    if(response.details[i].sub_comment_count > 0){
                        var replyTxt = "Replies ("+response.details[i].sub_comment_count+")";
                    } else{
                        var replyTxt = "Reply";
                    }

                    var replyFrm = '<div class="reply_cnt collapse" id=reply_cnt'+comment_id+'><form action="javascript:;" class="col-md-12 col-xs-12 pad-no reply-form reply-frm"><input type="hidden" class="parent_comment_id" name="parent_comment_id" value="'+comment_id+'" /><textarea class="col-md-12 col-xs-12 reply_txt_cls" name="reply_txt" placeholder="Reply..." required></textarea><div class="pull-right"><a href="javascript:;" class=" btn btn-empty"><img src="../../images/attach-icon.svg" alt="icon"/></a><button type="submit" class="btn btn-green replySubmit"><img src="../../images/reply-icon.svg" alt="icon"/>Reply</button></div></form><div class="subCmnt"></div></div>';

                    comment_list.push('<div class="reply_cmment_row col-md-12 col-xs-12 pad-no" id="'+response.details[i].comment_id+'"><div class="reply-cont col-md-12 col-xs-12"><div class="col-md-12 col-xs-12 pad-no"><div class="avatar-img"><img class="img-responsive" src="'+user_img+'" alt="AvatarIMG"/></div><div class="reply-user"><span class="col-md-12 col-xs-12 pad-no user-name">'+response.details[i].comment_user+'</span><span class="col-md-12 col-xs-12 pad-no date">'+response.details[i].ago_value+'</span></div></div><div class="dropdown menu-item prnt_cmnt sub_cmnt"><a href="javascript" class="dropdown-toggle" data-toggle="dropdown"><img src="../../images/menu-dot.svg" alt="icon"/></a><ul class="dropdown-menu"><li><a href="javascript:;" data-comment-id="'+response.details[i].comment_id+'" class="edit_cmnt">Edit</a></li><li><a>Delete</a></li></ul></div><p class="col-md-12 col-xs-12 pad-no comment-txt">'+response.details[i].comment_text+'</p><form action="javascript:;" class="col-md-12 col-xs-12 pad-no reply-form update_cmnt hide"><input type="hidden" name="comment_id" class="comment_id" value="'+response.details[i].comment_id+'" /><input type="hidden" name="parent_comment_id" class="parent_comment_id" value="'+response.details[i].comment_id+'" /><textarea class="col-md-12 col-xs-12 cmnt_txt" id="cmmnt_txt_id'+response.details[i].comment_id+'" name="comment_text" placeholder="" required></textarea><div class="pull-right"><button type="button" class="btn btn-default cancel_button">Cancel</button><button type="submit" class="btn btn-green updateCmnt">Update</button></div></form><div class="attachment-item col-md-12 col-xs-12 pad-no"></div></div><div class="col-md-12 col-xs-12 pad-no"><button class="btn btn-lightgray">Resolved</button><a href="javascript:;" class="reply-link" data-comment-id="'+response.details[i].comment_id+'" onclick="return replyLink('+response.details[i].comment_id+');">'+replyTxt+'</a></div>'+replyFrm+'</div>');
                }

                $("#reply_cnt"+parent_comment_id).children('.subCmnt').html(comment_list);

                $(".edit_cmnt").click(function(){
                    var text_cmnt = $(this).closest(".prnt_cmnt").next(".comment-txt").text();
                    var this_cmnt_id = $(this).attr('data-comment-id');
                    $(this).closest(".prnt_cmnt").next(".comment-txt").addClass('hide');
                    $(this).closest(".prnt_cmnt").next(".comment-txt").next(".reply-form").removeClass('hide');
                    $("#cmmnt_txt_id"+this_cmnt_id).val(text_cmnt);
                });
        
                $(".cancel_button").click(function(){
                    $(this).closest(".reply-form").addClass('hide');
                    $(this).closest(".reply-form").prev(".comment-txt").removeClass('hide');
                });

                $(".updateCmnt").click(function(e){
                    e.preventDefault();                            
                    var parent_comment_id = $(this).closest(".reply-form").children(".parent_comment_id").val();
                    var comment_text = $(this).closest(".pull-right").prev(".cmnt_txt").val();
                    var user_id = logged_user_id;
                    var file_id = file_id;

                    updateCommentApi(comment_id, comment_text, user_id, file_id, parent_comment_id);
                    $(this).closest(".reply-form").prev(".comment-txt").text(comment_text);
                    
                });

                $(".replySubmit").click(function(e){
                    e.preventDefault();

                    var pstCommnt = $(this).closest(".pull-right").prev(".reply_txt_cls").val();
                    var user_id = logged_user_id;
                    var list_id = list_id;
                    var file_id = file_id;
                    var parent_comment_id = $(this).closest(".reply-form").children(".parent_comment_id").val();
                    var attachments = '';
                    
                    THIS.addSubComment(pstCommnt,user_id,list_id,file_id,attachments,parent_comment_id);
                });
            }

            //callback(null, data);

        } else{
            //callback(null, data);
        }
    });
}