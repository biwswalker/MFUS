import { ApDocumentUpload } from './../content/models/ap-document-upload';
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
import { RftApplicationDocument } from '../content/models/rft-application-document';

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

  getProvinceByRef(ref: string): Observable<RftProvince> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url+'province-by-ref/'+ref, options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  getDistrictByRef(ref: string): Observable<RftDistrict> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url+'district-by-ref/'+ref, options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  getSubDistrictByRef(ref: string): Observable<RftSubDistrict> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url+'subdistrict-by-ref/'+ref, options)
      .map(
      (res: Response) => {
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

  getDistrictsByProvinceRef(ref: string): Observable<RftDistrict[]> {
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

  getDistrictListByProvinceRef(ref: string):RftDistrict[]{
    let districtList = [];
    this.getDistrictsByProvinceRef(ref).subscribe((res: RftDistrict[]) => {
      districtList.push(...res);
    });
    return districtList;
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

  getSubDistrictsByDistrictRef(ref: string): Observable<RftSubDistrict[]> {
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

  getSubDistrictListByDistrictRef(ref: string):RftSubDistrict[]{
    let subDistrictList = [];
    this.getSubDistrictsByDistrictRef(ref).subscribe((res: RftSubDistrict[]) => {
      subDistrictList.push(...res);
    });
    return subDistrictList;
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
      {label: 'มกราคม', value: '01'},
      {label: 'กุมภาพันธ์', value: '02'},
      {label: 'มีนาคม', value: '03'},
      {label: 'เมษายน', value: '04'},
      {label: 'พฤษภาคม', value: '05'},
      {label: 'มิถุนายน', value: '06'},
      {label: 'กรกฎาคม', value: '07'},
      {label: 'สิงหาคม', value: '08'},
      {label: 'กันยายน', value: '09'},
      {label: 'ตุลาคม', value: '10'},
      {label: 'พฤศจิกายน', value: '11'},
      {label: 'ธันวาคม', value: '12'},
    ];
    return months;
  }

  getDropdownDayInMonth(month: string):SelectItem[]{
    let days: SelectItem[];
    let extDays: SelectItem[];
    days = [
      {label:	'วัน'	,	value:	null	},
    ];
    if(month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12'){
      extDays = [
        {label:	'1'	,	value:	'01'	},
        {label:	'2'	,	value:	'02'	},
        {label:	'3'	,	value:	'03'	},
        {label:	'4'	,	value:	'04'	},
        {label:	'5'	,	value:	'05'	},
        {label:	'6'	,	value:	'06'	},
        {label:	'7'	,	value:	'07'	},
        {label:	'8'	,	value:	'08'	},
        {label:	'9'	,	value:	'09'	},
        {label:	'10'	,	value:	'10'	},
        {label:	'11'	,	value:	'11'	},
        {label:	'12'	,	value:	'12'	},
        {label:	'13'	,	value:	'13'	},
        {label:	'14'	,	value:	'14'	},
        {label:	'15'	,	value:	'15'	},
        {label:	'16'	,	value:	'16'	},
        {label:	'17'	,	value:	'17'	},
        {label:	'18'	,	value:	'18'	},
        {label:	'19'	,	value:	'19'	},
        {label:	'20'	,	value:	'20'	},
        {label:	'21'	,	value:	'21'	},
        {label:	'22'	,	value:	'22'	},
        {label:	'23'	,	value:	'23'	},
        {label:	'24'	,	value:	'24'	},
        {label:	'25'	,	value:	'25'	},
        {label:	'26'	,	value:	'26'	},
        {label:	'27'	,	value:	'27'	},
        {label:	'28'	,	value:	'28'	},
        {label:	'29'	,	value:	'29'	},
        {label:	'30'	,	value:	'30'	},
        {label:	'31'	,	value:	'31'	},

      ];
    }

    if(month =='02'){
      extDays = [
        {label:	'1'	,	value:	'01'	},
        {label:	'2'	,	value:	'02'	},
        {label:	'3'	,	value:	'03'	},
        {label:	'4'	,	value:	'04'	},
        {label:	'5'	,	value:	'05'	},
        {label:	'6'	,	value:	'06'	},
        {label:	'7'	,	value:	'07'	},
        {label:	'8'	,	value:	'08'	},
        {label:	'9'	,	value:	'09'	},
        {label:	'10'	,	value:	'10'	},
        {label:	'11'	,	value:	'11'	},
        {label:	'12'	,	value:	'12'	},
        {label:	'13'	,	value:	'13'	},
        {label:	'14'	,	value:	'14'	},
        {label:	'15'	,	value:	'15'	},
        {label:	'16'	,	value:	'16'	},
        {label:	'17'	,	value:	'17'	},
        {label:	'18'	,	value:	'18'	},
        {label:	'19'	,	value:	'19'	},
        {label:	'20'	,	value:	'20'	},
        {label:	'21'	,	value:	'21'	},
        {label:	'22'	,	value:	'22'	},
        {label:	'23'	,	value:	'23'	},
        {label:	'24'	,	value:	'24'	},
        {label:	'25'	,	value:	'25'	},
        {label:	'26'	,	value:	'26'	},
        {label:	'27'	,	value:	'27'	},
        {label:	'28'	,	value:	'28'	},
       ];
    }

    if(month == '04' || month == '06' || month == '09' || month == '11'){
      extDays = [
        {label:	'1'	,	value:	'01'	},
        {label:	'2'	,	value:	'02'	},
        {label:	'3'	,	value:	'03'	},
        {label:	'4'	,	value:	'04'	},
        {label:	'5'	,	value:	'05'	},
        {label:	'6'	,	value:	'06'	},
        {label:	'7'	,	value:	'07'	},
        {label:	'8'	,	value:	'08'	},
        {label:	'9'	,	value:	'09'	},
        {label:	'10'	,	value:	'10'	},
        {label:	'11'	,	value:	'11'	},
        {label:	'12'	,	value:	'12'	},
        {label:	'13'	,	value:	'13'	},
        {label:	'14'	,	value:	'14'	},
        {label:	'15'	,	value:	'15'	},
        {label:	'16'	,	value:	'16'	},
        {label:	'17'	,	value:	'17'	},
        {label:	'18'	,	value:	'18'	},
        {label:	'19'	,	value:	'19'	},
        {label:	'20'	,	value:	'20'	},
        {label:	'21'	,	value:	'21'	},
        {label:	'22'	,	value:	'22'	},
        {label:	'23'	,	value:	'23'	},
        {label:	'24'	,	value:	'24'	},
        {label:	'25'	,	value:	'25'	},
        {label:	'26'	,	value:	'26'	},
        {label:	'27'	,	value:	'27'	},
        {label:	'28'	,	value:	'28'	},
        {label:	'29'	,	value:	'29'	},
        {label:	'30'	,	value:	'30'	},

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

  getDocument(): Observable<RftApplicationDocument[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url+'application-document', options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

}
