
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

var walk_the_DOM = function walk(node,func){
    func(node);
    while (node = node.firstChild) {//firstElementChild
        walk(node,func);
        node = node.nextSibling();//nextElementSibling
    }
};


var getElementByAttribute = function (attr,value){
    var result = [];

    walk_the_DOM(document.body,function(node){
        var actrual = node.nodeType ===1 && node.getAttribute(attr);

        if(typeof actrual === 'string' && (actrual === value || typeof value !== 'string'))
            result.push(node);
    });

    return result;
}