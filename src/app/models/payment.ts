export class Payment {
    name: string;
    amount: number;
    code: string;
    gridCode: Array<Array<string>> = [];

    constructor(_name: string, _amount: number, _code: string, _gridCode: Array<Array<string>>) {
        this.name = _name;
        this.amount = _amount;
        this.code = _code;
        this.gridCode = [].concat(_gridCode)
    }

    public get gridCount() {
        var count = 0;
        if (this.gridCode) {
            this.gridCode.forEach(item => { count += item.length });
        }
        return count;
    }

}