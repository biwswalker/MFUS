import { SelectItem } from 'primeng/primeng';
import { RftTitleName } from '../content/models/rft-title-name';
import { StartupService } from './startup.service';
import { config } from './../app.config';
import { RftSubDistrict } from './../content/models/rft-sub-district';
import { RftDistrict } from './../content/models/rft-district';
import { Headers, Http, RequestMethod, RequestOptions, Response } from '@angular/http';
import { RftProvince } from './../content/models/rft-province';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SmScholarship } from '../content/models/sm-scholarship';
import { SmScholarshipAnnouncement } from '../content/models/sm-scholarship-announcement';

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
    console.log('ref' + ref)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let criteria = '/province_ref=' + ref;
    return this.http.get(this.url+'atpdistrict' + criteria, options)
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
    return this.http.get(this.url+'atpsubdistrict' + criteria, options)
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

  getDropdownMonthShort():SelectItem[]{
    let months: SelectItem[];
    months = [
      {label: 'เดือน', value: null},
      {label: 'มกราคม', value: 1},
      {label: 'กุมภาพันธ์', value: 2},
      {label: 'มีนาคม', value: 3},
      {label: 'เมษายน', value: 4},
      {label: 'พฤษภาคม', value: 5},
      {label: 'มิถุนายน', value: 6},
      {label: 'กรกฎาคม', value: 7},
      {label: 'สิงหาคม', value: 8},
      {label: 'กันยายน', value: 9},
      {label: 'ตุลาคม', value: 10},
      {label: 'พฤศจิกายน', value: 11},
      {label: 'ธันวาคม', value: 12},
    ];
    return months;
  }

  getDropdownDayInMonth(month: number):SelectItem[]{
    let days: SelectItem[];
    let extDays: SelectItem[];
    days = [
      {label:	'วัน'	,	value:	null	},
    ];
    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
      extDays = [
        {label:	'1'	,	value:	1	},
        {label:	'2'	,	value:	2	},
        {label:	'3'	,	value:	3	},
        {label:	'4'	,	value:	4	},
        {label:	'5'	,	value:	5	},
        {label:	'6'	,	value:	6	},
        {label:	'7'	,	value:	7	},
        {label:	'8'	,	value:	8	},
        {label:	'9'	,	value:	9	},
        {label:	'10'	,	value:	10	},
        {label:	'11'	,	value:	11	},
        {label:	'12'	,	value:	12	},
        {label:	'13'	,	value:	13	},
        {label:	'14'	,	value:	14	},
        {label:	'15'	,	value:	15	},
        {label:	'16'	,	value:	16	},
        {label:	'17'	,	value:	17	},
        {label:	'18'	,	value:	18	},
        {label:	'19'	,	value:	19	},
        {label:	'20'	,	value:	20	},
        {label:	'21'	,	value:	21	},
        {label:	'22'	,	value:	22	},
        {label:	'23'	,	value:	23	},
        {label:	'24'	,	value:	24	},
        {label:	'25'	,	value:	25	},
        {label:	'26'	,	value:	26	},
        {label:	'27'	,	value:	27	},
        {label:	'28'	,	value:	28	},
        {label:	'29'	,	value:	29	},
        {label:	'30'	,	value:	30	},
        {label:	'31'	,	value:	31	},

      ];
    }

    if(month == 2){
      extDays = [
        {label:	'1'	,	value:	1	},
        {label:	'2'	,	value:	2	},
        {label:	'3'	,	value:	3	},
        {label:	'4'	,	value:	4	},
        {label:	'5'	,	value:	5	},
        {label:	'6'	,	value:	6	},
        {label:	'7'	,	value:	7	},
        {label:	'8'	,	value:	8	},
        {label:	'9'	,	value:	9	},
        {label:	'10'	,	value:	10	},
        {label:	'11'	,	value:	11	},
        {label:	'12'	,	value:	12	},
        {label:	'13'	,	value:	13	},
        {label:	'14'	,	value:	14	},
        {label:	'15'	,	value:	15	},
        {label:	'16'	,	value:	16	},
        {label:	'17'	,	value:	17	},
        {label:	'18'	,	value:	18	},
        {label:	'19'	,	value:	19	},
        {label:	'20'	,	value:	20	},
        {label:	'21'	,	value:	21	},
        {label:	'22'	,	value:	22	},
        {label:	'23'	,	value:	23	},
        {label:	'24'	,	value:	24	},
        {label:	'25'	,	value:	25	},
        {label:	'26'	,	value:	26	},
        {label:	'27'	,	value:	27	},
        {label:	'28'	,	value:	28	},
       ];
    }

    if(month == 4 || month == 6 || month == 9 || month == 11){
      extDays = [
        {label:	'1'	,	value:	1	},
        {label:	'2'	,	value:	2	},
        {label:	'3'	,	value:	3	},
        {label:	'4'	,	value:	4	},
        {label:	'5'	,	value:	5	},
        {label:	'6'	,	value:	6	},
        {label:	'7'	,	value:	7	},
        {label:	'8'	,	value:	8	},
        {label:	'9'	,	value:	9	},
        {label:	'10'	,	value:	10	},
        {label:	'11'	,	value:	11	},
        {label:	'12'	,	value:	12	},
        {label:	'13'	,	value:	13	},
        {label:	'14'	,	value:	14	},
        {label:	'15'	,	value:	15	},
        {label:	'16'	,	value:	16	},
        {label:	'17'	,	value:	17	},
        {label:	'18'	,	value:	18	},
        {label:	'19'	,	value:	19	},
        {label:	'20'	,	value:	20	},
        {label:	'21'	,	value:	21	},
        {label:	'22'	,	value:	22	},
        {label:	'23'	,	value:	23	},
        {label:	'24'	,	value:	24	},
        {label:	'25'	,	value:	25	},
        {label:	'26'	,	value:	26	},
        {label:	'27'	,	value:	27	},
        {label:	'28'	,	value:	28	},
        {label:	'29'	,	value:	29	},
        {label:	'30'	,	value:	30	},

      ];
    }
    if(month != null){
      days = days.concat(extDays);
    }

return days;

  }

  getScholarshipList(): Observable<SmScholarshipAnnouncement[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url+'scholarship-announcement', options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

}
