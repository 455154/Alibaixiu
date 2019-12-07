~(function(){
    //转换
    // function serializeObj(form) {
    //     let formDate = $(form).serializeArray()
    //     // console.log(formDate);
    //     let User = {};
    //     $.each(formDate, (index, item) => {
    //         User[item.name] = item.value
    //     })
    //     return User
    // }

    //模板拼接 users 局部刷新
    let local = function () {
        $.ajax({
            type: 'get',
            url: '/users',
            success: (resp) => {
                $('#users').html(template('temTpl', {
                    resp
                }))
            },
            error:function(err){
                console.log(err,'列表刷新错误');   
            }
        })
    }
    local()

    // 头像上传
    $('#operate').on('change', '#avatar', function () {
        let formData = new FormData();
        formData.append('avatar', this.files[0])
        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: (resp) => {
                $('#imgInput').attr('src', resp[0].avatar)
                $('#hiddenInput').val(resp[0].avatar)
            },
            error: (err) => {
                console.log(err,'上传头像失败')
            }
        })
    })

    //表单提交
    $('#operate').on('submit', '#form-add', function (e) {
        e.preventDefault()
        let data = serializeObj(this)
        $.ajax({
            type: 'post',
            url: '/users',
            data,
            success: () => {
                local()
                $('#operate input').val('')
            },
            error: () => {
                console.log('添加失败',err);
            }
        })
    })

    //修改 
    $("#users").on('click', '#modifyBtn', function () {
        let id = $(this).data('id')
        // console.log(id);
        $.ajax({
            url: '/users/' + id,
            type: 'get',
            success: (response) => {
                $('#operate').html(template('modifyTpl', response))
            }
        })
    })

    //修改提交
    $('#operate').on('submit', '#form-modify', function (e) {
        let data = serializeObj(this)
        $.ajax({
            url: '/users/' + data._id,
            type: 'put',
            data,
            success: function (response) {
                local()
            },
            error:function(err){
                console.log(err,'修改提交错误');
                
            }
        })
    })

    //删除功能  
    $("#users").on('click', '#delete', function () {
        let id = $(this).data('id')
        console.log(id);
        $.ajax({
            url: '/users/' + id,
            type: 'delete',
            success: (response) => {
                local()
            },
            error: function (err) {
                console.log(err);
            }
        })
    })

    //全选反选功能 
    $('#users').on('click', 'input', function () {
        if ($('#users input:checked').size() == $('#users input').size()) {
            $('#allBox').prop('checked', true)
        } else {
            $('#allBox').prop('checked', false)
        }
        if ($('#users input:checked').size() > 0) {
            $('#deleteMony').removeClass('disabled')
        } else {
            $('#deleteMony').addClass('disabled')
        }
    });
    $('#allBox').on('click', function () {
        if ($(this).prop('checked')) {
            $('#deleteMony').removeClass('disabled')
        } else {
            $('#deleteMony').addClass('disabled')
        }
        $('#users input').prop('checked', $(this).prop('checked'))
    })

    // 批量删除
    $('#deleteMony').on('click', function () {
        let all = $('#users').find('input:checked').toArray()
        let id = all.reduce((acc, cur, index) => {
            if (index == 0) {
                return acc + $(cur).data('id')
            }
            return acc + '-' + $(cur).data('id')
        }, '');
        $.ajax({
            url: '/users/' + id,
            type: 'delete',
            success: function (e) {
                $('#deleteMony').removeClass('disabled')
                local()
            }
        })
    })

    
}())