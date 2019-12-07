(function(){

$.ajax({
    url:'/slides',
    type:'get',
    success:(resp)=>{
        console.log(resp);
      $('#slides').html(template('slidesTpl',{resp}))  
      $('#cursor').html(template('cursorTpl',{resp}))  
    }
})








}())