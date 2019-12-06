(function () {
    //分类 
    $.ajax({
        url: '/categories',
        type:'get',
        success:function(response){
           $('#category').html( template('addTpl',{response}))
        }
    })

    //图像上传
    $('#feature').on('change',function(){
        let formData= new FormData();
        formData.append('feature',this.files[0])
        $.ajax({
            url:'/upload',
            type:'post',
            data:formData,
            processData: false,
            contentType: false,
            success:function(resp){
                console.log(resp);
                
                // console.log('ok');
                $('#thumbnail').val(resp[0].feature)
                
            },
            error:function(err){
                console.log(err);
            }
        })
    })

    //文章添加提交
    $('#addPosts').on('submit',function(e){
        e.preventDefault();
        let data = serializeObj(this)
        console.log(data);
        
        $.ajax({
            url:'/posts',
            type:'post',
            data,
            success:function(resp){     
                location.href ='/admin/posts.html'
            },
            error:function(err){
                console.log(err);
            }
        })



    })






}())