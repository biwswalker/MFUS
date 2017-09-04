import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor() { }

  public isUserLogedIn(): boolean {
    return true;
  }

}
