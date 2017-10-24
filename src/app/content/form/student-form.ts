import { RftSchool } from './../models/rft-school';
import { RftMajor } from './../models/rft-major';
import { AcStudent } from '../models/ac-student';

export class StudentForm {
  public acStudent: AcStudent;
  public rftMajor: RftMajor;
  public rftSchool: RftSchool;

  constructor() {
    this.acStudent = new AcStudent();
    this.rftMajor = new RftMajor();
    this.rftSchool = new RftSchool();
  }
}
