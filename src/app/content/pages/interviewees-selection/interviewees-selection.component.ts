import { ScholarshipannouncementService } from './../../../services/scholarshipannouncement.service';

import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interviewees-selection',
  templateUrl: './interviewees-selection.component.html',
  styleUrls: ['./interviewees-selection.component.css','../pages.component.css']
})
export class IntervieweesSelectionComponent implements OnInit {
  scholarshipAnnounceList: SelectItem[];
  criYear : number;
  constructor(private scholarshipannouncementService: ScholarshipannouncementService) { }

  ngOnInit() {
    this.criYear = (new Date()).getFullYear();
    console.log('year: '+this.criYear);
  }

}
