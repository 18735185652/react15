
// 匹配分组捕获


// 正向前瞻语法为(?=pattern),即在目标字符串的相应位置必须有pattern部分匹配的内容，
// 但不作为匹配结果处理，更不会存储在缓冲区内供以后使用

console.log('1ab'.match(/1([a-z])([a-z])/))

// ?: 不捕获分组
console.log('1ab'.match(/1(?:[a-z])([a-z])/))

// ？= 正向前瞻 
console.log('1ab'.match(/1(?=[a-z])[a-z]/))
console.log('1ab'.match(/1(?=[a-z])([a-z])/))
// 正向否定前瞻 ?!
console.log('1a'.match(/\d(?![A-Z])[a-z]/))

// 反向肯定后瞻 
console.log('b1a'.match(/(?<=[a-z])\d[a-z]/));
//反向否定后瞻
console.log('A1a'.match(/(?<![a-z])\d[a-z]/));



/*
console.log('s1v1'.replace(/\w(?=\d)/,'x'))

let str = 'bedroom';
let reg = /^bed(?=room$)/g;
let r = reg.exec(str)
console.log('r: ', r);
*/


 let reg = /^\/home(?:\/(?=$))?$/g;
 let str = '/home/'
 console.log(reg.exec(str));
 console.log(str.match(reg));

 // (?<xxx>) 命名分组，捕获的参数在groups里面
 const groups = "04-25-2017".match(/(?<month>\d{2})-(?<day>\d{2})-(?<year>\d{4})/).groups // {month: "04", day: "25", year: "2017"}
 console.log('groups: ', groupss);
