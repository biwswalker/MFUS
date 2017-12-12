
import { Validators } from '@angular/forms';
import { ApStudentLoanFund } from '../../../models/ap-student-loan-fund';
import { ApplyScholarshipComponent } from './../apply-scholarship.component';
import { ApplyScholarshipForm } from './../../../form/apply-scholarshop-form';
//Begin 6/11/2017

import { StartupService } from "./../../../../services/startup.service";
import { ScholarshipService } from "../../../../services/scholarship.service";
import { SmScholarship } from "./../../../models/sm-scholarship";
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UtilsService } from "../../../../services/utils.service";
import { SmScholarshipAnnouncement } from '../../../models/sm-scholarship-announcement';
import { ApplicantInfoComponent } from '../applicant-info/applicant-info.component';
import { ApplyscholarshipService } from '../../../../services/applyscholarship.service';
import { ApScholarshipHistory } from '../../../models/ap-scholarship-history';
import { ScholarshipannouncementService } from '../../../../services/scholarshipannouncement.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: "app-scholarship-info",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./scholarship-info.component.html",
  styleUrls: [
    "../apply-scholarship.component.css",
    "../../../pages/pages.component.css"
  ]
})
export class ScholarshipInfoComponent implements OnInit {

  scholarShipLisForm: FormGroup;
  studentLoanFormControl: FormGroup[] = [];
  scholarshipInfoForm: FormGroup;
  history: ApScholarshipHistory;

  newList: boolean = false;
  stdLoan: ApStudentLoanFund;

  scholarshipList: SmScholarshipAnnouncement[] = [];
  selectedScholarship: any;
  listScholarship: SmScholarshipAnnouncement[] = [];

  constructor(public applyScholarship: ApplyScholarshipComponent,
    private utilService: UtilsService,
    private applyscholarshipService: ApplyscholarshipService,
    private scholarshipAnnoucementService: ScholarshipannouncementService) { }

  ngOnInit() {
    this.validationForm();
  }

  validationForm() {
    this.scholarshipInfoForm = new FormGroup({
      'year': new FormControl(
        this.applyScholarship.applyScholarshipForm.year,
        Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])),
      'scholarship_announcement_name': new FormControl(
        this.applyScholarship.applyScholarshipForm.smScholarshipAnnouncement,
        Validators.compose([Validators.required])),
      'money_spend_plan': new FormControl(
        this.applyScholarship.applyScholarshipForm.apApplication.money_spend_plan,
        Validators.compose([Validators.required])),
    })
  }

  searchScholarshipAnnouncementFromYear() {
    this.listScholarship = []
    this.scholarshipList = []
    this.scholarshipAnnoucementService.searchScholarshipAnnouncementFromYear(this.applyScholarship.applyScholarshipForm.year)
      .subscribe(
      (res: any[]) => {
        console.log(res)
        this.listScholarship.push(...res);
      })
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

  selectedData() {
    this.selectedScholarship = this.applyScholarship.applyScholarshipForm.smScholarshipAnnouncement;
    this.applyScholarship.applyScholarshipForm.smSponsors.sponsors_name = this.selectedScholarship.sponsors_name
    this.applyScholarship.applyScholarshipForm.smScholarship.scholarship_type = this.selectedScholarship.scholarship_type
    this.applyScholarship.applyScholarshipForm.smScholarshipAnnouncement.min_gpax = this.selectedScholarship.min_gpax
    this.applyScholarship.applyScholarshipForm.smScholarshipAnnouncement.round = this.selectedScholarship.round
    this.applyScholarship.applyScholarshipForm.smScholarship.detail = this.selectedScholarship.detail
  }

  addScholarship() {
    this.validateScholarshipList();
    if (this.newList) {
      this.history = new ApScholarshipHistory();
      let historyList = [...this.applyScholarship.applyScholarshipForm.scholarshipHistoryList];
      historyList.push(this.history);
      this.applyScholarship.applyScholarshipForm.scholarshipHistoryList = historyList;
    }
  }

  validateScholarshipList() {
    this.newList = true;
    for (let obj of this.applyScholarship.applyScholarshipForm.scholarshipHistoryList) {
      if (obj.scholarship_name == "" || obj.scholarship_name == undefined) {
        this.newList = false;
      }
      if (obj.year == "" || obj.year == undefined) {
        this.newList = false;
      }
      if (obj.money_amount == null) {
        this.newList = false;
      }
    }
  }

  deleteScholarship(obj: ApScholarshipHistory) {
    let index = this.applyScholarship.applyScholarshipForm.scholarshipHistoryList.indexOf(obj);
    this.applyScholarship.applyScholarshipForm.scholarshipHistoryList.splice(index, 1);
  }

  addStdLoan() {
    this.validateStudentLoanList();
    if (this.newList) {
      this.stdLoan = new ApStudentLoanFund();
      let stdLoanList = [...this.applyScholarship.applyScholarshipForm.studentLoanFundList];
      stdLoanList.push(this.stdLoan);
      this.applyScholarship.applyScholarshipForm.studentLoanFundList = stdLoanList;
    }
  }

  validateStudentLoanList() {
    this.newList = true;
    for (let obj of this.applyScholarship.applyScholarshipForm.studentLoanFundList) {
      if (obj.year == "" || obj.year == undefined) {
        this.newList = false;
      }
      if (obj.money_amount == null) {
        this.newList = false;
      }
    }
  }

  deleteStdLoan(obj: ApStudentLoanFund) {
    let index = this.applyScholarship.applyScholarshipForm.studentLoanFundList.indexOf(obj);
    this.applyScholarship.applyScholarshipForm.studentLoanFundList.splice(index, 1);
  }

  onNext() {
    if (this.scholarshipInfoForm.invalid) {
      this.scholarshipInfoForm.controls["year"].markAsDirty();
      // this.scholarshipInfoForm.controls["scholarship_name"].markAsDirty();
      this.scholarshipInfoForm.controls["money_spend_plan"].markAsDirty();
      return;
    }
      this.applyScholarship.applyScholarshipForm.apApplication.annoucement_ref = this.applyScholarship.applyScholarshipForm.smScholarshipAnnouncement.announcement_ref;
      console.log('data = ', this.applyScholarship.applyScholarshipForm);
      this.applyscholarshipService.nextIndex(2);
      this.applyScholarship.activeIndex = this.applyscholarshipService.getIndex();
  }

  onPrevious() {
    this.applyscholarshipService.nextIndex(0);
    this.applyScholarship.activeIndex = this.applyscholarshipService.getIndex();
  }
}
