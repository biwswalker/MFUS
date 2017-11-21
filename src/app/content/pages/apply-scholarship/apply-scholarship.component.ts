import { UtilsService } from './../../../services/utils.service';
import { Observer } from "rxjs/Rx";
import { FamilyAndAddressForm } from "./../../form/family-and-address-form";
import { Message } from "primeng/primeng";
import { ScholarshipService } from "../../../services/scholarship.service";
import { AcStudent } from "./../../models/ac-student";
import { AcSibling } from "./../../models/ac-sibling";
import { ApplyScholarshipForm } from "./../../form/apply-scholarshop-form";
import { ApplyscholarshipService } from "./../../../services/applyscholarship.service";
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/primeng";
import { Observable } from "rxjs/Observable";
import { SmScholarshipAnnouncement } from '../../models/sm-scholarship-announcement';

@Component({
  selector: "app-apply-scholarship",
  templateUrl: "./apply-scholarship.component.html",
  styleUrls: ["./apply-scholarship.component.css", "../pages.component.css"]
})
export class ApplyScholarshipComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;

  listScholarship: SmScholarshipAnnouncement[] = [];

  public applyScholarshipForm: ApplyScholarshipForm = new ApplyScholarshipForm();

  image: any;

  constructor(private applyscholarshipService: ApplyscholarshipService,
              private utilService: UtilsService) {}

  ngOnInit() {
    this.items = [
      {
        label: "ข้อมูลผู้ขอทุน",
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: "ข้อมูลทุนการศึกษา",
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: "ข้อมูลสถานะทางการเงินของครอบครัว",
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: "ข้อมูลครอบครัวและที่อยู่",
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
      {
        label: "ข้อมูลเอกสาร/หลักฐาน",
        command: (event: any) => {
          this.activeIndex = 4;
        }
      }
    ];

    this.getApplyScholarshipInformation();
  }

  getApplyScholarshipInformation() {
    console.log('get Data');
    new Observable ((observer: Observer<boolean>) => {
      setTimeout(() => {
        this.applyscholarshipService.getStudentInfo('1').subscribe((res: ApplyScholarshipForm)=>{
          console.log(res)
          this.applyScholarshipForm.acStudent = res.acStudent;
          console.log(this.applyScholarshipForm.acStudent)
          if(res){
            observer.next(true);
          }
        })
      }, 1000);
      setTimeout(() => {

      }, 2000);
    }).subscribe()
  }


  getAge() {
    let birth_year = parseInt(
      this.applyScholarshipForm.acStudent.birth_date.toString().substring(3, 7)
    );
    let current_year = new Date().getFullYear() + 543;
    this.applyScholarshipForm.age = current_year - birth_year;
  }

  getApplyScholarshipInfo() {
    console.log(this.applyScholarshipForm);
    this.applyscholarshipService.getApplyscholarshipData(
      this.applyScholarshipForm
    );
  }

  onNext() {
    this.activeIndex++;
    this.applyscholarshipService.nextIndex(this.activeIndex);
    this.activeIndex = this.applyscholarshipService.getIndex();
    this.applyScholarshipForm = this.applyscholarshipService.getData();
    console.log("activeIndex = " + this.activeIndex);
    console.log("data = ", this.applyScholarshipForm);
  }

  onPrevious() {
    this.activeIndex--;
    this.applyscholarshipService.nextIndex(this.activeIndex);
    this.activeIndex = this.applyscholarshipService.getIndex();
    //  this.applyScholarshipForm = this.applyscholarshipService.getData();
    console.log("activeIndex = " + this.activeIndex);
    console.log("data = ", this.applyScholarshipForm);
  }
}
