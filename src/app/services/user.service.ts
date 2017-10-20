import { Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { OfficerForm } from '../content/form/officer-form';

@Injectable()
export class UserService {

  private mainUrl = 'http://127.0.0.1:8000/';
  constructor(private http:Http) { }

  addUser(user: OfficerForm) {
    const url = this.mainUrl + 'user';
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(url, body, { headers: headers });
  }
}
