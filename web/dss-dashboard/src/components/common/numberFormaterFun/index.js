export default function NFormatterTest(value, type, symbol, commaSeparated = false) {
    var SI_SYMBOL = ["Unit", "Lac", "Cr"];
    const Rformatter = new Intl.NumberFormat('en-IN', {
        // maximumFractionDigits:0,
        useGrouping: true,
        // currencyDisplay : Intl.NumberFormatOptions
        //style: 'currency',
        currency: 'INR'
    })
    switch (type) {
        case "amount":
        case "Amount":
            switch (symbol) {
                case SI_SYMBOL[1]:
                    return `${Rformatter.format((value / 100000).toFixed(2) || 0)} `

                case SI_SYMBOL[2]:
                    return `${Rformatter.format((value / 10000000).toFixed(2) || 0)} `

                case SI_SYMBOL[0]:
                    if (value.length <= 8 || commaSeparated) {
                        return Rformatter.format(value || 0)
                    } else {
                        let val = Rformatter.format((value / 10000000).toFixed(2) || 0).replace('₹ ', '');
                        var right = val.substring(val.length - 12, val.length);
                        var left = val.substring(0, val.length - 12).replace(',', '');
                        let newVal = right + '' + left
                        return newVal;
                    }

                default:
                    return 0; // `${Rformatter.format(value || 0)}`;
            }
        case "number":
        case "Number":
            if (!commaSeparated) {
                return parseInt(value);
            }
            const Nformatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });
            return Nformatter.format(value);
        case "percentage":
        case "Percentage":
            const Pformatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });
            return `${Pformatter.format(value)} %`;
        case "text":
        case "Text":
            return value;
        default:
            return value;

    }
}