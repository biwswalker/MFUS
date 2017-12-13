import { CalendarTh } from './../../models/calendar-th';
import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { ScholarshipannouncementService } from './../../../services/scholarshipannouncement.service';

import { SelectItem } from 'primeng/primeng';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-interviewees-selection',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './interviewees-selection.component.html',
  styleUrls: ['./interviewees-selection.component.css','../pages.component.css']
})
export class IntervieweesSelectionComponent extends CalendarTh implements OnInit {
  scholarshipAnnounceList: any[] = [];
  listScholarshipAnnounce: any[] = [];
  scholarshipAnnouncement: any;
  applicationList: any[] = [];
  criYear : number;
  constructor(private calendarTh: CalendarTh, private scholarshipannouncementService: ScholarshipannouncementService){
    super();
 }

  ngOnInit() {
    this.criYear = (new Date()).getFullYear();
    this.criYear = this.criYear;
    this.setupScholarshipAnnounceList();
  }

  setupScholarshipAnnounceList(){
    this.listScholarshipAnnounce = [];

    this.listScholarshipAnnounce = this.scholarshipannouncementService.scholarshipAnnounceListonSearchPage(this.criYear);
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

  //  // Autocomplete Selected
   selectScholarship() {
  //   console.log("selectProvince");
  //   if (index == 0) {
  //     // this.thisForm.homeProvince = new RftProvince();
  //     this.homeDistrict = new RftDistrict();
  //     this.homeSubDistrict = new RftSubDistrict();
  //     this.thisForm.acAddress.home_postcode = null;
  //     this.utilsService
  //       .getDistrictsByProvinceRef(this.homeProvince.province_ref)
  //       .subscribe((res: RftDistrict[]) => {
  //         this.homeListDistrict = [];
  //         this.homeListDistrict.push(...res);
  //       });
  //   }
  }

  onSearchButtonOnClick(){

  }
}
