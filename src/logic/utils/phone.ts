export class HandlePhone {
  // TODO: melhorar lógica
  private static _default = "(??) ?????-????";

  static format(valor: string) {
    const unFormatted = HandlePhone.unFormat(valor).split("");

    const formatted = unFormatted
      .reduce((formatted: string, num: string) => {
        return formatted.replace("?", num);
      }, HandlePhone._default)
      .split("?")[0]
      .trim()
      .replace(/[()-]$/, "");

    return formatted;
  }

  static unFormat(str: string) {
    return str.replace(/[^0-9]+/g, "");
  }
}
