Function.prototype.method = function (name, func) {
    //this 指向调用 method 方法的函数(类)，添加后其实例可直接使用
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
}

Number.method('integer', function () {
    // return this > 0 ? Math.ceil(this):Math.floor(this);
    return Math[this > 0 ? 'ceil' : 'floor'](this);
});

var walk_the_DOM = function walk(node, func) {
    func(node);
    while (node || (node = node.firstChild)) { //firstElementChild
        walk(node, func);
        node = node.nextSibling; //nextElementSibling
    }
};


var getElementByAttribute = function (attr, value) {
    var result = [];

    walk_the_DOM(document.body, function (node) {
        var actrual = node.nodeType === 1 && node.getAttribute(attr);

        if (typeof actrual === 'string' && (actrual === value || typeof value !== 'string'))
            result.push(node);
    });

    return result;
}


//优化成尾递归(未验证)

var walk_the_DOM = (function () {
    var siblings = [];
    var action = function (node, func, walk) {
        var sibling, firstChild;
        if (!node) {
            return walk(null, func);
        }
        func(node);
        sibling = node.nextSibling;
        firstChild = node.firstChild;

        if (sibling) siblings.push(sibling);
        return walk(firstChild, func);
    };

    return function walk(node, func) {

        if (!node && siblings.length) {
            node = siblings.shift();
            return action(node, func, walk);
        } // 
        else {
            return action(node, func, walk);
        }

    }
})();

var getElementByAttribute = function (attr, value) {
    var result = [];

    walk_the_DOM(document.body, function (node) {
        var actrual = node.nodeType === 1 && node.getAttribute(attr);

        if (typeof actrual === 'string' && (actrual === value || typeof value !== 'string'))
            result.push(node);
    });

    return result;
}

var myObject = (function () {
    var value = 0;

    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function () {
            return value;
        }
    }
})();

//创建一个名为 quo 的构造函数
//它构造出带有 get_status 方法和 status 私有属性的一个对象
var quo = function (status) {
    return {
        get_status: function () {
            return status;
        }
    }
}

//构造一个  quo 实例

var myQuo = quo('amazed');

document.write(myQuo.get_status());


//定义一个函数，他设置一个 DOM 节点为黄色，然后把它渐变为白色。

var fade = function (node) {
    var level = 1;
    var step = function () {
        var hex = level.toString(16);
        node.style.background = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};

fade(document.body);

//糟糕的例子

var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (e) {
            alert(i);
        }
    }
}

//改良后的例子
var add_the_handlers = function (nodes) {
    var helper = function (i) {
        return function (e) {
            alert(i);
        }
    }
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = helper(i);
    }
}

//寻找字符串中的 HTML 字符实体并把他们替换为对应的字符
String.method('deentityify', function () {
    //字符实体表。它映射字符实体的名字到对应的字符。

    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };

    //返回 deentityify 方法

    return function () {
        return this.replace(/&([^&;]);/g, function (a, b) {
            var r = entity[b];

            return typeof r === 'string' ? r : a;
        })
    }
});
document.write('&lt;&quot;&gt;'.deentityify()); // <">


var serial_maker = function () {
    //返回一个用来产生唯一字符串的对象。
    //唯一字符串友两部分组成：前缀+序列号
    //该对象包含一个设置前缀的方法，一个设置序列号的方法
    //和一个产生唯一字符串的 gensym 方法

    var prefix = '';
    var seq = 0;

    return {
        set_prefix: function (p) {
            prefix = p;
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function () {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};

var seqer = serial_maker();

seqer.set_prefix('Q');
seqer.set_seq(1000);

var unique = seqer.gensym();

Function.method('curry', function () {
    var slice = Array.prototype.slice //
        ,
        args = arguments //
        ,
        that = this; //
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    }
});

var fibonacci = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

for (var i = 0; i <= 10 i++) {
    document.write('// ' + i + ' : ' + fibonacci(i));
}

var fibonacci = function  (){
    
    var memo = [0,1];
    var fib = function  (n){
       var result = momo[n];

       if(typeof result !== 'number'){
           result = fib(n-1) + fib(n-2);
           memo[n] = result;
       } 
       return result;
    }; 
    return fib;
}();

var memoizer = function  (memo,formula){
    var recur = function  (n){
        var result = memo[n];

        if(typeof result != 'number'){
            result = formula(recur,n);
            memo[n] = result;
        }
        return result;
    }

    return recur;
}
//fibonacci
var fibonacci = memoizer([0,1],function  (recur,n){
    return recur(n -1) + recur(n -2);
});
//阶乘
var  factorial = memoizer([0,1],function  (recur,n){
    return n * recur(n-1);
});