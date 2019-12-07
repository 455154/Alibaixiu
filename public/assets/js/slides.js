(function(){
    //列表刷新
    function list(){
        $.ajax({
            url:'/slides',
            get:'get',
            success:function(resp){
                console.log(resp);
                $('#jpg').html(template('jpgTpl',{resp}))
            }
        })
    }
    list()
    //删除
    $('#jpg').on('click','[data-delete]',function(){
        let id=$(this).data('delete')
        $.ajax({
            url:'/slides/'+id,
            type:'delete',
            success:function(){
                list()
            },
            error:function(err){
                console.log('删除错误');
            }
        })
    })
//提交图片  
$('#image').on('change',function(){
    let formData=new FormData()
    formData.append('img',this.files[0])
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (resp) {
            $('#img').val(resp[0].img)
        },
        error: function (err) {
            console.log(err,'上传图片错误');
        }
    })
})
$('#imgForm').on('submit',function(){
    let data = serializeObj(this)
    $.ajax({
        type:'post',
        url:'/slides',
        data,
        success:function(resp){
            list()
            $('#imgForm input').val('')
        },
        error:function(err){
            console.log(err,'表单提交错误');
        }
    });
    return false
})





}())