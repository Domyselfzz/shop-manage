<?php
	include('db.php');
	$id = $_POST["data_id"];
	$s_name = $_POST["s_name"];
	$s_price = $_POST["s_price"];
	$s_num = $_POST["s_num"];
	$sql = "update shop set name='$s_name', price=$s_price, num=$s_num   where Id = $id";
	$res = mysql_query($sql);
	if($res){
		echo json_encode(array("res_code" => 1,"res_message" => "修改成功"));
	}else{
		echo json_encode(array("res_code" => 0,"res_message" => "网络错误"));
	}
?>