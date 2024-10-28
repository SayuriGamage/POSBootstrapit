

export default class CustomerModel{
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get full_name() {
        return this._full_name;
    }

    set full_name(value) {
        this._full_name = value;
    }

    get mobile() {
        return this._mobile;
    }

    set mobile(value) {
        this._mobile = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    constructor(id,full_name,mobile,email,address) {
        this._id=id;
        this._full_name=full_name;
        this._mobile=mobile;
        this._email=email;
        this._address=address;
    }


}