import { AcStudent } from './../../content/models/ac-student';
import { Injectable } from '@angular/core';

@Injectable()
export class StepService {

  private student: AcStudent = new AcStudent() ;
  private activeIndex = 0;

  addData(acStudent: AcStudent) {
    console.log(acStudent);
    this.student = acStudent;
    console.log(this.student);
  }

  nextIndex(){
    this.activeIndex += 1;
    console.log(this.activeIndex);
  }

  getIndex(){
    return this.activeIndex;
  }

  getData(){
    return this.student;
  }

}
