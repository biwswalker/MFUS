import { ApStudentLoanFund } from '../../../models/ap-student-loan-fund';
import { ApplyScholarshipComponent } from './../apply-scholarship.component';
import { ApplyScholarshipForm } from './../../../form/apply-scholarshop-form';
//Begin 6/11/2017

import { StartupService } from "./../../../../services/startup.service";
import { ScholarshipService } from "../../../../services/scholarship.service";
import { SmScholarship } from "./../../../models/sm-scholarship";
import { Component, OnInit } from "@angular/core";
import { UtilsService } from "../../../../services/utils.service";
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';
import { ApplicantInfoComponent } from '../applicant-info/applicant-info.component';
import { ApplyscholarshipService } from '../../../../services/applyscholarship.service';
import { ApScholarshipHistory } from '../../../models/ap-scholarship-history';

@Component({
  selector: "app-scholarship-info",
  templateUrl: "./scholarship-info.component.html",
  styleUrls: [
    "./scholarship-info.component.css",
    "../../../pages/pages.component.css"
  ]
})
export class ScholarshipInfoComponent implements OnInit {

  i:number = 0;
  scholarshipInfo: ApplyScholarshipForm;
  historyList: ApScholarshipHistory[] = [];
  history: ApScholarshipHistory;

  stdLoan: ApStudentLoanFund;
  stdLoanList: ApStudentLoanFund[] = [];

  scholarshipList: SmScholarshipAnnouncement[] = [];
  selectedScholarship: SmScholarshipAnnouncement;
  listScholarship: SmScholarshipAnnouncement[] = [];

  constructor(public applyScholarship: ApplyScholarshipComponent,
              private utilService: UtilsService,
              private applyscholarshipService: ApplyscholarshipService) {}

  ngOnInit() {
    this.getScholarshipAnnouncement();
    this.getScholarshipHistory();
    this.getStdLoan();
  }

  getScholarshipHistory() {
    console.log('Get scholarshipHistory')
    this.applyscholarshipService.getScholarshipHistory().subscribe(
      (res: ApScholarshipHistory[]) => {
        this.historyList.push(...res);
      }
    );
    console.log(this.applyScholarship.applyScholarshipForm)
   return this.applyScholarship.applyScholarshipForm;
  }

  getStdLoan() {
    console.log('Get getStdLoan')
    this.applyscholarshipService.getStdLoan().subscribe(
      (res: ApStudentLoanFund[]) => {
        this.stdLoanList.push(...res);
      }
    );
    console.log(this.applyScholarship.applyScholarshipForm)
   return this.applyScholarship.applyScholarshipForm;
  }

  getScholarshipAnnouncement() {
    this.utilService.getScholarshipList().subscribe(
      (res: SmScholarshipAnnouncement[]) => {
        this.listScholarship.push(...res);
      }
    );
    console.log(this.listScholarship)
  }

  autocompleteScholarship(event) {
    let query = event.query;
    this.scholarshipList = [];
    let objList: SmScholarshipAnnouncement[];
    objList = this.listScholarship;
    for (let obj of objList) {
      if (obj.scholarship_ref.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.scholarshipList.push(obj);
      }
    }
  }

  handleCompleteClickautocompleteScholarship(event) {
    let objList: SmScholarshipAnnouncement[];
    this.scholarshipList = [];
    objList = this.scholarshipList;

    setTimeout(() => {
      this.scholarshipList = this.listScholarship;
    }, 100)
  }


  addScholarship() {
    this.history = new ApScholarshipHistory();
    let historyList = [...this.historyList];
    historyList.push(this.history);
    this.historyList = historyList;
    this.applyScholarship.applyScholarshipForm.scholarship_seq.push(this.historyList.length)
  }

  deleteScholarship(obj: ApScholarshipHistory) {
    let index = this.historyList.indexOf(obj);
    this.historyList.splice(index,1);
  }

  addStdLoan() {
    this.stdLoan = new ApStudentLoanFund();
    let stdLoanList = [...this.stdLoanList];
    stdLoanList.push(this.stdLoan);
    this.stdLoanList = stdLoanList;
    // this.stdLoan.student_loan_seq.push(this.stdLoanList.length)
  }

  deleteStdLoan(obj: ApStudentLoanFund) {
    let index = this.stdLoanList.indexOf(obj);
    this.stdLoanList.splice(index,1);
  }

  addScholarshipHistory() {
    let objlist: ApScholarshipHistory[] = this.historyList;
    for(let obj of objlist) {
      this.applyScholarship.applyScholarshipForm.apScholarshipHistory = obj;
    }
  }

  addStudentLoan() {
    let objlist: ApStudentLoanFund[] = this.stdLoanList;
    for(let obj of objlist) {
      this.applyScholarship.applyScholarshipForm.apStudentLoanFund = obj;
    }
  }


  onNext() {
    this.addScholarshipHistory();
    this.addStudentLoan();
    this.applyScholarship.applyScholarshipForm.apApplication.annoucement_ref = this.applyScholarship.applyScholarshipForm.smScholarshipAnnouncement.announcement_ref;
    console.log('data = ' , this.applyScholarship.applyScholarshipForm);
    this.applyscholarshipService.nextIndex(2);
    this.applyScholarship.activeIndex = this.applyscholarshipService.getIndex();
  }

  onPrevious() {
      this.applyscholarshipService.nextIndex(0);
      this.applyScholarship.activeIndex = this.applyscholarshipService.getIndex();
  }
}
