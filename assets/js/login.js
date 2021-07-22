$(function() {

    // click to register account
    $("#link_reg").on("click", function() {
        $(".login_box").hide();
        $(".reg_box").show();

    })

    // click login_box
    $("#link_login").on("click", function() {
        $(".reg_box").hide();
        $(".login_box").show();

    })

    // Get form object from layui

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repwd: function(value) {
            var pwd = $('.reg_box [name=password]').val();
            console.log(pwd, " : ", value);
            if (pwd != value) {
                return "密码不一致";

            }
        }
    })

    // listening form register event
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();
        let data = { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() };
        $.post("/api/reguser", data,
            function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg("注册成功！请登录！");
                $("#link_login").click();
            })
    })

    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // get form quickly
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('登录失败!');
                }
                layer.msg("登陆成功！");
                // token storage in localstotage
                localStorage.setItem("token", res.token);

                location.href = 'index.html';
            }
        })
    })
});