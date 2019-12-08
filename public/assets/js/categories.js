(function () {
    //列表刷新
    function local() {
        $.ajax({
            url: '/categories',
            type: 'get',
            success: function (response) {
                $('#list').html(template('categoriesTpl', {
                    response
                }))
            }
        })
    }
    local()

    //表单提交
    $('#form').on('submit', function (e) {
        let data = serializeObj(this)
        // e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/categories',
            data,
            success: () => {
                local()
            },
            error: () => {
                alert('添加失败');
            }
        })
    })

    //全选反选
    $('#list').on('change', 'input', function () {
        if ($('#list input:checked').size() == $('#list input')) {
            $('#allChecked').prop('checked', true)
        } else {
            $('#allChecked').prop('checked', false)
        }
        if ($('#list input:checked').size() > 0) {
            $('#disabled').removeClass('disabled')
        } else {
            $('#disabled').addClass('disabled')
        }
    })
    //批量删除按钮显示
    $('#allChecked').on('change', function () {
        $('#list input').prop('checked', $(this).prop('checked'))
        if ($('#list input:checked').size() > 0) {
            $('#disabled').removeClass('disabled')
        } else {
            $('#disabled').addClass('disabled')
        }
    })
    //批量删除
    $('#disabled').on('click', function () {
        let lists = $('#list').find('input:checked').toArray()
        let id  = lists.reduce((acc, cur, index, arr) => {
            if (arr.length == 1) {
                return $(cur).data('id')
            }
            if (index == 0 && arr.length > 1) {
                return acc + $(cur).data('id') + '-'
            }
            if (index >= 1) {
                return acc + '-' + $(cur).data('id')
            }
        }, '')
        $.ajax({
            url:'/categories/'+id,
            type:'delete',
            success:function(){
                local()
            }
        })
        
    })
    //单个删除
    $('#list').on('click','#delete-one',function(){
        $.ajax({
            url:'/categories/'+$(this).data('id'),
            type:'delete',
            success:function(){
                local()
            }
        })
    })

    //编辑
    $('#list').on('click','#modify',function(){
        $.ajax({
            url:'/categories/'+$(this).data('id'),
            type:'GET',
            success:function(resp){
              $('#modifyBox').html(template('modifyTpl',resp))  
            }
        })
    })
    // 修改提交
    $('#modifyBox').on('submit','#modifyForm',function(e){
        e.preventDefault()
        let data=serializeObj(this)
        $.ajax({
            url:'/categories/'+data._id,
            type:'put',
            data,
            success:function(resp){
              $('#modifyBox').html(template('modifyTpl',resp)) 
            local() 
            }
        })
    })







}())