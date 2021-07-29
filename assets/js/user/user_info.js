$(function() {

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度必须在1~6字符之间";
            }
        }
    })
    initUserinfo();

    function initUserinfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg("获取用户信息失败！");
                }
                form.val("formUserinfo", res.data);

            }
        })
    }
    $("#btnreset").on("click", function(e) {
        e.preventDefault();
        initUserinfo();
    })

    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg("更新用户信息失败！");
                }
                layer.msg("信息修改成功！")
                window.parent.getUserInfo();
            }
        })
    })
})