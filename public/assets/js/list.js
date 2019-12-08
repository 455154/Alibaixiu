(function(){

    let id = location.search.split('=')[1]

    $.ajax({
        url:'/categories/'+id,
        type:'get',
        success:function(resp){
            console.log(resp);
            $('.new h3').html(resp.title)
        }
    })
    // $.ajax({
    //     url:'/posts/category/'+id,
    //     type:'get',
    //     success:function(resp){
    //         console.log(resp);
    //         let html = `
    //         <h3>会生活</h3>
    //         {{each resp}}
    //         <div class="entry">
    //           <div class="head">
    //             <a href="detail.html">{{$value.title}}</a>
    //           </div>
    //           <div class="main">
    //             <p class="info">admin 发表于 2020-02-01</p>
    //             <p class="brief">星球大战:原力觉醒：《星球大战:原力觉醒》中国首映盛典红毯，星球大战:原力觉醒：《星球大战:原力觉醒》中国首映盛典红毯，星球大战:原力觉醒：《星球大战:原力觉醒》中国首映盛典红毯星球大战:原力觉醒：《星球大战:原力觉醒》中国首映盛典红毯，星球大战:原力觉醒：《星球大战:原力觉醒》中国首映盛典红毯，星球大战:原力觉醒：《星球大战:原力觉醒》中国首映盛典红毯</p>
    //             <p class="extra">
    //               <span class="reading">阅读(3406)</span>
    //               <span class="comment">评论(0)</span>
    //               <a href="javascript:;" class="like">
    //                 <i class="fa fa-thumbs-up"></i>
    //                 <span>赞(167)</span>
    //               </a>
    //               <a href="javascript:;" class="tags">
    //                 分类：<span>星球大战</span>
    //               </a>
    //             </p>
    //             <a href="javascript:;" class="thumb">
    //               <img src="uploads/hots_2.jpg" alt="">
    //             </a>
    //           </div>
    //         </div>
    //         {{/each}}
    //         `
    //         template.render(html,{resp})
    //     }

    // })



}())