var userInput = document.querySelector("#inputUsername"),
    pwdInput = document.querySelector("#inputPassword"),
    btn = document.querySelector("#register");
    btn.onclick = function(){
        var username = userInput.value;
        var password = pwdInput.value;
        console.log(username);
        tools.ajaxPost("../api/v1/register.php",{ username,password },function(res){
        	if(res.res_code === 1){
        		if(confirm(res.res_message +"，即将跳转登录页面")){
        			location.href = "login.html";
        		}
        	}
        });
        //阻止默认提交
        return false;
    }

