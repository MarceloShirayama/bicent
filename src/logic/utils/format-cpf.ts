export class FormatCpf {
  private static _default = "???.???.???-??";

  static format(valor: string) {
    const unFormatted = FormatCpf.unFormat(valor).split("");

    const formatted = unFormatted
      .reduce(
        (formatted: string, num: string) => formatted.replace("?", num),
        FormatCpf._default
      )
      .split("?")[0]
      .replace(/[-.]$/, "");

    return formatted;
  }

  static unFormat(value: string) {
    return value.replace(/[^0-9]+/g, "");
  }
}
