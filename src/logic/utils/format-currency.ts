export class FormatCurrency {
  private static _language = "pt-BR";
  private static _currency = "BRL";

  static format(num: number) {
    return (num ?? 0).toLocaleString(FormatCurrency._language, {
      style: "currency",
      currency: FormatCurrency._currency,
    });
  }

  static unFormat(value: string) {
    const values = value.replace(/[^0-9]+/g, "");

    const index = values.length - 2;

    return Number(`${values.substring(0, index)}.${values.substring(index)}`);
  }
}
