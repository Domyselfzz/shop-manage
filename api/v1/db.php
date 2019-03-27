<?php
	$config = array(
	"host" => "localhost",
	"user" => "root",
	"pwd" => "",
	"dbname" => "1901"
	);
	mysql_connect($config["host"],$config["user"],$config["pwd"]);
	mysql_select_db($config["dbname"]);
	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
?>