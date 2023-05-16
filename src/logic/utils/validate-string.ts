export class ValidateString {
  static lengthIsBetween(
    str: string,
    min: number,
    max: number,
    trim: boolean = true
  ) {
    const finalString = (trim ? str?.trim?.() : str) ?? "";

    return finalString.length >= min && finalString.length <= max;
  }
}
