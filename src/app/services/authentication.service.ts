import { config } from '../app.config';
import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ConfigurationsService } from './configurations.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private isActiveStage = new Subject();
  private isRoleStage = new Subject();
  private url = config.backendUrl;

  constructor(private requestService: ConfigurationsService, private http: HttpClient) { }

  stageActiveStatus(): Subject<any> {
    return this.isActiveStage;
  }

  setStageStatus(stage) {
    this.isActiveStage.next(stage);
  }
  
  logout() {
    this.isActiveStage.next(false);
  }

  login(user): Promise<any> {
    return this.requestService.serviceMethodPost('login', user).toPromise()
  }

  ensureAuthenticated(token): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(this.url + 'ensure', { headers: headers }).toPromise()
  }

  

}
