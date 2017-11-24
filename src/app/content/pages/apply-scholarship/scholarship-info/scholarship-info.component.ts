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
import { ScholarshipannouncementService } from '../../../../services/scholarshipannouncement.service';

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
  historyList: ApScholarshipHistory[] = [];
  history: ApScholarshipHistory;

  stdLoan: ApStudentLoanFund;
  stdLoanList: ApStudentLoanFund[] = [];

  scholarshipList: SmScholarshipAnnouncement[] = [];
  selectedScholarship: any;
  listScholarship: SmScholarshipAnnouncement[] = [];

  year: string;

  round: number;
  type: string;
  detail: string;
  gpax: string;
  sponsor: string;

  constructor(public applyScholarship: ApplyScholarshipComponent,
              private utilService: UtilsService,
              private applyscholarshipService: ApplyscholarshipService,
              private scholarshipAnnoucementService: ScholarshipannouncementService) {}

  ngOnInit() {

  }

  searchScholarshipAnnouncementFromYear() {
    this.listScholarship = []
    this.scholarshipList = []
    this.scholarshipAnnoucementService.searchScholarshipAnnouncementFromYear(this.year)
    .subscribe(
      (res: any[])=>{
        console.log(res)
        this.listScholarship.push(...res);
      })
  }

  getScholarshipHistory() {
    this.applyscholarshipService.getScholarshipHistory()
    .subscribe(
      (res: ApScholarshipHistory[]) => {
        for(let obj of res) {
          this.historyList.push(obj);
        }
      }
    );
   return this.applyScholarship.applyScholarshipForm;
  }

  getStdLoan() {
    this.applyscholarshipService.getStdLoan().subscribe(
      (res: ApStudentLoanFund[]) => {
        for(let obj of res) {
          this.stdLoanList.push(obj)
        }
      }
    );
   return this.applyScholarship.applyScholarshipForm;
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
      console.log(this.scholarshipList)
    }, 100)
  }

  selectedData(){
    this.selectedScholarship = this.applyScholarship.applyScholarshipForm.smScholarshipAnnouncement;
    this.sponsor = this.selectedScholarship.sponsors_name
    this.type = this.selectedScholarship.scholarship_type
    this.gpax = this.selectedScholarship.min_gpax
    this.round = this.selectedScholarship.round
    this.detail = this.selectedScholarship.detail
  }

  addScholarship() {
    this.history = new ApScholarshipHistory();
    let historyList = [...this.historyList];
    historyList.push(this.history);
    this.historyList = historyList;
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
  }

  deleteStdLoan(obj: ApStudentLoanFund) {
    let index = this.stdLoanList.indexOf(obj);
    this.stdLoanList.splice(index,1);
  }

  addScholarshipHistory() {
    this.applyscholarshipService.setscholarshipHistory(this.historyList);
  }

  addStudentLoan() {
    this.applyscholarshipService.setStudentLoanFundList(this.stdLoanList);
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
