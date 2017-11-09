import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApplyscholarshipService {
  private activeIndex = 0;
  constructor(private http: Http) { }

  getIndex(){
    return this.activeIndex;
  }
}
