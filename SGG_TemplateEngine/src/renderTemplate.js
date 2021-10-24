import lookup from "./lookup";
import parseArray from "./parseArray";
/*
	函数的功能是让tokens数组变为dom字符串
*/
export default function renderTemplate(tokens, data) {
	// console.log(tokens);
	// 结果字符串
	var resultstr = ''
	// 遍历tokens
	for (var i = 0; i < tokens.length; i++) {
		let token = tokens[i]
		// 看类型
		if (token[0] == 'text') {
			//拼起来
			resultstr += token[1]
		} else if (token[0] == 'name') {
			// 如果是name类型，那么就直接使用它的值 当然要用lookup
			// 因为防止这里是“a.b.c”有逗号的形式
			resultstr+=lookup(data,token[1]) 
		}else if(token[0]=='#'){
			resultstr+=parseArray(token,data)
		}
	}
	// console.log(resultstr)
	return resultstr
}