$.ajaxPrefilter(function(options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;

    // setting headers
    if (options.url.indexOf("/my") != -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }

    options.complete = function(response) {
        if (response.responseJSON.status == 1 && response.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem("token");
            location.href = 'login.html';
        }
    }

})