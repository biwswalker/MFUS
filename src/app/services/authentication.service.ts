import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  private isActiveStage = new Subject();
  private isRoleStage = new Subject();
  
  constructor() { }

  public stageActiveStatus(): Subject<any> {
    return this.isActiveStage;
  }

  private setStageStatus(stage){
    this.isActiveStage.next(stage);
  }

  private login(user) {
    // return this.configuration.serviceHttpClientPost('login', criteria);
  }

  logout() {
    this.isActiveStage.next(false);
  }

}
