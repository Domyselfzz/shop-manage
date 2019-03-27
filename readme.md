### 接口文档

##### register

url : api/v1/register.php

method : post

query : {username, password}

data : { res_code: 1, res_message: "注册成功" }



##### login

url : api/v1/login.php

method : POST

query : {username, password}

data : {res_code: 1, res_message: "登录成功"}



##### add

url : api/v1/add.php

method : GET

query : {name, price, num}

data : {res_code: 1, res_message: "录入成功"}



##### select

url : api/v1/get

method : GET

data : {

​	res_code: 1, 

​	res_message: "查询成功", 

​	res_body : {

​		data : [{},{}]

​	}

}



##### delete

url :  api/v1/delete.php

method : GET

query : {id}

data : {res_code: 1, res_message: "删除成功"}



##### update

url : api/v1/update

method : GET

query : { id, name, price, num }

data : {res_code: 1, res_message: "修改成功"}









