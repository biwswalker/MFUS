import { DatePipe } from '@angular/common';
import { InterviewSelectionService } from './../../../services/interview-selection.service';
import { InterviewSelectionForm } from './../../form/interview-selection-form';
import { FormGroup,FormControl } from '@angular/forms';
import { CalendarModel } from './../../models/calendar-model';

import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { ScholarshipannouncementService } from './../../../services/scholarshipannouncement.service';

import { SelectItem } from 'primeng/primeng';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-interview-selection',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './interview-selection.component.html',
  styleUrls: ['./interview-selection.component.css','../pages.component.css']
})
export class InterviewSelectionComponent extends CalendarModel implements OnInit {

  thisForm: InterviewSelectionForm = new InterviewSelectionForm();
  thisFormGroup: FormGroup;
  scholarshipAnnounceList: any[] = [];
  listScholarshipAnnounce: any[] = [];
  scholarshipAnnouncement: any;
  applicationList: any[] = [];

  beginDate: Date;
  endDate: Date;
  constructor(private scholarshipannouncementService: ScholarshipannouncementService,
              private interviewSelectionService: InterviewSelectionService,
              public datepipe: DatePipe){
    super();
 }

  ngOnInit() {
    this.thisForm.year = (new Date()).getFullYear();
    this.setupScholarshipAnnounceList();
    this.validatorForm();
  }

  validatorForm() {
    this.thisFormGroup = new FormGroup({
      announce_year: new FormControl(this.thisForm.year),
      announce_scholarship: new FormControl(this.thisForm.announce_ref),
      start_interview_date: new FormControl(this.thisForm.interview_start_date),
      end_interview_date: new FormControl(this.thisForm.interview_end_date)}
    );
    }
  setupScholarshipAnnounceList(){
    this.listScholarshipAnnounce = [];

    this.listScholarshipAnnounce = this.scholarshipannouncementService.scholarshipAnnounceListonSearchPage(this.thisForm.year);
    console.log(this.listScholarshipAnnounce);
  }

  autocompleteScholarship(event) {
    console.log("autocompleteScholarship");
    let query = event.query;
    this.scholarshipAnnounceList = [];
    this.scholarshipAnnouncement = null;

    let objList: any[];
    objList = this.listScholarshipAnnounce;
    for (let obj of objList) {
      // Filter By string event
      if (obj.scholarship_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.scholarshipAnnounceList.push(obj);
      }
    }
  }

  handleCompleteClickScholarship() {
    console.log("handleCompleteClickScholarship");

      this.scholarshipAnnounceList = [];

      setTimeout(() => {
        this.scholarshipAnnounceList = this.listScholarshipAnnounce;
      }, 100);
    }



  onSearchButtonOnClick(){
    console.log("onSearchButtonOnClick");
    if(this.scholarshipAnnouncement != null){
      this.thisForm.announce_ref = this.scholarshipAnnouncement.announcement_ref;
    }

    this.interviewSelectionService.getInterviewSelectionList(this.thisForm).subscribe();
  }

  dateSelected($event,$seq){
    console.log('dateSelected');
    if($seq == 1){
      this.thisForm.interview_start_date = this.datepipe.transform($event, 'yyyy-MM-dd');
    }else{
      this.thisForm.interview_end_date = this.datepipe.transform($event, 'yyyy-MM-dd');
    }

  }
}
