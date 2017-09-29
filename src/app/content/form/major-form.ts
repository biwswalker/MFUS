import { RftSchool } from './../models/rft-school';
import { RftMajor } from './../models/rft-major';
export class MajorForm {

  public rftMajor: RftMajor;
  public rftSchool: RftSchool;

  constructor() {
    this.rftMajor = new RftMajor();
    this.rftSchool = new RftSchool();
  }
}
