import { StudentService } from './../../../services/student.service';
import { SiblingService } from '../../../services/sibling.service';
import { AddressService } from './../../../services/address.service';
import { AcParent } from './../../models/ac-parent';
import { ParentService } from '../../../services/parent.service';
import { UtilsService } from './../../../services/utils.service';
import { Observer } from "rxjs/Observer";
import { Message } from "primeng/primeng";
import { ScholarshipService } from "../../../services/scholarship.service";
import { AcStudent } from "./../../models/ac-student";
import { ApplyScholarshipForm } from "./../../form/apply-scholarshop-form";
import { ApplyscholarshipService } from "./../../../services/applyscholarship.service";
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/primeng";
import { Observable } from "rxjs/Rx";
import { AcAddress } from '../../models/ac-address';
import { AcSibling } from '../../models/ac-sibling';

@Component({
  selector: "app-apply-scholarship",
  templateUrl: "./apply-scholarship.component.html",
  styleUrls: ["./apply-scholarship.component.css", "../pages.component.css"]
})
export class ApplyScholarshipComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;

  public applyScholarshipForm: ApplyScholarshipForm = new ApplyScholarshipForm();

  image: any;

  constructor(private applyscholarshipService: ApplyscholarshipService,
              private studentService: StudentService,
              private parentService: ParentService,
              private addressService: AddressService,
              private siblingService: SiblingService,
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
    new Observable ((observer: Observer<boolean>) => {
      setTimeout(() => {
        this.studentService.findStudentByRef('5a03e52ce518a').subscribe((res: ApplyScholarshipForm)=>{
          this.applyScholarshipForm.acStudent = res.acStudent;
          this.applyScholarshipForm.rftMajor = res.rftMajor;
          this.applyScholarshipForm.rftSchool = res.rftSchool;
          this.applyScholarshipForm.rftTitleName = res.rftTitleName;
            let birth_year = parseInt(
              this.applyScholarshipForm.acStudent.birth_date
                .toString()
                .substring(3, 7)
            );
            let current_year = new Date().getFullYear() + 543;
            this.applyScholarshipForm.age = current_year - birth_year;
          if(res){
            observer.next(true);
          }
        })
      }, 1000);
      setTimeout(() => {
      this.addressService.getAddressByStudentRef(this.applyScholarshipForm.acStudent.student_ref).subscribe((res: AcAddress)=>{
        this.applyScholarshipForm.acAddress = res;
      })
      }, 2000);
      setTimeout(() => {
        this.siblingService.getSiblingByStudentRef(this.applyScholarshipForm.acStudent.student_ref).subscribe((res: AcSibling[])=>{
          for(let obj of res) {
            this.applyScholarshipForm.acSibling = obj;
          }
        })
        }, 3000);
    }).subscribe()
  }

  getApplyScholarshipInfo() {
    this.applyscholarshipService.getApplyscholarshipData(
      this.applyScholarshipForm
    );
  }

  onNext() {
    this.activeIndex++;
    this.applyscholarshipService.nextIndex(this.activeIndex);
    this.activeIndex = this.applyscholarshipService.getIndex();
    this.applyScholarshipForm = this.applyscholarshipService.getData();
  }

  onPrevious() {
    this.activeIndex--;
    this.applyscholarshipService.nextIndex(this.activeIndex);
    this.activeIndex = this.applyscholarshipService.getIndex();
  }
}
