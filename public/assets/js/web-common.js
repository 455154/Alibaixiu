(function(){
    
    //获取分类  左侧 nav
    $.ajax({
        url:'/categories',
        type:'get',
        success:function(resp){
            console.log(resp);
            console.log($('#nav'));
           $('#nav').html(template('classifyTpl',{resp})) 
        },
        error:function(err){
            console.log(err,'获取分类错误');
        }
    })
    //







}())