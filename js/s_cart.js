
//插入tr
var tbody = document.querySelector("#content"),
	html = "",
    cart = localStorage.getItem("cart");
	// console.log(cart);
	if(cart){
		cart = JSON.parse(cart);
		cart.forEach(function(item){
			html +=`<tr data-id="${item.id}">
						<td><input type="checkbox" class="check"/></td>
				        <td><span>${item.name}</span></td>
				        <td><span>${item.price}</span></td>
				        <td><span id="num">${item.num}</span><input type="text"></td>
				        <td>
							<a class="btn btn-default editBtn" href="javascript:;" role="button">编辑</a>
							<a class="btn btn-default okBtn" href="javascript:;" role="button">确定</a>
							<a class="btn btn-default cancelBtn" href="javascript:;" role="button">取消</a>
							<a class="btn btn-default delBtn" href="javascript:;" role="button">删除</a>
				        </td>
						</tr>`;
		});
			tbody.innerHTML = html;
	}else{
		alert("购物车为空，请前往首页选购！");
		location.href = "../index.html";
	}
	
//编辑购物车
var table = document.querySelector("#table");
	table.onclick = function(e){
		e = e || window.event;
		var target = e.target || e.srcElement,
			tr = target.parentNode.parentNode;
			
		// 编辑按钮
		if(target.className.includes("editBtn")){
			tr.classList.add("edit");
			let span = tr.children[3].children[0];
			span.nextElementSibling.value = span.innerHTML;
		}
		//确定按钮
		if(target.className.includes("okBtn")){
			tr.classList.remove("edit");
			let span = tr.children[3].children[0];
			span.innerHTML = span.nextElementSibling.value;
			// console.log(typeof span.innerHTML);   //string
			// console.log(cart);    //JSON
			cart.forEach(function(item){
				if(item.id == tr.getAttribute("data-id")){
					item.num = span.innerHTML-0;
				}
			});
			localStorage.setItem("cart",JSON.stringify(cart));
			calcMoney();
		}
		//取消按钮
		if(target.className.includes("cancelBtn")){
			tr.classList.remove("edit");
		}
		//删除按钮
		if(target.className.includes("delBtn")){
			if(confirm("确定删除？")){
				let i = 0;
				// 返回boolean值
				if(cart.some(function(item,index){
					i = index;
					return item.id == tr.getAttribute("data-id");
				})){
					cart.splice(i,1);
				}
				localStorage.setItem("cart",JSON.stringify(cart));
				tr.remove();
				
				// 如果被删除的那一行处于选中状态,那么n--
				let nowCheck = tr.children[0].children[0];
				if(nowCheck.checked)  n--;
				//重新获取单选框
				aCheck =  Array.from(table.querySelectorAll(".check"));
				//判断是否全选
				allCheck.checked = n === aCheck.length;
				//计算价格
				calcMoney();
			}
		}
	}
	//全选单选
	var allCheck = document.querySelector("#allCheck"),
		reCheck = document.querySelector("#reCheck"),
		aCheck = Array.from(table.querySelectorAll(".check"));
	var  n = 0;
		
	allCheck.onchange = function(){
		aCheck.forEach(function(check){
			check.checked = allCheck.checked;
		})
		n =  allCheck.checked ?  aCheck.length : 0;
		// console.log(n);
		calcMoney();
	}
	//单选按钮
	aCheck.forEach(function(check){
		check.onchange = function(){
			n += check.checked? 1 : -1;
			allCheck.checked = n === aCheck.length;
			// console.log(n);
			calcMoney();
		}
	})
	//反选按钮
	reCheck.onchange = function(){
		aCheck.forEach(function(check){
			check.checked = !check.checked;
		})
		n = aCheck.length - n;
		// console.log(n);
		calcMoney();
	}
//价格计算
function calcMoney(){
	var moneyBox =  document.querySelector("#money"),
		money = 0 ;
		aCheck.forEach(function(check){
			if(check.checked){
				let price = check.parentNode.parentNode.children[2].children[0].innerHTML,
					num = check.parentNode.parentNode.children[3].children[0].innerHTML;
				money += price*num;
			}
		})
		moneyBox.innerHTML = money;
}

//计算一次
calcMoney();








