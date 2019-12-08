(async function () {

    // 修改跳转过来  
    let id = location.search.slice(1).split('&')[0].split('=')[1] || '';

    function search() {
        let categoryTitle = location.search.split('&')[1].split('=')[1] || '';
        if (id) {
            $.ajax({
                url: '/posts/' + id,
                type: 'get',
                success: function (resp) {
                    console.log(resp);
                    resp.date = resp.createAt.split('T')[0]
                    resp.categoryTitle = categoryTitle
                    $('#modify').html(template('modifyTpl', resp))
                    // 查询所有分类
                    $.ajax({
                        url: '/categories',
                        type: 'get',
                        success: function (response) {
                            $('#category').html(template('addTpl', {
                                response,
                                categoryTitle
                            }))
                        }
                    })
                }
            })
        }
    }
    //文章添加提交  //修改
    function subPosts(jEle, url, type,href) {
        $('#modify').on('submit', jEle,function (e) {
            console.log(2);
            e.preventDefault();
            console.log(2);
            let data = serializeObj(this)
            console.log(data, 2);
            $.ajax({
                url,
                type,
                data,
                success: function (resp) {
                    console.log(resp,1);
                    location.href =href

                },
                error: function (err) {

                    console.log(err);
                }
            })
        })
    }
    if (location.search) {
        await search()
        //修改
        await subPosts('#modifyPosts', '/posts/' + id, 'put','posts.html')
    } else {
        //添加提交
        await subPosts('#addPosts', '/posts', 'post','post-add.html')
    }

    //分类 
    await  $.ajax({
        url: '/categories',
        type: 'get',
        success: function (response) {
            $('#category').html(template('addTpl', {
                response
            }))
        }
    })

    //图像上传
    await  $('#feature').on('change', function () {
        let formData = new FormData();
        formData.append('feature', this.files[0])
        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function (resp) {
                $('#thumbnail').val(resp[0].feature)
                console.log(resp, 1);
                ($('#feature').val(), 2, $('#feature').html());
            },
            error: function (err) {
                console.log(err);
            }
        })
    })











}())