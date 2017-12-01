import { config } from './../app.config';
import { RftProvince } from './../content/models/rft-province';
import { OfficerForm } from '../content/form/officer-form';
import { OfficerComponent } from '../content/pages/officer/officer.component';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class OfficerService {

  private mainUrl =  config.backendUrl;
  private getStatus: OfficerComponent;
    constructor(private http: Http) { }

    searchProvince(province_code: string): Observable<RftProvince> {
      console.log('service.officer : ', province_code);
      const url = this.mainUrl + 'officer';
      const body = JSON.stringify(province_code);
      const headers = new Headers({'Content-Type': 'application/json'});

      let criteria = '/';

      if(province_code != null &&  province_code !='') {
         criteria = criteria + 'province_code=' + province_code + '&';
        }
        return this.http.get(url+criteria, {headers: headers})
        .map((res: Response) => {
            let results: RftProvince;
            let province: RftProvince = new RftProvince();
            console.log('res.json() = ', res.json());
            for (let data of res.json()) {
              console.log('==================');
              console.log('province_code = ' + data.province_code);
              province = new RftProvince();
              province = data;
              console.log('province = ' + province);
              results = province;
            }
            console.log('province = ' + results);
            return results;
          }
        );
    }

    addOfficer(officer: OfficerForm) {
      console.log('service.officer : ', officer);
      const url = this.mainUrl + 'officer';
      const body = JSON.stringify(officer);
      const headers = new Headers({'Content-Type': 'application/json'});

      console.log('service.body: ', body);
      return this.http.post(url, body, { headers: headers });
    }

    searchOfficer(officer: OfficerForm): Observable<OfficerForm[]> {
      console.log('criteria : ', officer);
      const url = this.mainUrl + 'officer';
      const body = JSON.stringify(officer);
      const headers = new Headers({'Content-Type': 'application/json'});

      let criteria = '/';

      if(officer.acOfficer.officer_code != null &&
        officer.acOfficer.officer_code !='') {
          criteria = criteria + 'officer_code=' + officer.acOfficer.officer_code + '&';
      }
      if(officer.acOfficer.active_flag != null) {
          criteria = criteria + 'active_flag=' + officer.acOfficer.active_flag + '&';
      }
      if(officer.acOfficer.first_name != null &&
        officer.acOfficer.first_name != '') {
          criteria = criteria + 'first_name=' + officer.acOfficer.first_name + '&';
      }
      if(officer.acOfficer.last_name != null &&
        officer.acOfficer.last_name != '') {
          criteria = criteria + 'last_name=' + officer.acOfficer.last_name + '&';
      }
      if(officer.acOfficer.personal_id != null &&
        officer.acOfficer.personal_id != '') {
          criteria = criteria + 'personal_id=' + officer.acOfficer.personal_id + '&'
      }

      console.log('criteria: ', criteria);
      if(criteria.length > 1){
        criteria = criteria.substr(0,criteria.length-1);
      }else{
        criteria = '';
      }

      console.log(body);
      console.log(criteria);

      return this.http.get(url+criteria, {headers: headers})
      .map((res: Response) => {
          let results: OfficerForm[] = [];
          let form: OfficerForm = new OfficerForm();
          console.log('res.json() = ', res.json());
          for (let data of res.json()) {
            console.log('==================');
            console.log('data.officer_code = ' + data.officer_code);
            console.log('data.active_flag = ' + data.active_flag);
            console.log('data.first_name = ' + data.first_name);
            console.log('data.last_name = ' + data.last_name);
            console.log('data.personal_id = ' + data.personal_id);
            form = new OfficerForm();
            form.acOfficer = data;
            form.acOfficer.officer_code = data.officer_code;
            form.acOfficer.active_flag = data.active_flag;
            form.acOfficer.first_name = data.first_name;
            form.acOfficer.personal_id = data.personal_id;
            form.fullname = form.acOfficer.first_name + ' ' + form.acOfficer.last_name;
            if(form.acOfficer.active_flag == 'Y') {
              form.status = 'ใช้งาน';
            }else {
              form.status = 'ไม่ใช้งาน';
            }
            console.log('officer_code = ' + data.officer_code);
            results.push(form);
          }
          return results;
        }
      );
    }

    updateOfficer(form: OfficerForm, ref: string) {
      const url = this.mainUrl + 'officer/' + ref;
      const body = JSON.stringify(form);
      const headers = new Headers({'Content-Type': 'application/json'});
      console.log('body: ',body)
      return this.http.put(url, body, { headers: headers });
    }
}
