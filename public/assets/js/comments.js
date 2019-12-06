(function(){
$.ajax({
    url:'/comments',
    type:'get',
    success:function(resp){
        console.log(resp);
        
    }
})







}())