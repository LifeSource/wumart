import numeral from "numeral";

export class CurrencyValueConverter {

    toView(value, format) {
        return numeral(value).format(format);
    }
}
