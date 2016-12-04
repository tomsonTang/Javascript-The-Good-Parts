//函数包含一组语句，他们是 JavaScript 的基础模块单元，用于代码复用、信息隐藏和组合调用。函数用于指定对象的行为
//一般来说，所谓编程，就是将一组需求分解成一组函数与数据结构的技能

//对象字面量产生的对象连接到 Object.prototype。函数对象连接到 Function.prototype(该原型对象本身连接到 Object.prototype )。
//每个函数在创建时会附加两个隐藏属性:函数的上下文和实现函数行为的代码
//JavaScript 创建一个函数对象时，会给该对象设置一个“调用”属性。当 JavaScript 调用一个函数时，可理解为调用此函数的“调用”属性

//通过函数字面量创建的函数对象包含一个连接到外部上下文的连接。这被成为闭包（closure）。他是 JavaScript 强大表现力的来源。

//调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。每个函数还接收两个附加的参数 this 和 arguments 。
//参数 this 在面向对象编程中非常重要，他的值取决于调用的模式。在 JavaScript 中一共有4种调用模式：方法调用模式，函数调用模式，构造器调用模式，apply 调用模式

//当一个函数被保存为对象的一个属性时，我们称他为方法。当一个方法被调用时，this 被绑定到该对象，方法可以使用 this 访问直接所属的对象，所以它能从对象中取值或对对象进行修改。
//this 到该对象的绑定发生在调用的时候。这个“超级”延迟绑定（very late binding）使得函数可以对 this 高度复用。通过 this 可取得他们所属对象的上下文的方法称为公共方法（public method）

//当一个函数并非为一个对象的属性时 ，这个函数就只是一个函数 ，当其被调用时 this 被绑定到全局对象上

//如果一个函数前面带上 new 来调用，那么背地里会创建一个连接到该函数的 prototype 成员的新对象，同时 this 会被绑定到那个新对象上
//new 前缀也会改变 return 语句的行为

//因为 JavaScript 是一门函数式的面向对象编程语言，所以函数可以拥有方法。

//如果函数调用时在前面加上了 new 前缀、且返回值不是一个对象则返回 this（该新对象）

//通过给 Function.prototype 增加方法来使得该方法对所有函数(类)可用
Function.prototype.method = function (name, func) {
    //this 指向调用 method 方法的函数(类)，添加后其实例可直接使用
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
}

//该方法 parseInt 完全可以实现 但是作者觉得该取整方法有些丑陋
Number.method('integer', function () {
    // return this > 0 ? Math.ceil(this):Math.floor(this);
    return Math[this > 0 ? 'ceil' : 'floor'](this);
});

//递归函数可以非常高效的操作树形结构，比如浏览器端的文档对象模型（DOM）。每次递归时处理指定的树的一小段
//定义 walk_the_DOM 函数,它从指定的节点开始，按 HTML 源码中的顺序访问该树的每个节点
//它会调用一个函数，并依次传递每个节点给它，walk_the_DOM 调用自身去处理每一个子节点
var walk_the_DOM = function walk(node,func){
    func(node);
    while (node = node.firstChild) {//firstElementChild
        walk(node,func);
        node = node.nextSibling();//nextElementSibling
    }
};

//定义 getElementByAttribute 函数 。它以一个属性名称作为字符串和一个可选的函数值作为参数。
//它调用 walk_the_DOM ，传递一个用来查找节点属性名的函数作为参数。
//匹配的节点会累加到一个结果数组中

var getElementByAttribute = function (attr,value){
    var result = [];

    walk_the_DOM(document.body,function(node){
        var actrual = node.nodeType ===1 && node.getAttribute(attr);

        if(typeof actrual === 'string' && (actrual === value || typeof value !== 'string'))
            result.push(node);
    });

    return result;
}