import { ApplyScholarshipComponent } from './../apply-scholarship.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-info',
  templateUrl: './applicant-info.component.html',
  styleUrls: ['./applicant-info.component.css', '../../pages.component.css']
})
export class ApplicantInfoComponent implements OnInit {

  image: any;

  constructor(public applyScholarship: ApplyScholarshipComponent) { }

  ngOnInit() {
    this.image = '../../../../../assets/images/empty_profile.png';

  }

  next() {
    this.applyScholarship.onNext();
  }

}
