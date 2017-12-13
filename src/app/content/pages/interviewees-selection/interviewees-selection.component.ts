import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { ScholarshipannouncementService } from './../../../services/scholarshipannouncement.service';

import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interviewees-selection',
  templateUrl: './interviewees-selection.component.html',
  styleUrls: ['./interviewees-selection.component.css','../pages.component.css']
})
export class IntervieweesSelectionComponent implements OnInit {
  scholarshipAnnounceList: SmScholarshipAnnouncement[];
  criYear : number;
  constructor(private scholarshipannouncementService: ScholarshipannouncementService) { }

  ngOnInit() {
    this.criYear = (new Date()).getFullYear();
    console.log('year: '+this.criYear);
    this.scholarshipannouncementService.searchScholarshipAnnouncementFromYear(this.criYear.toString()).subscribe(
      (res: SmScholarshipAnnouncement[]) =>{
        this.scholarshipAnnounceList.push(...res);
      }
    );
  }

}
