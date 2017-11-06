import { SmSponsors } from './../content/models/sm-sponsors';
import { SmScholarship } from './../content/models/sm-scholarship';
import { ScholarshipForm } from './../content/form/scholarship-form';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { config } from './../app.config';

import { Observable } from 'rxjs';
import 'rxjs/Rx'  // import for .map; used for every services
import { Injectable } from '@angular/core';

@Injectable()
export class ScholarshipService {

  private mainUrl: string = config.backendUrl;
  url = this.mainUrl + 'scholarship';

  constructor(private http: Http) { }

  getScholarship(): Observable<SmScholarship[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  addScholarship(scholarship: ScholarshipForm) {
    const url = this.mainUrl + 'scholarship';
    const body = JSON.stringify(scholarship);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    console.log(body);
    return this.http.post(url, body, { headers: headers });
  }

  searchScholarship(scholarship: ScholarshipForm): Observable<ScholarshipForm[]> {
    const body = JSON.stringify(scholarship);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    let criteria = '/';

    if (scholarship.smScholarship.sponsors_ref != null
      && scholarship.smScholarship.sponsors_ref != '') {
      criteria = criteria + 'sm_sponsors.sponsors_ref=' + scholarship.smScholarship.sponsors_ref + '&';
     }
    if (scholarship.smScholarship.scholarship_type != null
      && scholarship.smScholarship.scholarship_type != '') {
      criteria = criteria + 'scholarship_type=' + scholarship.smScholarship.scholarship_type + '&';
    }
    if (scholarship.smScholarship.scholarship_name != null
      && scholarship.smScholarship.scholarship_name != '') {
      criteria = criteria + 'scholarship_name=' + scholarship.smScholarship.scholarship_name + '&';
    }
    if (scholarship.smScholarship.active_flag != null
      && scholarship.smScholarship.active_flag  != '') {
      criteria = criteria + 'sm_scholarship.active_flag=' + scholarship.smScholarship.active_flag  + '&';
    }

    console.log(criteria);
    if (criteria.length > 1) {
      criteria = criteria.substr(0, criteria.length-1);
    } else {
      criteria = '';
    }

    console.log(body);
    console.log(criteria);
    return this.http.get(this.url + criteria, { headers: headers })
      .map(
      (res: Response) => {
        console.log(res)
        let results: ScholarshipForm[] = [];
        let form: ScholarshipForm = new ScholarshipForm();
        console.log('res.json() = ' + res.json());
        let i = 1;
        for (let data of res.json()) {
          form = new ScholarshipForm();
          form.index = i;
          form.smScholarship = data.sm_scholarship;
          form.smSponsors = data.sm_sponsors;
          console.log('form.rftSchool.school_name_t = ' + form.smSponsors.sponsors_name);
          results.push(form);
          i++;
        }
        return results;
      }
      );
  }

  updateScholarship(scholarship: ScholarshipForm, ref: string) {
    console.log('ref' + ref);
    const url = this.mainUrl + 'scholarship/' + ref;
    const body = JSON.stringify(scholarship);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(body);
    return this.http.put(url, body, { headers: headers });
  }
}
