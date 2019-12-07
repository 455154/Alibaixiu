(async function () {

    async function get() {
        await $.ajax({
            url: '/settings',
            type: 'get',
            success: function (resp) {
                $('#form').html(template('contentTpl',resp))
            },
            error: function (err) {
                console.log(err,'获取数据错误');
            }
        })
    }
    //获取
    get()

    await $('#form').on('change','#logo', function () {
        let formData = new FormData();
        formData.append('img', this.files[0])
        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function (resp) {
                $('#site_logo').val(resp[0].img)
                $('#firstImg').prop('src',resp[0].img)
            },
            error: function (err) {
                console.log(err,'图片上传错误');
            }
        })
    })
    await $('#form').on('submit', function () {
        let data = serializeObj(this)
        data.review ? data.review=true : data.review=false;
        data.comment ? data.comment=true : data.comment=false
        $.ajax({
            url: '/settings',
            type: 'post',
            data,
            success: function () {
                get()
            },
            error:function(err){
                console.log(err,'表单提交错误');
            }
        })
        return false;
    })
}())