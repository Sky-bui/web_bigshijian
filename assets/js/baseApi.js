// 在jQuery文档里有ajaxPrefilter()函数
// 在每次调用$get() ,$post() ,&ajax()的时候，都会先调用ajaxPrefilter()这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})