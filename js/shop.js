var inputName = document.querySelector("#s_name"),
	inputPrice = document.querySelector("#s_price"),
	inputNum = document.querySelector("#s_num"),
	btn = document.querySelector("#entering"),
	closeBtn = document.querySelector("#close-btn"),
	tbody = document.querySelector("#tbody"),
	pagination = document.querySelector("#pagination"),
	mycart = document.querySelector("#mycart"),
	s_push =document.querySelector("#s_push"),
	nextPage = document.querySelector("#nextPage");

var pageIndex = 1,
	totalPage,
	cookieName = tools.cookie("username");
//商品录入
//判断是否登录
s_push.onclick = function(){
	if(!cookieName){
		this.setAttribute("data-target","##");
		this.setAttribute("data-toggle","");
		if(confirm("您未登录!立刻前往登录页面?")){
			location.href = "html/login.html";
		}
	}
}
btn.onclick = function(){
		if(cookieName){
			var name = inputName.value,
				price = inputPrice.value,
				num = inputNum.value;
				//向服务器发送请求，添加商品
			tools.ajaxGet("api/v1/add.php",{name,price,num},function(res){
				
				if(res.res_code === 1){
					alert(res.res_message);
					//输入框清空
					inputName.value = inputPrice.value = inputNum.value = "";
					//关闭模态框
					$('#addModal').modal('hide');
					//重新请求数据
					getShop();
				}
			});
		}else if(confirm("您未登录!立刻前往登录页面?")){
		location.href = "html/login.html";
	}
}
//我的购物车
mycart.onclick = function(){
if(cookieName){
	location.href = "html/shoppingcart.html";
	}else if(confirm("您未登录!立刻前往登录页面?")){
		location.href = "html/login.html";
	}
}
//商品查询
//判断用户是否登录，登录则显示商品列表
if(cookieName){
	getShop();
}else{
	pagination.style.display = "none";
}

function getShop(){
	tools.ajaxGet("api/v1/get.php",{pageIndex},function(res){
		// console.log(res);
		if(res.res_code === 1){
			var {data} = res.res_body;
			//修改全局变量pageIndex
			pageIndex = res.res_body.pageIndex;
			totalPage = res.res_body.totalPage;
			// var data = res.res_body.data;
			var html = "";
			// 遍历数组data[{}]中当前页的数据shop{...}
			data.forEach(function(shop,i){
			
				html +=`<tr data-id="${shop.Id}">
			  				<td>${(pageIndex-1)*4+ i+1}</td>
			  				<td><span>${shop.name}</span><input type="text"></td>
			  				<td><span>${shop.price}</span><input type="text"></td>
			  				<td><span>${shop.num}</span><input type="text"></td>
			  				<td>
								<button class="btn btn-success btn-xs cartBtn">加入购物车</button>
			  					<button class="btn btn-primary btn-xs editBtn">编辑</button>
			  					<button class="btn btn-danger btn-xs deleteBtn">删除</button>
			  					<button class="btn btn-success btn-xs okBtn">确定</button>
			  					<button class="btn btn-warning btn-xs cancelBtn">取消</button>
			  				</td>
			  			</tr>`;
			})
			tbody.innerHTML = html;
			
			// -------------------------
			//先把上一次分页的li删除
			Array.from(pagination.querySelectorAll(".pageLi")).forEach(function(li){
				li.remove();
			})
			//渲染分页
			for(var i = 1; i <= totalPage;i++){
				var li = document.createElement("li");
				li.innerHTML = '<a class="page" href="javascript:;">'+i+'</a>';
				li.className = i === pageIndex ? "active pageLi" : "pageLi";
				pagination.insertBefore(li,nextPage);
			}
		}
	})
}
// 分页
pagination.onclick = function(e){
	e = e || window.event;
	var target = e.target || e.srcElement;
	switch(target.className){
	case "page" :
		//点击的页码数
		pageIndex = Number(target.innerHTML);
		getShop();
		break;
	case "prev" :
		// 如果减完之后小于1，那么让他等于1，并且什么都不做
		// 否则才去调getShop
		if(--pageIndex < 1){
			pageIndex = 1;
			return;
		}
		getShop();
		break;
	case "next":
		if(++pageIndex > totalPage){
			pageIndex = totalPage;
			return;
		}
		getShop();
	}
}
//表格编辑
tbody.onclick = function(e){
	e = e || window.event;
	var target = e.target || e.srcElement;
	var tr = target.parentNode.parentNode;
	var data_id = tr.getAttribute("data-id");
	// console.log(typeof data_id);	
	//删除按钮
	if(target.className.includes("deleteBtn")){
		if(confirm("确定删除吗？")){
			tools.ajaxPost("api/v1/delete.php",{data_id},function(res){
				// console.log(res);
				if(res.res_code===1){
					getShop();
				}else{
					alert(res.res_message);
				}
			});
		}
	}
	//编辑按钮
	if(target.className.includes("editBtn")){
		tr.classList.add("edit");
		let aSpan = Array.from(tr.querySelectorAll("span"));
		aSpan.forEach(function(span){
			span.nextElementSibling.value = span.innerHTML;
		})
	}
	//确定按钮
	if(target.className.includes("okBtn")){
		//前端页面的实时响应
		tr.classList.remove("edit");
		let aSpan = Array.from(tr.querySelectorAll("span"));
		aSpan.forEach(function(span){
			span.innerHTML = span.nextElementSibling.value;
		})
		//数据库的实时修改
		let s_name = tr.children[1].children[0].innerHTML,
		s_price = Number(tr.children[2].children[0].innerHTML),
		s_num = Number(tr.children[3].children[0].innerHTML);
		tools.ajaxPost("api/v1/update.php",{data_id,s_name,s_price,s_num},function(res){
			if(res.res_code === 1){
				alert(res.res_message);
			}else{
				alert(res.res_message);
			}
		});
	}
	//删除按钮
	if(target.className.includes("cancelBtn")){
		tr.classList.remove("edit");
	}
	//购物车按钮
	if(target.className.includes("cartBtn")){
		let s_name = tr.children[1].children[0].innerHTML,
			s_price = tr.children[2].children[0].innerHTML;
		let obj={
			"id":data_id,
			"name":s_name,
			"price":s_price,
			"num":1
		};
		let cart = localStorage.getItem('cart');
		if(cart){
			//localStorage存在
			cart = JSON.parse(cart);
			//判断是否存在当前这条数据
			var i = 0;
			if(cart.some(function(item,index){
				i = index;
				return item.id == data_id && item.name == s_name && item.price == s_price;
			})){
				//存在当前这条数据，则num++
				cart[i].num++;
			}else{
				//localStorage不存在当前这条数据
				cart.push(obj);
			}
			
		}else{
			cart = [obj]
		}
		localStorage.setItem('cart',JSON.stringify(cart));
		
	}
	
}
