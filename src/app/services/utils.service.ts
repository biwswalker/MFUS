import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  // 20/08/2017
  public displayStringDate(dateParam: Date): string {
    const date = this.chageTo2digi(dateParam.getDate());
    const month = this.chageTo2digi(dateParam.getMonth() + 1);
    const year = dateParam.getUTCFullYear();
    return date + '/' + month + '/' + year
  }

  // 20/08/2017
  public displayDateToString(date: string, month: string, year: string): string {
    return date + '/' + month + '/' + year
  }

  public convertStringToDate(date: any, month: any, year: any): Date {
    return new Date(year, month - 1, date);
  }

  public convertStringDbToDate(dateParam: any): Date {
    const date = dateParam.substring(0, 2);
    const month = dateParam.substring(2, 4);
    const year = dateParam.substring(4, 8);
    return new Date(year, month - 1, date);
  }

  public convertDateToDb(dateParam: Date): string {
    const date = this.chageTo2digi(dateParam.getDate());
    const month = this.chageTo2digi(dateParam.getMonth() + 1);
    const year = dateParam.getUTCFullYear();
    return date + '' + month + '' + year
  }

  // format number to have 2 digit
  chageTo2digi(num: number): string {
    return (num < 10 ? '0' : '') + num;
  }



}
