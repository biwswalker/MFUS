import { SmSponsors } from './../content/models/sm-sponsors';
import { SponsorsForm } from './../content/form/sponsors-form';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SponsorsService {

  constructor(private http: Http) { }

  getSponsors(): Observable<SmSponsors[]> {
    const url = 'http://restfulapi.dev/sponsors';
    const headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
    .map(
      (res: Response) => {
        return res.json();
      }
    );
  }

  addSponsors(sponsors: SponsorsForm) {
    const url = 'http://restfulapi.dev/sponsors';
    const body = JSON.stringify(sponsors);
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, body, {headers: headers});
  }

  searchSponsors(sponsors: SponsorsForm): Observable<SponsorsForm[]> {
    const url = 'http://restfulapi.dev/sponsors';
    const body = JSON.stringify(sponsors);
    const headers = new Headers({'Content-Type': 'application/json'});

    let criteria = '/';

    if(sponsors.smSponsors.sponsors_name != null
        && sponsors.smSponsors.sponsors_name != '') {
      criteria = criteria + 'sponsors_name=' + sponsors.smSponsors.sponsors_name + '&';
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
        let results: SponsorsForm[] = [];
        let form: SponsorsForm = new SponsorsForm();
        console.log('res.json() = ' + res.json());
        for (let data of res.json()) {
          console.log('==================');
          console.log('data.sponsors_ref = ' + data.sponsors_ref);
          console.log('data.sponsors_name = ' + data.sponsors_name);
          console.log('data.address= ' + data.address);
          console.log('data.phone_no = ' + data.phone_no);
          console.log('data.active_flag = ' + data.active_flag);
          form = new SponsorsForm();
          form.smSponsors = data;
          form.smSponsors.sponsors_ref = data.sponsors_ref;
          form.smSponsors.sponsors_name = data.sponsors_name;
          form.smSponsors.address = data.address;
          form.smSponsors.phone_no = data.phone_no;
          form.smSponsors.active_flag = data.active_flag;
          console.log('form.smSponsors.sponsors_name = ' + form.smSponsors.sponsors_name);
          results.push(form);
        }
        return results;
      }
    );
  }

  updateSponsors(sponsors: SponsorsForm, ref: string) {
    console.log('ref' + ref);
    const url = 'http://restfulapi.dev/sponsors/' + ref;
    const body = JSON.stringify(sponsors);
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, body, {headers: headers});
  }

}
