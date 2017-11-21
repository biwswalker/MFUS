import { StudentService } from './../../../../services/student.service';
import { Response } from "@angular/http";
import { UtilsService } from "./../../../../services/utils.service";
import { ApplyscholarshipService } from "./../../../../services/applyscholarship.service";
import { SelectItem, Message } from "primeng/primeng";
import { ApplyScholarshipComponent } from "./../apply-scholarship.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-applicant-info",
  templateUrl: "./applicant-info.component.html",
  styleUrls: ["./applicant-info.component.css", "../../pages.component.css"]
})
export class ApplicantInfoComponent implements OnInit {
  image: any;
  msgs: Message[];
  //ชั้นปี
  collageYears: SelectItem[];
  data: any;

  constructor(
    public applyScholarship: ApplyScholarshipComponent,
    private applyscholarshipService: ApplyscholarshipService,
    private studentService: StudentService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    console.log(this.applyScholarship.applyScholarshipForm);
    this.image = "../../../../../assets/images/empty_profile.png";
    this.collageYears = [];
    this.collageYears.push({ label: "1", value: 1 });
    this.collageYears.push({ label: "2", value: 2 });
    this.collageYears.push({ label: "3", value: 3 });
    this.collageYears.push({ label: "4", value: 4 });
    this.collageYears.push({ label: "5", value: 5 });
    this.collageYears.push({ label: "6", value: 6 });
    // this.getAge();
  }

  getAge() {
    console.log(
      this.applyScholarship.applyScholarshipForm.acStudent.birth_date
    );
    let birth_year = parseInt(
      this.applyScholarship.applyScholarshipForm.acStudent.birth_date
        .toString()
        .substring(3, 7)
    );
    let current_year = new Date().getFullYear() + 543;
    this.applyScholarship.applyScholarshipForm.age = current_year - birth_year;
  }

  addApplicationInfo() {
    console.log(this.applyScholarship.applyScholarshipForm);
    let form = this.applyScholarship.applyScholarshipForm;
    form.apApplication.student_ref = form.acStudent.student_ref;
    form.apApplication.annoucement_ref = form.acStudent.student_ref;
    form.apApplication.create_user = "phai";
    form.apApplication.update_user = "phai";
  }

  onNext() {
    this.addApplicationInfo();
    console.log("Data: ", this.applyScholarship.applyScholarshipForm);
    this.applyscholarshipService.nextIndex(1);
    this.applyScholarship.activeIndex = this.applyscholarshipService.getIndex();
  }
}
