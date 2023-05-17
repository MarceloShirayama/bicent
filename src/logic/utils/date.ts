export class HandleDate {
  private static _language = "pt-BR";

  static dd_mm_yy = {
    format(dt: Date, separator: string = "/") {
      const day = dt.getDate().toString().padStart(2, "0");
      const month = (dt.getMonth() + 1).toString().padStart(2, "0");

      return `${day}${separator}${month}${separator}${dt.getFullYear()}`;
    },
  };

  static mm_yy = {
    format(dt: Date, language?: string): string {
      return dt?.toLocaleDateString?.(language ?? HandleDate._language, {
        month: "long",
        year: "numeric",
      } as Intl.DateTimeFormatOptions);
    },
  };

  static dd_mm = {
    format(dt: Date): string {
      return dt?.toLocaleDateString?.(HandleDate._language, {
        day: "2-digit",
        month: "short",
      } as Intl.DateTimeFormatOptions);
    },
  };

  static months() {
    return Array(12)
      .fill(0)
      .map((_, i) =>
        new Date(2000, i, 1)
          .toLocaleDateString(HandleDate._language, { month: "short" })
          .toUpperCase()
          .substring(0, 3)
      );
  }

  static firstDay(dt: Date) {
    return new Date(dt.getFullYear(), dt.getMonth(), 1);
  }

  static lastDay(dt: Date) {
    return new Date(dt.getFullYear(), dt.getMonth() + 1, 0, 23, 59, 59);
  }
}
