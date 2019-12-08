//todo 评论
(function () {
    //列表
    let size, page;
    async function lists(page, callback) {
        await $.ajax({
            url: '/comments',
            type: 'get',
            data: {
                page
            },
            success: function (resp) {
                document.querySelector('#list').innerHTML = template('listsTpl', resp)
                //分页
                size = Math.ceil(resp.total / resp.size)
                document.querySelector('#page').innerHTML = template('pageTpl', {
                    pages: size
                })
            }
        })
        callback && callback()
    }
    lists(undefined, function () {
        $('#page [page]').eq(0).parent().addClass('active')
        page = 1
    });

    //页码点击事件 
    $('#page').on('click', '[page]', function (e) {
        page = $(this).attr('page') - '0'
        lists(
            page,
            function () {
                $('#page [page]').eq(page - 1).parent().addClass('active')
            })
    })
    //下页点击事件
    $('#page').on('click', '[data-id=next]', function (e) {
        //获得当前页码
        page = $('#page .active').children().attr('page') - 0
        //下一页
        page++
        if (page > size) {
            page--
        }
        lists(
            page,
            function () {
                //对应 page 变样式
                $('#page [page]').eq(page - 1).parent().addClass('active')
            })
    })
    //上页点击事件
    $('#page').on('click', '[data-id=pre]', function (e) {
        alert(1);
        //获得当前页码
        let fg = $('#page .active').children().attr('page') - 0
        if (!isNaN(fg)) page = fg
        //上一页
        page--
        if (page == 0) {
            page++
        }
        lists(
            page,
            function () {
                //对应 page 变样式
                $('#page [page]').eq(page - 1).parent().addClass('active')
            })
    })



    //删除事件 
    $('#list').on('click', '[data-delete]', function () {
        let that = this
        let id = $(this).attr('data-delete')
        $.ajax({
            url: '/comments/' + id,
            type: 'delete',
            success: function () {
                alert(page)
                lists(page, function () {
                    $(that).parent().parent().remove()
                    if (!$('#list').html().trim()) {
                        $('#page [data-id=pre]').click()
                    }
                    $('#page [page]').eq(page - 1).parent().addClass('active')
                })

            }
        })
    })
    //审核事件 
    $('#list').on('click', '[data-status]', function (e) {
        let id = $(this).attr('data-success')

        let state;
        $(this).html() == '批准' ? state = 1 : state = 0
        $(this).html() == '批准' ? $(this).html('驳回') : $(this).html('批准')
        $.ajax({
                url: '/comments/' + id,
                type: 'put',
                data: {
                    state,
                },
                success: function (resp) {
                    lists(page, function () {
                        $('#page [page]').eq(page-1).parent().addClass('active')

                    });

                }

        })
    

})
}())