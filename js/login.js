window.onload = function(){
	var userInput = document.querySelector("#inputUsername"),
		pwdInput = document.querySelector("#inputPassword"),
		btn = document.querySelector("#login"),
		remember = document.querySelector("#remember");
		
		btn.onclick = function(){
			var username = userInput.value,
				password = pwdInput.value;
			tools.ajaxPost("../api/v1/login.php",{username,password},function(res){
				if(res.res_code ===1){
					//保存用户登录信息cookie，以及10天免登录的状态
					var option = remember.checked? {"path" : "/","expires":10} :{"path":"/"};
					tools.cookie("username",username,option);
					if(confirm(res.res_message + "，即将跳转至首页")){
						location.href = "../index.html";
					}
				}else{
					alert(res.res_message);
				}
			});
			
			return false;
		}
	
	
}
