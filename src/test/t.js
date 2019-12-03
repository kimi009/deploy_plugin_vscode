const fs = require('fs')
const path=require('path');  /*nodejs自带的模块*/

let p = 'e:\\vanvy\\eip-web\\InvoiceSprite\\deploy\\test.sh'
let re = fs.statSync(p)

console.log(re.isFile())
console.log(path.dirname(p))



var extname=path.extname("123.html");	 //获取文件的后缀名
 
console.log(extname);