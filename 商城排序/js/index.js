// 单例模式
let shopModule = (function () {
    // 获取数据
    let navList = document.querySelectorAll('.nav-item'),
        productBox = document.querySelector('.productBox'),
        data = null;

    // ajax 数据请求
    let queryData = function queryData() {
        //创建一个人
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    };

    // 渲染数据
    let render = function render() {
        let str = '';
        data.forEach(item => {
            let {
                title,
                price,
                time,
                hot,
                img
            } = item;
            str += `<div class="card">
            <img src="${img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">价格：¥${price.toFixed(2)}元</p>
                <p class="card-text">热度：${hot}</p>
                <p class="card-text">上架时间：${time}</p>
            </div>
        </div>`;
        })
        productBox.innerHTML = str;
    };

    // 清空排序
    let clear = function clear() {
        Array.from(navList).forEach(item => {
            if(item !== this){
                item.flag = -1;
            }
        })
    };

    // 循环绑定点击事件
    let handle = function handle() {
        Array.from(navList).forEach(item => {
            item.flag = -1;
            item.onclick = function () {
                clear.call(this);
                this.flag *= -1;
                let pai = this.getAttribute('data-pai');
                // console.log(pai);
                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, '');
                    b = String(b[pai]).replace(/-/g, '');
                    return (a - b) * this.flag;
                })
                render();
            };
        });
    };
    
    return {
        init() {
            queryData();
            render();
            handle();
        }
    };
})();
shopModule.init();