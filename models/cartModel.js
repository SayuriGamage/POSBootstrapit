

export default class CartModel{
    constructor(item_code,description,unitPrice,qty,total) {
        this._item_code=item_code;
        this._description=description;
        this._unitPrice=unitPrice;
        this._qty=qty;
        this._total = total;

    }

    get item_code() {
        return this._item_code;
    }

    set item_code(value) {
        this._item_code = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}