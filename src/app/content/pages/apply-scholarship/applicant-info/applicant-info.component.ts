import { Validator } from 'codelyzer/walkerFactory/walkerFn';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { StudentService } from './../../../../services/student.service';
import { Response } from "@angular/http";
import { UtilsService } from "./../../../../services/utils.service";
import { ApplyscholarshipService } from "./../../../../services/applyscholarship.service";
import { SelectItem, Message } from "primeng/primeng";
import { ApplyScholarshipComponent } from "./../apply-scholarship.component";
import { Component, OnInit } from "@angular/core";
import { ApApplication } from '../../../models/ap-application';

@Component({
  selector: "app-applicant-info",
  templateUrl: "./applicant-info.component.html",
  styleUrls: ["./applicant-info.component.css", "../../pages.component.css"]
})
export class ApplicantInfoComponent implements OnInit {
  image: any;
  msgs: Message[];
  //ชั้นปี

  applicationInfoFormGroup: FormGroup;
  collageYears: SelectItem[];
  data: any;

  constructor(
    public applyScholarship: ApplyScholarshipComponent,
    private applyscholarshipService: ApplyscholarshipService,
    private studentService: StudentService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.image = "../../../../../assets/images/empty_profile.png";
    this.collageYears = [];
    this.collageYears.push({ label: "1", value: "1" });
    this.collageYears.push({ label: "2", value: "2" });
    this.collageYears.push({ label: "3", value: "3" });
    this.collageYears.push({ label: "4", value: "4" });
    this.collageYears.push({ label: "5", value: "5" });
    this.collageYears.push({ label: "6", value: "6" });
    this.applyScholarship.applyScholarshipForm.apApplication.collage_year = "1";
    this.validateForm();
  }

  getApplicationInfo(){
    const ref = this.applyScholarship.applyScholarshipForm.acStudent.student_ref;
    this.applyscholarshipService.getApplicationData(ref)
      .subscribe(()=>{})
  }

  validateForm(){
    this.applicationInfoFormGroup = new FormGroup({
      'collage_year': new FormControl(
        this.applyScholarship.applyScholarshipForm.apApplication.collage_year,
        Validators.compose([Validators.required])),
      'gpax': new FormControl(
        this.applyScholarship.applyScholarshipForm.apApplication.gpax,
        Validators.compose([Validators.required, Validators.pattern(/^(?:[0-9]+(?:\.[0-9]{0,2})?)?$/), Validators.max(4)])),
      'advisor_name': new FormControl(
        this.applyScholarship.applyScholarshipForm.apApplication.advisor_name,
        Validators.compose([Validators.required, Validators.pattern(/^[ก-๙]+(?:\.[a-zA-Z0-9-]+)*$/)])),
      'phone_no': new FormControl(
        this.applyScholarship.applyScholarshipForm.acStudent.phone_no,
        Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])),
      'email': new FormControl(
        this.applyScholarship.applyScholarshipForm.acStudent.email,
        Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])),
      'livelihood': new FormControl(
        this.applyScholarship.applyScholarshipForm.apApplication.livelihood,
        Validators.compose([Validators.required]))
    });
  }

  addApplicationInfo() {
    let form = this.applyScholarship.applyScholarshipForm;
    form.apApplication.student_ref = form.acStudent.student_ref;
    form.apApplication.create_user = "phai";
    form.apApplication.update_user = "phai";
  }

  onNext() {
    if (this.applicationInfoFormGroup.invalid) {
      this.applicationInfoFormGroup.controls["collage_year"].markAsDirty();
      this.applicationInfoFormGroup.controls["gpax"].markAsDirty();
      this.applicationInfoFormGroup.controls["advisor_name"].markAsDirty();
      this.applicationInfoFormGroup.controls["phone_no"].markAsDirty();
      this.applicationInfoFormGroup.controls["email"].markAsDirty();
      this.applicationInfoFormGroup.controls["livelihood"].markAsDirty();
      return;
    }
    this.addApplicationInfo();
    this.applyscholarshipService.nextIndex(1);
    this.applyScholarship.activeIndex = this.applyscholarshipService.getIndex();
  }
}
