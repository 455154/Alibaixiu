(function () {
    let size, page, total;
    let lists = {}
    //添加默认 page
    lists.page = 1


    //请求列表   刷新 
    // 数据刷新 整体/单个 单个传 id; category所属分类 state 状态 page 页码
    function local(data, id) {
        // 列表刷新 
        let url = id ? '/posts/category/' + id : '/posts'
        $.ajax({
            type: 'get',
            url,
            data,
            success: function (resp) {
                console.log(resp);
                size = resp.size;
                page = resp.page;
                total = resp.total;
                let math = Math.ceil(total / size)
                console.log(math);
                //渲染 分页
                $('#page').html(template('pageTpl', {
                    math
                }))
                //渲染 列表
                $('#postsList').html(template('postsTpl', resp))
            }
        })
        // }
    }
    local()

    //筛选提交
        $('#classification').on('submit', function (e) {
            e.preventDefault()
            lists = serializeObj(this)
            if(!lists.state){
                delete lists.state
            }
            lists.page = page || 1
            local(lists)
        })

    //下一页点击
    $('#page').on('click', '#next', function () {
        lists.page += 1
        if (lists.page >= $(this).attr('length')) lists.page = $(this).attr('length') - '0'
        local(lists)
    })

    //上一页点击
    $('#page').on('click', '#previous', function () {
        lists.page -= 1
        if (lists.page <= 1) lists.page = 1
        local(lists)
    })

    //页码点击
    $('#page').on('click', '[page]', function () {
        lists.page = $(this).attr('page') - 0
        local(lists)
    })

    //获取分类
    $.ajax({
        url: '/categories',
        type: 'get',
        success: function (response) {
            $('#category').html(template('classify', {
                response
            }))
        }
    })
})()