<?php
	include('db.php');
	$pageIndex = $_GET["pageIndex"];
	//考虑pageIndex如果大于totalPage, pageIndex = totalPage
	$selSql = "select * from shop";
	
	$totalPage = ceil(mysql_num_rows(mysql_query($selSql)) / 4);
	if($pageIndex > $totalPage) $pageIndex = $totalPage;
	//定义数据库中数据在当前页面显示时，起始的条数
	$start = ($pageIndex-1) * 4;
	//定义查询当前页面数据的语句
	$sql ="select * from shop limit $start,4";
	
	$res = mysql_query($sql);
	$arr = array();
	//把当前页的数据遍历添加进数组$arr中
	while($row = mysql_fetch_assoc($res)){
		array_push($arr,$row);
	}
	//定义需要返回的数据格式
	$resArr =array(
		"res_code" => 1,
		"res_message" => "查询成功",
		"res_body" => array(
		"data" => $arr,
		"totalPage" => $totalPage,
		"pageIndex" => $pageIndex - 0
		)
	);
	echo json_encode($resArr);
	
	
	
?>