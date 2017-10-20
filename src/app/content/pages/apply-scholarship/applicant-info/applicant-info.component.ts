import { ApplyscholarshipService } from './../../../../services/applyscholarship.service';
import { SelectItem } from 'primeng/primeng';
import { ApplyScholarshipComponent } from './../apply-scholarship.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-info',
  templateUrl: './applicant-info.component.html',
  styleUrls: ['./applicant-info.component.css', '../../pages.component.css']
})
export class ApplicantInfoComponent implements OnInit {

  image: any;

  //ชั้นปี
  collageYears: SelectItem[];
  data: any;

  constructor(public applyScholarship: ApplyScholarshipComponent,
              private applyscholarshipService: ApplyscholarshipService) { }

  ngOnInit() {
    this.image = '../../../../../assets/images/empty_profile.png';
    this.collageYears = [];
    this.collageYears.push({label: '1',value: 1 });
    this.collageYears.push({label: '2',value: 2 });
    this.collageYears.push({label: '3',value: 3 });
    this.collageYears.push({label: '4',value: 4 });

  //  this.data =
    this.applyscholarshipService.getStudentInfo('1').subscribe(
      (result) => {
        console.log(result.acStudent);
        this.applyScholarship.applyScholarshipForm.acStudent = result.acStudent;
        this.applyScholarship.applyScholarshipForm.rftTitleName = result.rftTitleName;
        this.applyScholarship.applyScholarshipForm.rftSchool = result.rftSchool;
        this.applyScholarship.applyScholarshipForm.rftMajor = result.rftMajor;
      }
    );

  }

  next() {
    this.applyScholarship.onNext();
  }

}
