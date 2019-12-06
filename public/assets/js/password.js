(function () {

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

    
    //表单提交
    $('#modify-password').on('submit', function (e) {
        e.preventDefault()
        let data = serializeObj(this)
        console.log(data);
        $.ajax({
            url: '/users/password',
            type: 'put',
            data,
            success: function (response) {
                console.log(response);
                location.href = '/admin/users.html'
            }
        })
    })


})