import { config } from './../app.config';
import { SmSponsors } from './../content/models/sm-sponsors';
import { SponsorsForm } from './../content/form/sponsors-form';
import { Observable } from 'rxjs';
import 'rxjs/Rx'  // import for .map; used for every services
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class SponsorsService {

   //insert => post
  //search => get
  //update => put

  private mainUrl: string = config.backendUrl;
  url = this.mainUrl + 'sponsors';

  constructor(private http: Http) { }

  getSponsors(): Observable<SmSponsors[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  addSponsors(sponsors: SmSponsors) {
    const body = JSON.stringify(sponsors);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url, body, { headers: headers });
  }

  searchSponsors(sponsors: SponsorsForm): Observable<SponsorsForm[]> {
    const body = JSON.stringify(sponsors);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    let criteria = '/';

    if (sponsors.smSponsors.sponsors_name != null
      && sponsors.smSponsors.sponsors_name != '') {
      criteria = criteria + 'sponsors_name=' + sponsors.smSponsors.sponsors_name + '&';
    }


    if (sponsors.smSponsors.active_flag != null
      && sponsors.smSponsors.active_flag != '') {
      criteria = criteria + 'active_flag=' + sponsors.smSponsors.active_flag + '&';
    }

    if (criteria.length > 1) {
      criteria = criteria.substr(0, criteria.length - 1);
    } else {
      criteria = '';
    }

    return this.http.get(this.url + criteria, { headers: headers })
      .map(
      (res: Response) => {
        let results: SponsorsForm[] = [];
        let form: SponsorsForm = new SponsorsForm();
        let i = 1;
        for (let data of res.json()) {
          form = new SponsorsForm();
          form.smSponsors = data;
          form.index = i;
          form.smSponsors.sponsors_ref = data.sponsors_ref;
          form.smSponsors.sponsors_name = data.sponsors_name;
          form.smSponsors.address = data.address;
          form.smSponsors.phone_no = data.phone_no;
          form.smSponsors.active_flag = data.active_flag;
          results.push(form);
          i++;
        }
        return results;
      }
      );
  }

  updateSponsors(sponsors: SponsorsForm, ref: string) {
    // const url = this.mainUrl + 'sponsors/' + ref;
    const body = JSON.stringify(sponsors);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(this.url + '/' + ref, body, { headers: headers });
  }

  getSponsorsForAutocomplete(): Observable<SmSponsors[]> {
    this.url = this.mainUrl+'atpsponsors'
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

}
