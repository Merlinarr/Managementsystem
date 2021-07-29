$(function() {
    getUserInfo();
    $("#btnLogout").on("click", function() {
        layui.layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem("token");
            location.href = "login.html";

            layui.layer.close(index);
        });
    })
})

// get user infomation

function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        method: "GET",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg("获取用户信息失败！");
            }
            renderAvatar(res.data);
        },
        // complete: function(response) {
        //     if (response.responseJSON.status == 1 && response.responseJSON.message == "身份认证失败！") {
        //         localStorage.removeItem("token");
        //         location.href = 'login.html';
        //     }
        // }

    })
}

// render foto
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html(`欢迎&nbsp;&nbsp;${name}`);

    if (user.user_pic != null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}