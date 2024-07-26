export class DateUtils {
  public static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  public static formatDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public static isDateOnOrAfterToday(date: Date): boolean {
    const today = new Date();

    // Crear nuevas fechas solo con la parte de la fecha (año, mes y día) en la zona horaria local
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const inputDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    console.log('Today:', todayDateOnly);
    console.log('Input Date:', inputDateOnly);

    return inputDateOnly >= todayDateOnly;
}



}
