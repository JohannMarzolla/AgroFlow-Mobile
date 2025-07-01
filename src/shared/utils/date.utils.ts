export class DateUtils {
  static getStartOfDay(date: Date) {
    const iDate = date instanceof Date ? date : new Date(date);
    return new Date(iDate.getFullYear(), iDate.getMonth(), iDate.getDate());
  }

  static addDays(data = new Date(), dias: number = 1): Date {
    const novaData = new Date(data);
    novaData.setDate(novaData.getDate() + dias);
    return novaData;
  }

  static nowToEndOfMonth(): Date {
    const hoje = new Date();
    const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    fim.setHours(23, 59, 59, 999);
    return fim;
  }
}
