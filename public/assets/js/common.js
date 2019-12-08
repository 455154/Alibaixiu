//表单数据转对象

function serializeObj(form) {
  let formDate = $(form).serializeArray()
  let User = {};
  $.each(formDate, (index, item) => {
    User[item.name] = item.value
  })
  return User
}
//退出登录
$('#logout').on('click', async (e) => {
  e.preventDefault()
  let isConfirm = confirm('您确认要退出吗?')
  if (isConfirm) {
    $.ajax({
      type: 'post',
      url: '/logout',
      success: () => {
        location.href = '/admin/login.html'
      },
      error: () => {
        alert('退出失败')
      }
    })
  }
})

~async function () {
  await $.ajax({
    url: '/login/status',
    type: 'get',
    success:function (resp) {
      console.log(resp);
      window.userId = resp.split(',')[1].split('"')[1].split('"')[0]
      console.log(userId);
       $.ajax({
        url: '/users/' + userId,
        type: 'get',
        success:   function (resp) {
          user = resp
          console.log(resp);

          $('.name').html(resp.nickName)
          $('.avatar').prop('src', resp.avatar)
        }
      })
    },
    error: function () {
      console.log(2);

    }
  })
}();

