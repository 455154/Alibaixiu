(async function(){

    
let item={}
await $.ajax({
    url:'/posts/count',
    type:'get',
    success:function(response){
        item.postCount=response.postCount
        item.draftCount=response.draftCount
    },
    error:function(err){
        console.log(err);
    }
})

await $.ajax({
    url:'/categories/count',
    type:'get',
    success:function(response){
        item.categoryCount=response.categoryCount
    },
    error:function(err){
        console.log(err);
    }
})


await $.ajax({
    url:'/comments/count',
    type:'get',
    success:function(response){
        item.commentCount=response.commentCount
        $('#number').html(template('countTpl',item))
    },
    error:function(err){
        console.log(err);
    }
})



















}())