import { SmSponsors } from './../../models/sm-sponsors';
import { SmConditionMajor } from './../../models/sm-condition-major';
import { SmConditionSchool } from './../../models/sm-condition-school';
import { SmScholarship } from './../../models/sm-scholarship';
import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scholarship-announcement',
  templateUrl: './scholarship-announcement.component.html',
  styleUrls: ['./scholarship-announcement.component.css','../pages.component.css']
})
export class ScholarshipAnnouncementComponent implements OnInit {

  sholarshipAnnouncementList: SmScholarshipAnnouncement[] = [];
  scholarshipList: SmScholarship[] = [];
  sponsorsList: SmSponsors[] = [];
  schoolList: SmConditionSchool[] = [];
  majorList: SmConditionMajor[] = [];

   constructor() { }

  ngOnInit() {
    this.getScholarshipAnnouncementList();
    this.getScholarshipList();
    this.getSponsorsList();
    this.getSchoolList();
    this.getMajorList();
  }

  getScholarshipAnnouncementList() {}
  getScholarshipList() {}
  getSponsorsList() {}
  getSchoolList() {}
  getMajorList() {}

}
