import { ApApplication } from './../models/ap-application';
import { AcStudent } from './../models/ac-student';
export class ApplyScholarshipForm {

  public acStudent: AcStudent = new AcStudent();
  public apApplication: ApApplication = new ApApplication();


  constructor() {
    this.acStudent = new AcStudent();
    this.apApplication = new ApApplication();

  }
}
