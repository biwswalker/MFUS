import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { config } from '../app.config';
import { Response } from '@angular/http/src/static_response';
import { ApplicationTrackingForm } from '../content/form/application-tracking-form';

@Injectable()
export class ApplicationTrackingService {

  private mainUrl = config.backendUrl;

  constructor(private http: Http) { }

  getScholarshipAnnoucement(ref: string): Observable<any[]> {
    const headers = new Headers({ "Content-Type": "application/json" });

    return this.http.get(this.mainUrl + "atpanoucementbyref/" + ref, { headers: headers }).map((res: Response) => {
      return res.json();
    })
  }

  searchApplicationByCriteria(form: ApplicationTrackingForm) {
    const url = this.mainUrl + "application-tracking";
    const body = JSON.stringify(form);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let criteria = '/'

    let d = new Date();
    if (form.status == "0") {
      criteria = criteria + "registration_start_date=" + '' + '&' + "registration_end_date=" + '' + '&';
    }
    if (form.status == "1") {
      criteria = criteria + "registration_start_date=" + '' + '&' + "registration_end_date=" + '' + '&';
    }
    if (form.status == "2") {
      criteria = criteria + "registration_start_date=" + '' + '&' + "registration_end_date=" + '' + '&';
    }
    if (form.status == "3") {
      criteria = criteria + "registration_start_date=" + '' + '&' + "registration_end_date=" + '' + '&';
    }
    if (form.status == "4") {
      criteria = criteria + "registration_start_date=" + '' + '&' + "registration_end_date=" + '' + '&';
    }
    if (form.status == "5") {

    }
  }
}
