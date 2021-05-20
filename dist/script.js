class Product {
    constructor(id, name, price, description, inStock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = inStock;
    }
    Init() {
        let h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.innerHTML = this.name;
        let divprice = document.createElement("div");
        divprice.setAttribute("class", "col-6 p-0 text-primary font-weight-bold");
        divprice.innerHTML = this.price + " грн.";
        let divavail = this.availabilityElem = document.createElement("div");
        if (this.IsAvailable()) {
            divavail.setAttribute("class", "col-6 p-0 text-right text-success");
            divavail.innerHTML = "Есть в наличии";
        }
        else {
            divavail.setAttribute("class", "col-6 p-0 text-right text-danger");
            divavail.innerHTML = "Нет в наличии";
        }
        let divrow = document.createElement("div");
        divrow.setAttribute("class", "row");
        divrow.appendChild(divprice);
        divrow.appendChild(divavail);
        let divcon = document.createElement("div");
        divcon.setAttribute("class", "container");
        divcon.appendChild(divrow);
        let p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerHTML = this.description;
        let a = document.createElement("a");
        a.setAttribute("id", this.id.toString());
        a.setAttribute("href", "#buyModal");
        a.setAttribute("class", "btn btn-primary");
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("onclick", "WantBuy(this.id)");
        a.innerHTML = "Купить";
        let divfu = document.createElement("div");
        divfu.setAttribute("class", "card-footer");
        divfu.appendChild(a);
        let divcardb = document.createElement("div");
        divcardb.setAttribute("class", "card-body mh-100");
        divcardb.setAttribute("style", "height: 200px");
        divcardb.appendChild(h5);
        divcardb.appendChild(divcon);
        divcardb.appendChild(p);
        let divcard = document.createElement("div");
        divcard.setAttribute("class", "card");
        divcard.appendChild(divcardb);
        divcard.appendChild(divfu);
        let divcol = document.createElement("div");
        divcol.setAttribute("class", "col-md-6 col-xl-4 p-1");
        divcol.appendChild(divcard);
        return divcol;
    }
    Embed(obj) {
        let prods = document.getElementById('rowts');
        prods.appendChild(obj);
    }
    IsAvailable() {
        return (this.inStock > 0) ? true : false;
    }
    checkIsInStock() {
        if (this.IsAvailable()) {
            this.availabilityElem.setAttribute("class", "col-6 p-0 text-right text-success");
            this.availabilityElem.innerHTML = "Есть в наличии";
        }
        else {
            this.availabilityElem.setAttribute("class", "col-6 p-0 text-right text-danger");
            this.availabilityElem.innerHTML = "Нет в наличии";
        }
    }
}
var Color;
(function (Color) {
    Color["Black"] = "\u0427\u0451\u0440\u043D\u044B\u0439";
    Color["Gray"] = "\u0421\u0435\u0440\u044B\u0439";
    Color["Pink"] = "\u0420\u043E\u0437\u043E\u0432\u044B\u0439";
})(Color || (Color = {}));
;
class FeltBoots extends Product {
    constructor(id, name, price, description, inStock, list) {
        super(id, name, price, description, inStock);
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = inStock;
        this.list = list;
        this.CalculateFlags();
        this.Init();
    }
    Init() {
        let obj = super.Init();
        if (this.isBigSizes) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть большие размеры";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (this.haveColors.length > 0) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            let str = this.haveColors[0];
            for (let i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        this.Embed(obj);
    }
    CalculateFlags() {
        this.isBigSizes = false;
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.list[i].dimension > 43 && this.list[i].quantity > 0) {
                    this.isBigSizes = true;
                    break;
                }
        let k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    }
}
class Headphones extends Product {
    constructor(id, name, price, description, inStock, isWireless) {
        super(id, name, price, description, inStock);
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = inStock;
        this.isWireless = isWireless;
        this.Init();
    }
    Init() {
        let obj = super.Init();
        if (this.isWireless) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Беспроводные";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (document.getElementById('isWireless') == null && this.isWireless != null && this.isWireless) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isWireless");
            inp.setAttribute("onclick", "CheckWireless(this.checked)");
            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только беспроводные<br>";
            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    }
}
class Conditioner extends Product {
    constructor(id, name, price, description, inStock, isForWall) {
        super(id, name, price, description, inStock);
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = inStock;
        this.isForWall = isForWall;
        this.Init();
    }
    Init() {
        let obj = super.Init();
        if (this.isForWall) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Настенный";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (document.getElementById('isForWall') == null && this.isForWall != null && this.isForWall) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isForWall");
            inp.setAttribute("onclick", "CheckIsForWall(this.checked)");
            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только настенные<br>";
            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    }
}
class Tv extends Product {
    constructor(id, name, price, description, inStock, isSmart) {
        super(id, name, price, description, inStock);
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = inStock;
        this.isSmart = isSmart;
        this.Init();
    }
    Init() {
        let obj = super.Init();
        if (this.isSmart) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть SmartTV";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (document.getElementById('isSmart') == null && this.isSmart != null && this.isSmart) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isSmart");
            inp.setAttribute("onclick", "CheckIsSmart(this.checked)");
            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только с SmartTV<br>";
            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    }
}
function CheckWireless(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < productList.length; i++)
            if (productList[i] instanceof Headphones && productList[i].isWireless)
                productList[i].Init();
    }
    else {
        for (let i = 0; i < productList.length; i++)
            productList[i].Init();
    }
}
function CheckIsForWall(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < productList.length; i++)
            if (productList[i] instanceof Conditioner && productList[i].isForWall)
                productList[i].Init();
    }
    else {
        for (let i = 0; i < productList.length; i++)
            productList[i].Init();
    }
}
function CheckIsSmart(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < productList.length; i++)
            if (productList[i] instanceof Tv && productList[i].isSmart)
                productList[i].Init();
    }
    else {
        for (let i = 0; i < productList.length; i++)
            productList[i].Init();
    }
}
class Balalaika extends Product {
    constructor(id, name, price, description, inStock) {
        super(id, name, price, description, inStock);
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = inStock;
        this.Init();
    }
    Init() {
        this.Embed(super.Init());
    }
}
class Basket {
    constructor() {
        this.list = new Map();
    }
    Add(val) {
        let num = +document.getElementById('inputquantity').value;
        if (isNaN(num) || !((num ^ 0) === num) || num == 0 || productList[val].inStock < num) {
            if (productList[val].inStock < num)
                document.getElementById('modlalMessag').innerHTML = "Столько на складе нет";
            else
                document.getElementById('modlalMessag').innerHTML = "Введите целое число";
            return false;
        }
        else {
            document.getElementById('modlalMessag').innerHTML = "";
            productList[val].inStock -= num;
            let item = this.list.get(val);
            if (item) {
                item.quantity += num;
            }
            else {
                this.list.set(val, { id: val, quantity: num });
            }
            this.CalculateBasket();
            return true;
        }
    }
    CalculateBasket() {
        if (this.list.size > 0) {
            let id;
            let total = 0;
            let message = "В данный момент в корзине:<br>";
            for (const [key, val] of this.list.entries()) {
                message += productList[key].name + " - " + val.quantity + "<br>";
                total += productList[key].price * val.quantity;
            }
            message += "<br><br>На общую сумму " + total + " грн.";
            document.getElementById('myBasket').innerHTML = message;
        }
        else
            document.getElementById('myBasket').innerHTML = "В данный момент корзина пустая";
    }
}
function myByBtn(val) {
    if (basket.Add(val))
        $('#buyModal').modal('hide');
    productList[val].checkIsInStock();
}
function WantBuy(val) {
    document.getElementById('modlalBtn').setAttribute("value", val);
    document.getElementById('inStockCount').innerText = 'В наличии: ' + productList[val].inStock;
}
let basket = new Basket();
let productList = [
    new Headphones(0, "Наушники фирмы1", 816, "Прекрасные наушники! Сама английская королева слушает жесткий металл через такие же!", 4, true),
    new FeltBoots(1, "Валенки2", 91.2, "Хороший выбор! В них тепло, хорошо. Обувь многосезонная - лето, осень, зима, весна.", 6, [{ dimension: 44, color: Color.Black, quantity: 2 },
        { dimension: 43, color: Color.Black, quantity: 3 },
        { dimension: 42, color: Color.Black, quantity: 1 },
        { dimension: 41, color: Color.Black, quantity: 2 },
        { dimension: 44, color: Color.Gray, quantity: 2 },
        { dimension: 39, color: Color.Gray, quantity: 1 },
        { dimension: 45, color: Color.Gray, quantity: 1 },
        { dimension: 42, color: Color.Gray, quantity: 1 },
    ]),
    new Headphones(2, "Наушники фирмы4", 119.50, "Дёшево не значит плохо! Эти наушники стоят своих денег!", 30, false),
    new Headphones(3, "Наушники фирмы2", 144, "Это оптимальный выбор! Налетай торопись!", 15, true),
    new Balalaika(4, "Балалайка1", 915, "Сам страдивари её выстругал! Мастер Страдивари Аарон Моисеевич ©. В комплекте к балалайке должен идти медведь.", 1),
    new FeltBoots(5, "Валенки3", 65, "Валенки знаменитой российской фабрики Красный ЦинБаоЧен. Оригинальный продукт сделаный по технологиям прошлого.", 1),
    new Headphones(6, "Наушники фирмы3", 265, "Тру поклонники музыки обязательно такие имеют! А ты что? Ты не тру?!", 0),
    new FeltBoots(7, "Валенки1", 666.66, "Валенки великолепной работы слепого мастера Игната! В комплекте к валенкам идёт кокошник.", 2, [{ dimension: 45, color: Color.Pink, quantity: 1 },
        { dimension: 43, color: Color.Pink, quantity: 1 }
    ]),
    new Balalaika(8, "Балалайка2", 217, "Обычная балалайка белорусской фирмы Змрочныя мелодыі.", 1),
    new Conditioner(9, "Кондиционер1", 500, "Напольный кондиционер.", 1),
    new Conditioner(10, "Кондиционер2", 650, "Настенный кондиционер.", 1, true),
    new Tv(11, "Телевизор1", 300, "Телевизор обычный.", 1),
    new Tv(12, "Телевизор2", 500, "Телевизор крутой.", 1, true)
];
//# sourceMappingURL=script.js.map