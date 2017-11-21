import { RftSchool } from "./../../models/rft-school";
import { Response } from "@angular/http";
import { SchoolService } from "./../../../services/school.service";
import { SelectItem, Message } from "primeng/primeng";
import { SchoolForm } from "./../../form/school-form";
import { Component, OnInit, ViewChild } from "@angular/core";

import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-school",
  templateUrl: "./school.component.html",
  styleUrls: ["./school.component.css", "../pages.component.css"]
})
export class SchoolComponent implements OnInit {
  mode: string = "S"; // I-insert, U-update, S-search
  schoolFg: FormGroup;
  msgs: Message[] = [];

  schoolForm: SchoolForm = new SchoolForm();
  statusList: SelectItem[];

  //search
  schoolCriteriaForm: SchoolForm = new SchoolForm();
  schoolList: SchoolForm[] = [];
  selectSchool: SchoolForm = new SchoolForm();

  constructor(private schoolService: SchoolService) {}

  ngOnInit() {
    this.initEditData();
    this.initSearchData();
    //autocomplete
    this.schoolList = [];
  }

  initEditData() {
    this.schoolForm = new SchoolForm();
    this.schoolForm.rftSchool.active_flag = "Y";
    this.schoolForm.rftSchool.create_user = "poteii";
    this.schoolForm.rftSchool.update_user = "poteii";
    this.getStatusList();

    this.validatorEditForm();
  }

  getUser() {
    return "poteii";
  }

  validatorEditForm() {
    this.schoolFg = new FormGroup({
      school_code: new FormControl(
        this.schoolForm.rftSchool.school_code,
        Validators.compose([Validators.required, Validators.pattern("[0-9]+")])
      ),
      active_flag: new FormControl(
        this.schoolForm.rftSchool.active_flag,
        Validators.required
      ),
      school_name_t: new FormControl(
        this.schoolForm.rftSchool.school_name_t,
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ),
      school_name_e: new FormControl(this.schoolForm.rftSchool.school_name_e),
      create_user: new FormControl(this.schoolForm.rftSchool.create_user),
      update_user: new FormControl(this.schoolForm.rftSchool.update_user),
      school_ref: new FormControl(this.schoolForm.rftSchool.school_ref)
    });

    if (this.mode == "I") {
      this.schoolFg.controls["active_flag"].disable();
    } else if (this.mode == "U") {
      this.schoolFg.controls["active_flag"].enable();
    }
  }

  initSearchData() {
    this.schoolCriteriaForm = new SchoolForm();
    this.selectSchool = new SchoolForm();
    this.schoolList = [];
  }

  getStatusList() {
    this.statusList = [];
    this.statusList.push({ label: "", value: "" });
    this.statusList.push({ label: "ใช้งาน", value: "Y" });
    this.statusList.push({ label: "ไม่ใช้งาน", value: "N" });
  }

  onSubmit() {
    console.log("onSubmit mode " + this.mode);
    if (this.mode == "I") {
      this.onAddSchool();
    } else if (this.mode == "U") {
      this.onUpdateSchool();
    }
  }

  onAddSchool() {
    this.schoolFg.errors;
    if (this.schoolFg.valid) {
      console.log(this.schoolFg.value);
      const value = this.schoolFg.value;
      value.active_flag = "Y";
      this.schoolService.addSchool(value).subscribe(
        (res: Response) => {
          let school_ref = res.json().school_ref;
          console.log(res.json());
          console.log(res.json().school_ref);
          console.log(res.statusText);

          this.schoolFg.reset();

          this.initEditData();

          this.showSuccess(
            "บันทึกข้อมูลสำนักวิชาเรียบร้อยแล้ว รหัสอ้างอิงคือ " + school_ref
          );
        },
        error => {
          console.log(error);
          let message = "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง";
          if (error.status == 409) {
            message =
              "มีการใช้รหัสสำนักวิชานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง";
          }
          this.showError(message);
          return;
        }
      );
    }
  }

  onUpdateSchool() {
    console.log(this.schoolFg.value);
    const value = this.schoolFg.value;
    this.schoolService
      .updateSchool(value, this.schoolForm.rftSchool.school_ref)
      .subscribe(
        (res: Response) => {
          let school_ref = res.json().school_ref;
          console.log(res.statusText);

          this.schoolFg.reset();

          this.initEditData();

          this.showSuccess("แก้ไขข้อมูลสำนักวิชาเรียบร้อยแล้ว");
        },
        error => {
          console.log(error);
          let message = "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง";
          if (error.status == 409) {
            message =
              "มีการใช้รหัสสำนักวิชานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง";
          }
          this.showError(message);
          return;
        }
      );
  }

  onSearch() {
    this.schoolList = [];
    console.log(this.schoolCriteriaForm);
    this.searchSchool();
  }

  searchSchool(): SchoolForm[] {
    let resultList: SchoolForm[] = [];

    this.schoolService.searchSchool(this.schoolCriteriaForm).subscribe(
      result => {
        console.log(result.length);
        this.schoolList = result;
      },
      error => {
        console.log(error);
        this.showError(error);
      }
    );

    return resultList;
  }

  onRowSelect(event) {
    console.log(this.selectSchool);
    console.log(event.data);
    this.mode = "U";
    this.schoolForm = new SchoolForm();
    this.schoolForm = this.selectSchool;
    this.schoolForm.rftSchool.create_user = this.getUser();
    this.schoolForm.rftSchool.update_user = this.getUser();

    this.validatorEditForm();

    console.log(this.mode);
  }

  //changPage
  onPageSearch() {
    this.mode = "S";
    this.initSearchData();
  }

  onPageInsert() {
    this.mode = "I";
    this.initEditData();
  }

  onResetEdit() {
    console.log(this.selectSchool);
    console.log(this.mode);
    if (this.mode == "I") {
      this.initEditData();
    } else if (this.mode == "U") {
      this.schoolForm = new SchoolForm();
      this.schoolForm = this.selectSchool;
      this.validatorEditForm();
    }
  }

  onResetSearch() {
    this.initSearchData();
  }

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({
      severity: "error",
      summary: "ไม่สามารถบันทึกข้อมูลได้",
      detail: message
    });
  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({
      severity: "success",
      summary: "บันทีกข้อมูลสำเร็จ",
      detail: message
    });
  }
}
