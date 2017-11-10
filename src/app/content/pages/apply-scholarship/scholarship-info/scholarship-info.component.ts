import { ApplyScholarshipComponent } from './../apply-scholarship.component';
import { ApplyScholarshipForm } from './../../../form/apply-scholarshop-form';
//Begin 6/11/2017

import { StartupService } from "./../../../../services/startup.service";
import { ScholarshipService } from "../../../../services/scholarship.service";
import { SmScholarship } from "./../../../models/sm-scholarship";
import { Component, OnInit } from "@angular/core";
import { UtilsService } from "../../../../services/utils.service";
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';

@Component({
  selector: "app-scholarship-info",
  templateUrl: "./scholarship-info.component.html",
  styleUrls: [
    "./scholarship-info.component.css",
    "../../../pages/pages.component.css"
  ]
})
export class ScholarshipInfoComponent implements OnInit {

  scholarshipInfo: ApplyScholarshipForm;
  historyList: ApplyScholarshipForm[] = [];
  history: ApplyScholarshipForm;

  stdLoan: ApplyScholarshipForm;
  stdLoanList: ApplyScholarshipForm[] = [];

  scholarshipList: SmScholarshipAnnouncement[] = [];
  selectedScholarship: SmScholarshipAnnouncement;
  listScholarship: SmScholarshipAnnouncement[] = [];

  constructor(public applyScholarship: ApplyScholarshipComponent,
              private utilService: UtilsService) {}

  ngOnInit() {
    console.log(this.scholarshipList)
    this.getScholarshipAnnouncement();
    this.applyScholarship.applyScholarshipForm.apApplication.announcement_ref = this.applyScholarship.applyScholarshipForm.smScholarshipAnnouncement.announcement_ref;
    this.addScholarshipHistory();
  }

  getScholarshipAnnouncement() {
    this.utilService.getScholarshipList().subscribe(
      (res: SmScholarshipAnnouncement[]) => {
        this.listScholarship.push(...res);
      }
    );
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
    this.history = new ApplyScholarshipForm();
    let historyList = [...this.historyList];
    historyList.push(this.history);
    this.historyList = historyList;
    this.history.scholarship_seq.push(this.historyList.length)
  }

  deleteScholarship(obj: ApplyScholarshipForm) {
    let index = this.historyList.indexOf(obj);
    this.historyList.splice(index,1);
  }

  addStdLoan() {
    this.stdLoan = new ApplyScholarshipForm();
    let stdLoanList = [...this.stdLoanList];
    stdLoanList.push(this.stdLoan);
    this.stdLoanList = stdLoanList;
    this.stdLoan.student_loan_seq.push(this.stdLoanList.length)
  }

  deleteStdLoan(obj: ApplyScholarshipForm) {
    let index = this.stdLoanList.indexOf(obj);
    this.stdLoanList.splice(index,1);
  }

  addScholarshipHistory() {
    console.log(this.historyList)
    let objlist: ApplyScholarshipForm[] = this.historyList;
    for(let obj of objlist) {
      this.applyScholarship.applyScholarshipForm.apScholarshipHistory = obj.apScholarshipHistory;
    }
  }
}
