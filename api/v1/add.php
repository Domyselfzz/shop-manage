<?php
	include 'db.php';
	$name = $_GET["name"];
	$price = $_GET["price"];
	$num = $_GET["num"];
	$sql = "insert into shop (name, price, num) values ('$name', $price, $num)";

	if(mysql_query($sql)){
		echo json_encode(array('res_code' => 1, 'res_message' => '录入成功'));
	}else{
		echo json_encode(array('res_code' => 0, 'res_message' => '网络错误'));
	}
?>