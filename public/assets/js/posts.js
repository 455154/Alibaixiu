(function () {
    let size, page, total;
    let lists = {}
    //添加默认 page
    lists.page = 1
    page = lists.page


    //请求列表   刷新 
    // 数据刷新 整体/单个 单个传 id; category所属分类 state 状态 page 页码
    function local(data, id, callback) {
        // 列表刷新 
        let url = id ? '/posts/category/' + id : '/posts'
        $.ajax({
            type: 'get',
            url,
            data,
            success: function (resp) {
                size = resp.size;
                page = resp.page;
                total = resp.total;
                let math = Math.ceil(total / size)
                //渲染 分页
                $('#page').html(template('pageTpl', {
                    math
                }))
                //渲染 列表
                $('#postsList').html(template('postsTpl', resp))
                callback && callback()
            }
        })
        // }
    }
    local(undefined, undefined, function () {
        $('#page [page]').eq(lists.page - 1).parent().addClass('active')
    })

    //筛选提交
    $('#classification').on('submit', function (e) {
        e.preventDefault()
        lists = serializeObj(this)
        if (!lists.state) {
            delete lists.state
        }
        if (!lists.category) {
            delete lists.category
        }
        console.log(lists);

        lists.page = 1
        page = lists.page

        local(lists, undefined, function () {
            $('#page [page]').eq(lists.page - 1).parent().addClass('active')
        })
    })

    //下一页点击
    $('#page').on('click', '#next', function () {
        lists.page += 1
        page = lists.page

        if (lists.page >= $(this).attr('length')) {
            lists.page = $(this).attr('length') - '0';
            page = lists.page
        }
        local(lists, undefined, function () {
            $('#page [page]').eq(lists.page - 1).parent().addClass('active')

        })
    })

    //上一页点击
    $('#page').on('click', '#previous', function () {
        lists.page -= 1
        page = lists.page

        if (lists.page <= 1) {
            lists.page = 1
            page = lists.page
        }
        local(lists, undefined, function () {
            $('#page [page]').eq(lists.page - 1).parent().addClass('active')
        })
    })

    //页码点击
    $('#page').on('click', '[page]', async function () {
        lists.page = $(this).attr('page') - 0
        page = lists.page
        local(lists, undefined, function () {
            $('#page [page]').eq(lists.page - 1).parent().addClass('active')
        })
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

    //删除
    $('#postsList').on('click', '[data-delete]', function (e) {
        let that = $(this)
        let id = $(this).data('delete')
        $.ajax({
            url: '/posts/' + id,
            type: 'delete',
            success: function () {
                that.parent().parent().remove()
                if (!$('#postsList').html().trim()) {
                    lists.page -= 1
                    page = lists.page
                }
                local({
                    page
                }, undefined, function () {
                    $('#page [page]').eq(page - 1).parent().addClass('active')
                })
            }

        })
    })







})()