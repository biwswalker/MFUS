import { ApFamilyFinancial } from '../models/ap-family-financial';
import { ApScholarshipHistory } from '../models/ap-scholarship-history';
import { ApFamilyDebt } from '../models/ap-family-debt';
import { RftTitleName } from './../models/rft-title-name';
import { RftMajor } from './../models/rft-major';
import { RftSchool } from './../models/rft-school';
import { ApApplication } from './../models/ap-application';
import { AcStudent } from './../models/ac-student';
export class ApplyScholarshipForm {

  public acStudent: AcStudent;
  public apApplication: ApApplication;
  public apFamilyFinancial: ApFamilyFinancial;
  public apFamilyDebt: ApFamilyDebt;
  public apScholarshipHistory: ApScholarshipHistory;

  public rftSchool: RftSchool;
  public rftMajor: RftMajor;
  public rftTitleName: RftTitleName;

  public age: number;
  public seq = [];


  constructor() {
    this.acStudent = new AcStudent();
    this.apApplication = new ApApplication();
    this.apFamilyFinancial = new ApFamilyFinancial();
    this.apFamilyDebt = new ApFamilyDebt();
    this.apScholarshipHistory = new ApScholarshipHistory();
    this.rftSchool = new RftSchool();
    this.rftMajor = new RftMajor();
    this.rftTitleName = new RftTitleName();

  }
}
