export default class ItemModel {
    constructor(code, description, price, qtyOnHand) {
        this._code = code;
        this._description = description;
        this._price = parseFloat(price).toFixed(2);
        this._qtyOnHand = parseInt(qtyOnHand, 10);
    }

    get code() {
        return this._code;
    }

    set code(value) {
        this._code = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = parseFloat(value).toFixed(2);
    }

    get qtyOnHand() {
        return this._qtyOnHand;
    }

    set qtyOnHand(value) {
        this._qtyOnHand = parseInt(value, 10);
    }
}
