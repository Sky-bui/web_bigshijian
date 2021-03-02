$(function() {
    // 一。点击去注册，隐藏登录的form表单，显示注册的form表单
    $('.quzhuce').on('click', function() {
        $('.Denglu').hide();
        $('.zhuce').show();
    })

    // 点击去登录，隐藏注册form表单，显示登录的form表单
    $('.qudenglu').on('click', function() {
        $('.zhuce').hide();
        $('.Denglu').show();
    })

    // 二。注册form表单规则验证
    // 1.从layui中获取form对象
    var form = layui.form
    var layer = layui.layer //这是一个layui 弹出层
        // 2.通过form.verify()函数自定义效验规则
    form.verify({
        //3.自定义一个名为pwd的规则给input密码框的lay-verify类名加上
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,并且没有空格'],
        // 4.对比俩次密码是否一致，把rsewd的自定义验证规则给确认密码的lay-verify类名加上
        rsewd: function(value) { //形参value就是用户输入的值，rsewd给了确认框，就是确认密码框的值
            // 5.获得到密码框的值
            var pass = $('.zhu-form [name=password]').val()
                // 6.让密码框的值和确认密码框的对比是否一样
            if (pass !== value) {
                return '俩次密码不一样'
            }
        }
    })

    // 三。监听注册表单提交事件
    // 1.给注册form表单一个提交的事件
    $('.zhu-form').on('submit', function(e) {
            // 2.阻止表单默认行为
            e.preventDefault()
                // 3.发起ajax的post请求提交数据
            $.ajax({
                // 4.发起post请求方式
                type: "post",
                // 5.填写要提交到的url地址
                url: "http://api-breakingnews-web.itheima.net/api/reguser",
                // 6.要提交上去的值
                data: {
                    username: $('.zhu-form [name="username"]').val(),
                    password: $('.zhu-form [name="password"]').val()
                },
                // 7.判断提交是否成功
                success: function(res) {
                    if (res.status != 0) {
                        // 8.如果不成功就打印一下
                        return layer.msg(res.message)
                    }
                    layer.msg('注册成功，请登录！')
                        // 9.当注册成功后自动触发一下点击 去登录 的点击行为，直接跳到登录表单
                    $('.qudenglu').click()
                }
            });
        })
        // 四。监听登录表单提交事件
    $('#deng-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "http://api-breakingnews-web.itheima.net/api/login",
            // 快速获取form表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('登录失败！') // layer.msg是layer弹出层的msg内置方法
                }
                layer.msg('登陆成功，请登录！')
                    // 成功后将得到的 token的字符串存到 localStorage(本地存储)中去，
                localStorage.setItem('token', res.token)
                    // 跳转后台页面到index.html页面去
                location.href = '/index.html'
            }
        });
    })



















    // 注册form表单验证
    // $('.zhuce').on('submit', function(e) {
    //     e.preventDefault()
    //     if ($('#password').length > 6 || $('#password').length < 12 || $('#password').val() === $('#qrpassword').val()) {
    //         $.ajax({
    //             type: "POST",
    //             dataType: "dataType",
    //             url: "http://ajax.frontend.itheima.net/api/reguser",
    //             data: {
    //                 username: $('.zhuce[name.username]').val(),
    //                 password: $('.zhuce[name.password]').val()
    //             },
    //             success: function(res) {
    //                 if (res.status != 0) {
    //                     return alert('失败')
    //                 }
    //             }
    //         });
    //     }

    // })















})