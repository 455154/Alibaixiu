//表单数据转对象
function serializeObj(form) {
  let formDate = $(form).serializeArray()
  // console.log(formDate);
  let User = {};
  $.each(formDate, (index, item) => {
      User[item.name] = item.value
  })
  return User
}
//退出登录
$('#logout').on('click', (e) => {
  e.preventDefault()
  let isConfirm = confirm('您确认要退出吗?')
  if(isConfirm){
    $.ajax({
      type:'post',
      url:'/logout',
      success:()=>{
        location.href='/admin/login.html'
      },
      error:()=>{
        alert('退出失败')
      }
    })
  }
})
