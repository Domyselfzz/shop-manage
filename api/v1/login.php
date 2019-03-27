<?php
	include("db.php");
	$username = $_POST["username"];
	$password = $_POST["password"];
	$sql = "select * from users where username = '$username' and password = '$password'";
	
	$res = mysql_query($sql);
	
	if(mysql_num_rows($res) >= 1){
		echo json_encode(array("res_code" => 1,"res_message" => '登陆成功'));
	}else{
		echo json_encode(array("res_code" => 0,"res_message" => '用户名或密码错误'));
	}
?>