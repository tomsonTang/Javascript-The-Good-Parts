//通常你需要检测 object.hasOwnProperty(variable) 来确定这个属性名是该对象的成员还是来自于原型链

for (var key in object) {
    if (object.hasOwnProperty(key)) {
        var element = object[key];
        //...
    }
}

//JavaScript 不允许在 return 关键字和表达式之间换行
//JavaScript 不允许在  break 关键字和表达式之间换行

//undefined NaN Infinity 不是 JavaScript 保留字

//在 JavaScript 语言里 “%” 不是通常数学意义上的模运算，而实际上是 “求余” 运算。
//两个运算数都是正数时，求模运算和求余运算值相同，两个运算数存在负数时，求模运算和求余运算的值不同

