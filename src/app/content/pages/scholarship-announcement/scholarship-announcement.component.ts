import { MajorService } from './../../../services/major.service';
import { SchoolService } from './../../../services/school.service';
import { ScholarshipannouncementService } from './../../../services/scholarshipannouncement.service';
import { SponsorsService } from './../../../services/sponsors.service';
import { ScholarshipService } from './../../../services/scholarship.service';
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

  //mode
  mode: string = 'S'; // I-insert, U-update, S-search

  scholarshipAnnouncementList: SmScholarshipAnnouncement[] = [];
  scholarshipAnnouncements: SmScholarshipAnnouncement = new SmScholarshipAnnouncement();

  scholarships: SmScholarship = new SmScholarship();


  smSponsorsList: SmSponsors[] = [];
  schoolList: SmConditionSchool[] = [];
  majorList: SmConditionMajor[] = [];

   constructor(private scholarshipService: ScholarshipService,
               private sponsorsService: SponsorsService,
               private scholarshipannouncementService: ScholarshipannouncementService,
               private schoolService: SchoolService,
               private majorService: MajorService) { }

  ngOnInit() {
    this.getScholarshipAnnouncementList();
  }

   getScholarshipAnnouncementList(): SmScholarshipAnnouncement[] {
      let results = []
    this.scholarshipannouncementService.getScholarshipAnnouncementList()
     .subscribe(
       results => {
         this.scholarshipAnnouncementList = results;
         results = results;
       }
     );
    return results;
   }

    //changePage
    onPageSearch() {
      this.mode = 'S';
    }

    onPageDetail() {
      this.mode = 'I';
    }
  }
