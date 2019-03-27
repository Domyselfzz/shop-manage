var beforeSign = document.querySelector("#before_sign"),
	signIn = document.querySelector("#sign_in"),
	signUser = document.querySelector("#sign_user"),
	signOut = document.querySelector("#signout");
//	console.log(signUser);

//判断是否登录
var username = tools.cookie("username");
if(username){
	beforeSign.style.display = "none";
	signUser.innerHTML = username;
	signIn.style.display = "block";
}
	
//退出登录
signOut.onclick = function(){
	if(confirm("确认退出登录？")){
		tools.cookie("username","",{"expires": -1,"path":"/"});
		beforeSign.style.display = "block";
		
		signIn.style.display = "none";
		
		//重新获取cookie
		cookieName = tools.cookie("username");
		//清空当前页商品列表
		let aTr =Array.from(tbody.getElementsByTagName("tr"));
		aTr.forEach(function(tr){
			tr.remove();
		})
		//隐藏分页切换按钮
		pagination.style.display = "none";
	}
}
