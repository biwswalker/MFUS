import { AcStudent } from './../../models/ac-student';
import { AcSibling } from './../../models/ac-sibling';
import { ApplyScholarshipForm } from './../../form/apply-scholarshop-form';
import { ApplyscholarshipService } from './../../../services/applyscholarship.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-apply-scholarship',
  templateUrl: './apply-scholarship.component.html',
  styleUrls: ['./apply-scholarship.component.css', '../pages.component.css']
})
export class ApplyScholarshipComponent implements OnInit {

  items: MenuItem[];
  activeIndex: number = 0;
  public applyScholarshipForm: ApplyScholarshipForm = new ApplyScholarshipForm();

  constructor(private applyscholarshipService: ApplyscholarshipService) { }

  ngOnInit() {

    this.items = [
      {
        label: 'ข้อมูลผู้ขอทุน',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'ข้อมูลทุนการศึกษา',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'ข้อมูลสถานะทางการเงินของครอบครัว',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'ข้อมูลครอบครัวและที่อยู่',
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
      {
        label: 'ข้อมูลเอกสาร/หลักฐาน',
        command: (event: any) => {
          this.activeIndex = 4;
        }
      }
    ];
  }


  onNext(index) {
    this.applyscholarshipService.nextIndex(index);
    this.activeIndex = this.applyscholarshipService.getIndex();
  //  this.applyScholarshipForm = this.applyscholarshipService.getData();
    console.log('activeIndex = ' + this.activeIndex);
    console.log('data = ' + this.applyScholarshipForm);
  }

}
