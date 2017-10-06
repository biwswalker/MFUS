import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { RftSchool } from './../content/models/rft-school';
import { SchoolForm } from './../content/form/school-form';
import { Injectable } from '@angular/core';

@Injectable()
export class SchoolService {

  private mainUrl: string = 'http://dev-server:8000/';

  constructor(private http: Http) { }

  getSchools(): Observable<RftSchool[]> {
    const url = this.mainUrl + 'school';
    const headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
    .map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  addSchool(school: SchoolForm) {
    const url = this.mainUrl + 'school';
    const body = JSON.stringify(school);
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, body, {headers: headers});
  }

  searchSchool(school: SchoolForm): Observable<SchoolForm[]> {
    const url = this.mainUrl + 'school';
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(school);
    let criteria = '/';
    if(school.rftSchool.school_code != null
        && school.rftSchool.school_code != '') {
      criteria = criteria + 'school_code=' + school.rftSchool.school_code + '&';
    }

    if(school.rftSchool.school_name_t != null
        && school.rftSchool.school_name_t != '') {
      criteria = criteria + 'school_name_t=' + school.rftSchool.school_name_t + '&';
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
        let results: SchoolForm[] = [];
        let form: SchoolForm = new SchoolForm();
        console.log('res.json() = ' + res.json());
        for (let data of res.json()) {
          console.log('data.school_ref = ' + data.school_ref);
          console.log('data.school_name_t = ' + data.school_name_t);
          form = new SchoolForm();
          form.rftSchool = data;
          results.push(form);
        }
        return results;
      }
    );
  }


  updateSchool(school: SchoolForm, ref: string) {
    console.log('ref' + ref);
    const url = this.mainUrl + 'school/' + ref;
    const body = JSON.stringify(school);
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, body, {headers: headers});
  }

}
