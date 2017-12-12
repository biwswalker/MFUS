import { ScholarshipService } from './../../../services/scholarship.service';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interviewees-selection',
  templateUrl: './interviewees-selection.component.html',
  styleUrls: ['./interviewees-selection.component.css','../pages.component.css']
})
export class IntervieweesSelectionComponent implements OnInit {
  scholarshipList: SelectItem[];
  constructor(private scholarshipService: ScholarshipService) { }

  ngOnInit() {
  }

}
