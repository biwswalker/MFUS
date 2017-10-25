import { RftMajor } from './../content/models/rft-major';
import { config } from './../app.config';
import { RftSchool } from './../content/models/rft-school';
import { Observable } from 'rxjs';
import { MajorForm } from './../content/form/major-form';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MajorService {

  private mainUrl: string = 'http://localhost:8000/';
  constructor(private http: Http) { }

  //insert => post
  //search => get
  //update => put

  addMajor(major: MajorForm) {
    const url = this.mainUrl + 'major';
    const body = JSON.stringify(major);
    const headers = new Headers({'Content-Type': 'application/json'});


    console.log(body);
    return this.http.post(url, body, {headers: headers});
  }

  searchMajor(major: MajorForm): Observable<MajorForm[]> {
    const url = this.mainUrl + 'major';
    const body = JSON.stringify(major);
    const headers = new Headers({'Content-Type': 'application/json'});

    let criteria = '/';

    if(major.rftSchool.school_name_t != null
        && major.rftSchool.school_name_t != '') {
      criteria = criteria + 'school_name_t=' + major.rftSchool.school_name_t + '&';
    }


    if(major.rftMajor.major_name_t != null
      && major.rftMajor.major_name_t != '') {
      criteria = criteria + 'major_name_t=' + major.rftMajor.major_name_t + '&';
    }

    console.log(criteria);
    if(criteria.length > 1){
      criteria = criteria.substr(0,criteria.length-1);
    }else{
      criteria = '';
    }
    console.log(body);
    console.log(criteria);

    return this.http.get(url+criteria, {headers: headers})
    .map(
      (res: Response) => {
        let results: MajorForm[] = [];
        let form: MajorForm = new MajorForm();
        console.log('res.json() = ' + res.json());
        for (let data of res.json()) {
          console.log('==================');
          console.log('data.school_code = ' + data.school_code);
          console.log('data.school_name_t = ' + data.school_name_t);
          console.log('data.school_name_e = ' + data.school_name_e);
          console.log('data.school_ref = ' + data.school_ref);
          console.log('data.major_ref = ' + data.major_ref);
          console.log('data.school_name_t = ' + data.major_name_t);
          form = new MajorForm();
          form.rftMajor = data.rft_major;
          form.rftSchool = data.rft_school
          console.log('form.rftSchool.school_name_t = ' + form.rftSchool.school_name_t);
          results.push(form);
        }
        return results;
      }
    );
  }

  updateMajor(major: MajorForm, ref: string) {
    console.log('ref' + ref);
    const url = this.mainUrl + 'major/' + ref;
    const body = JSON.stringify(major);
    const headers = new Headers({'Content-Type': 'application/json'});
    console.log(body);
    return this.http.put(url, body, {headers: headers});
  }

  getMajorBySchoolRef(ref: string): Observable<RftMajor[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let criteria = '/rft_major.school_ref=' + ref;
    return this.http.get(this.mainUrl+'major' + criteria, options)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }
}
