import { ApplyScholarshipForm } from './../content/form/apply-scholarshop-form';
import { Injectable } from '@angular/core';

@Injectable()
export class ApplyscholarshipService {

  private activeIndex = 0;
  private applyScholarshipForm: ApplyScholarshipForm = new ApplyScholarshipForm();

  constructor() { }

  nextIndex(){
    this.activeIndex += 1;
    console.log(this.activeIndex);
  }

  getIndex(){
    return this.activeIndex;
  }

  getData(){
    return this.applyScholarshipForm;
  }

  getStudentInfo(studentRef: string) {

  }

}
