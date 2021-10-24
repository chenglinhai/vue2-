import lookup from "./lookup";
import renderTemplate from "./renderTemplate";
/*
	处理数组 ，结合renderTemplate实现递归
	注意 这个函数的参数是token 而不是tokens
	token是什么 就是一个简单的['#' ,'students',[]]

	这个函数要递用调用renderTemplate函数 调用多少次？？？
	调用的次数有data决定
	比如data的形式是这样的
	students:[
			{'name':'小明','hobbies':['游泳','健身']},
			{'name':'小红','hobbies':['足球','篮球','羽毛球']},
			{'name':'小强','hobbies':['吃饭','睡觉']}
	]
	那么parseArray()函数就要递归调用renderTemplate函数3次 因为数组长度是3
*/
export default function parseArray(token, data) {
	// console.log(token,data);
	// 得到整体数据data中这个数组要使用的部分
	var v = lookup(data, token[1])
	// console.log(v.length);
	// 结果字符串
	// console.log(v instanceof Array);
	var resultstr = ''
	// 遍历v数组 v一定是数组
	// 注意 下面这个循环可能是整个包中最难思考的一个循环
	// 它是遍历数据 而不是遍历tokens,数组中的数据有几条 就要遍历几条
	
	for (let i = 0; i < v.length;i++){
		// 这里要补一个“.”属性
		// v[i]['.']=v[i]
		// 拼接
			resultstr+=renderTemplate(token[2],{
				// 现在这个数据小对象，是v[i]的展开，就是v[i]本身
				...v[i],
				// 补充一个.属性
				'.':v[i]
			})
		}

	return resultstr
}