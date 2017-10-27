import { RftTitleName } from '../content/models/rft-title-name';
import { StartupService } from './startup.service';
import { config } from './../app.config';
import { RftSubDistrict } from './../content/models/rft-sub-district';
import { RftDistrict } from './../content/models/rft-district';
import { Headers, Http, RequestMethod, RequestOptions, Response } from '@angular/http';
import { RftProvince } from './../content/models/rft-province';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const url: string = config.backendUrl;

@Injectable()
export class UtilsService {
  private mainUrl: string = config.backendUrl;
  url = this.mainUrl;

  constructor(private http: Http,private startupService: StartupService) { }

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
    return year + '' + month + '' + date
  }

  public convertDateCriteria(dateParam: Date): string {
    const date = this.chageTo2digi(dateParam.getDate());
    const month = this.chageTo2digi(dateParam.getMonth() + 1);
    const year = dateParam.getUTCFullYear();
    return  year+ '-' + month  + '-' + date
  }

  // format number to have 2 digit
  chageTo2digi(num: number): string {
    return (num < 10 ? '0' : '') + num;
  }


  getProvinces(): Observable<RftProvince[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url+'province', options)
      .map(
      (res: Response) => {
        console.log(res.json());
        return res.json();
      }
      );
  }

  getProvincesList() {
    return this.startupService.provinceList;
  }

  getDistricts(): Observable<RftDistrict[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url+'district', options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  getSubDistricts(): Observable<RftSubDistrict[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url+'subdistrict', options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  getDistrictsByProvinceRef(ref: number): Observable<RftDistrict[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let criteria = '/province_ref=' + ref;
    return this.http.get(this.url+'district' + criteria, options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  getSubDistrictsByDistrictRef(ref: number): Observable<RftSubDistrict[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let criteria = '/district_ref=' + ref;
    return this.http.get(this.url+'subdistrict' + criteria, options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  getTitleList(): Observable<RftTitleName[]> {
    const headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.url+'titlename', options)
      .map(
        (res:Response)=>{
          return res.json()
        }
      );
  }

}
