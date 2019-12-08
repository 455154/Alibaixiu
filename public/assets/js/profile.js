(onload=async function(){

 await $.ajax({
    url: '/users/' + userId,
    type: 'get',
    success: function (resp) {

      console.log(resp,1);

      $('#imgAvatar').prop('src',resp.avatar)

    //   $('#email').val(resp.email)
    //   $('#nickName').val(resp.nickName)
      document.querySelector('#nickName').value=resp.nickName
      document.querySelector('#email').value=resp.email
      $('#btn').val(resp._id)
    }
  })
await $('#avatar').on('change',function(){
    let formData = new FormData();
    formData.append('img', this.files[0])
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (resp) {
            $('#imgAvatar').prop('src',resp[0].img)
        },
        error: function (err) {
            console.log(err);
        }
    })

    
}
)

 await $('#form').on('submit',function(e){
     let id=$('#btn').val()
    let data = serializeObj(this)
    $.ajax({
       url: '/users/'+ id,
       type:'put',
       data,
       success:function(resp){
           console.log(1,resp);
           
       }
    })
  })





})