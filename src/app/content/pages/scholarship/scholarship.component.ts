import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ScholarshipForm } from "./../../form/scholarship-form";
import { SmSponsors } from "./../../models/sm-sponsors";
import { ScholarshipService } from "./../../../services/scholarship.service";
import { AutoCompleteObjectModel } from "./../tag/autocomplete/autocomplete.component";
import { SelectItem, Message } from "primeng/primeng";
import { Component, OnInit } from "@angular/core";
import { Response } from "@angular/http";

@Component({
  selector: "app-scholarship",
  templateUrl: "./scholarship.component.html",
  styleUrls: ["./scholarship.component.css", "../pages.component.css"]
})
export class ScholarshipComponent implements OnInit {
  //primeng เช็คอิมพอทดีๆ
  //วาริเดเตอร์ เช็คinput
  //fromgroup ใช้รับจากหน้าจอเสอม  from เลยๆใช้ทำinit

  //mode
  mode: string = "S"; // I-insert, U-update, S-search
  //message
  msgs: Message[] = [];
  //insert
  scholarshipForm: ScholarshipForm = new ScholarshipForm();
  scholarshipFormGroup: FormGroup;

  //autocomplete
  sponsorsList: SmSponsors[] = [];
  sponsors: SmSponsors = new SmSponsors();

  // Dropdown List
  statusList: SelectItem[];

  constructor(private scholarshipService: ScholarshipService) {}

  ngOnInit() {
    //autocomplete
    this.sponsors = new SmSponsors();
    // this.getStatusList();
  }

  validatorEditForm() {
    this.scholarshipFormGroup = new FormGroup({
      scholarship_ref: new FormControl(
        this.scholarshipForm.smScholarship.scholarship_ref
      ),

      scholarship_name: new FormControl(
        this.scholarshipForm.smScholarship.scholarship_name,
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ),

      scholarship_type: new FormControl(
        this.scholarshipForm.smScholarship.scholarship_type
      ),

      detail: new FormControl(this.scholarshipForm.smScholarship.detail),

      unit: new FormControl(
        this.scholarshipForm.smScholarship.unit,
        Validators.compose([Validators.required, Validators.maxLength(10)])
      ),

      financial_aid: new FormControl(
        this.scholarshipForm.smScholarship.financial_aid,
        Validators.compose([Validators.required, Validators.maxLength(10)])
      ),

      active_flag: new FormControl(
        this.scholarshipForm.smScholarship.active_flag,
        Validators.required
      ),

      create_user: new FormControl(
        this.scholarshipForm.smScholarship.create_user
      ),

      update_user: new FormControl(
        this.scholarshipForm.smScholarship.update_user
      ),

      sponsors_ref: new FormControl(
        this.scholarshipForm.smScholarship.sponsors_ref,
        Validators.required
      )
    });

    if (this.mode == "I") {
      this.scholarshipFormGroup.controls["active_flag"].disable();
    } else if (this.mode == "U") {
      this.scholarshipFormGroup.controls["active_flag"].enable();
    }
  }

  onSubmit() {
    console.log(this.scholarshipFormGroup);
    console.log("onSubmit mode " + this.mode);
    if (this.mode == "I") {
      this.onAddScholarship();
    } else if (this.mode == "U") {
      // this.onUpdateScholarship();
    }
  }

  onAddScholarship() {
    console.log(this.scholarshipFormGroup.value);
    const value = this.scholarshipFormGroup.value;

    value.active_flag = "Y";
    value.sponsors_ref = this.sponsors.sponsors_ref;

    console.log(this.scholarshipFormGroup.value);

    //   this.scholarshipService.addScholarship(value)
    //   .subscribe(
    //     (res: Response) => {
    //       let major_ref = res.json().major_ref;
    //       console.log(res.json());
    //       console.log(res.json().major_ref);
    //       console.log(res.statusText);

    //       this.scholarshipFormGroup.reset();

    //      // this.initEditData();

    //       this.showSuccess('บันทึกข้อมูลเรียบร้อยแล้ว รหัสอ้างอิงคือ ' + scholarship_ref);

    //     },
    //     (error) => {
    //       console.log(error);
    //       let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
    //       if (error.status == 409) {
    //         message = 'มีการใช้รหัสสาขาวิชานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
    //       }
    //       this.showError(message);
    //       return;
    //     }
    //     );
    // }

    // onRowSelect(event) {
    // }

    // //dropdown
    // getStatusList() {
    //   this.statusList = [];
    //   this.statusList.push({ label: '', value: '' });
    //   this.statusList.push({ label: 'ใช้งาน', value: 'Y' });
    //   this.statusList.push({ label: 'ไม่ใช้งาน', value: 'N' });
    // }

    // autocompleteMethod(event) {
    //   let query = event.query;
    //   this.sponsorsList = [];
    //   let objList: SmSponsors[] = this.getSponsorsList()
    //   for (let obj of objList) {
    //     // Filter By string event
    //     if (obj.sponsors_name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //       this.sponsorsList.push(obj);
    //     }
    //   }
    // }
    // // On Click Autocomplete Dropdown Button
    // handleCompleteClick() {
    //   this.sponsorsList = [];
    //   //mimic remote call
    //   setTimeout(() => {
    //     this.sponsorsList = this.getSponsorsList();
    //   }, 100)
    //   }
    // */

    /*
  getSponsorsList(): SmSponsors[] {
    let results = []
    this.sponsorsService.getSponsors()
      .subscribe(
      result => {
        this.sponsorsList = result;
        results = result;
      }
      );
    return results;
  }


  //message
  showError(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'ไม่สามารถบันทึกข้อมูลได้', detail: message });
  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'บันทีกข้อมูลสำเร็จ', detail: message });
  }
  */
  }
}
