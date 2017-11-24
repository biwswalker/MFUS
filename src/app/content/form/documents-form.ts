import { AcStudent } from './../models/ac-student';
import { RftTitleName } from './../models/rft-title-name';
import { RftMajor } from './../models/rft-major';
import { RftSchool } from './../models/rft-school';

export class DocumentsForm {

  index :number;
  public acStudent: AcStudent;
  public rftMajor: RftMajor;
  public rftSchool: RftSchool;
  public rftTitleName: RftTitleName;

  constructor() {
    this.rftTitleName = new RftTitleName;
    this.acStudent = new AcStudent();
    this.rftMajor = new RftMajor();
    this.rftSchool = new RftSchool();
  }
}
