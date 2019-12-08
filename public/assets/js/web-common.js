(function () {

    //获取分类  左侧 nav
    $.ajax({
        url: '/categories',
        type: 'get',
        success: function (resp) {
            console.log(resp);
            console.log($('#nav'));
            $('#nav').html(template('classifyTpl', {
                resp
            }))
            let html =
                `  {{each resp}}
<li data-id="{{$value._id}}"><a href="/list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
{{/each}}`

            $('.topnav ul').html(template.render(html, {
                resp
            }))
        },
        
        error: function (err) {
            console.log(err, '获取分类错误');
        }
    })
    //logo
    $.ajax({
        url: '/settings',
        type: 'get',
        success: function (resp) {
            let src = resp.logo
            $('#logo').prop('src', src)

        }
    })
    $('#nav').on('click', 'li', function () {
        let id = $(this).data('id')
        $.ajax({
            url: '/posts/category/' + id,
            type: 'get',
            success: function (resp) {
                console.log(resp);
            },
            error: function (err) {
                console.log(err, '获取分类列表失败');
            }
        })
    })
    ~async function(){
        // 评论
    let html =`
    {{each records}}
    <li>
    <a href="javascript:;">
      <div class="avatar">
        <img src="{{$value.author.avatar}}" alt="">
      </div>
      <div class="txt">
        <p>
          <span>{{$value.author.nickName}}</span>{{$value.createAt}}说:
        </p>
        <p>{{$value.content}}</p>
      </div>
    </a>
  </li>
  {{/each}}
    `
    await $.ajax({
      url:'/comments',
      type:'get',
      success:function(resp){
        $('.widgets .discuz').html(template.render(html,resp))
      }
    })
    //todo 随机推荐图片路径
    let str = `
    {{each resp}}
    <li>
    <a href="javascript:;">
      <p class="title">{{$value.title}}</p>
      <p class="reading">阅读({{$value.meta.views}})</p>
      <div class="pic">
        <img src="{{$value.thumbnail}}" alt="">
      </div>
    </a>
  </li>
    {{/each}}
    `
    $.ajax({
        url:'/posts/random',
        type:'get',
        success:function(resp){
            console.log(resp);
        $('.widgets .random').html(template.render(str,{resp}))
            
        }
    })
  
  }()





}())