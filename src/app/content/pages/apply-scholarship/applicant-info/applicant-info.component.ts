import { Response } from "@angular/http";
import { UtilsService } from "./../../../../services/utils.service";
import { ApplyscholarshipService } from "./../../../../services/applyscholarship.service";
import { SelectItem } from "primeng/primeng";
import { ApplyScholarshipComponent } from "./../apply-scholarship.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-applicant-info",
  templateUrl: "./applicant-info.component.html",
  styleUrls: ["./applicant-info.component.css", "../../pages.component.css"]
})
export class ApplicantInfoComponent implements OnInit {
  image: any;

  //ชั้นปี
  collageYears: SelectItem[];
  data: any;

  constructor(
    public applyScholarship: ApplyScholarshipComponent,
    private applyscholarshipService: ApplyscholarshipService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.image = "../../../../../assets/images/empty_profile.png";
    this.collageYears = [];
    this.collageYears.push({ label: "1", value: 1 });
    this.collageYears.push({ label: "2", value: 2 });
    this.collageYears.push({ label: "3", value: 3 });
    this.collageYears.push({ label: "4", value: 4 });
    this.collageYears.push({ label: "5", value: 5 });
    this.collageYears.push({ label: "6", value: 6 });

    //  this.data =
    this.applyscholarshipService.getStudentInfo("1").subscribe(result => {
      console.log(result.acStudent);
      this.applyScholarship.applyScholarshipForm.acStudent = result.acStudent;
      this.applyScholarship.applyScholarshipForm.rftTitleName = result.rftTitleName;
      this.applyScholarship.applyScholarshipForm.rftSchool = result.rftSchool;
      this.applyScholarship.applyScholarshipForm.rftMajor = result.rftMajor;
      this.image = this.applyScholarship.applyScholarshipForm.acStudent.profile_image;
      this.getAge();
    });
  }

  displayBirthDate(){

  }

  getAge() {
    let birth_year = parseInt(
      this.applyScholarship.applyScholarshipForm.acStudent.birth_date
        .toString()
        .substring(3, 7)
    );
    let current_year = new Date().getFullYear() + 543;
    console.log(birth_year);
    console.log(current_year);
    this.applyScholarship.applyScholarshipForm.age = current_year - birth_year;
  }

  addApplicationInfo() {
    let form = this.applyScholarship.applyScholarshipForm;
    form.apApplication.student_ref = form.acStudent.student_ref;
    form.apApplication.annoucement_ref = "asdfasdfadsf";
    form.apApplication.application_code = "5555";
    form.apApplication.create_user = "phai";
    form.apApplication.update_user = "phai";
  }

  onNext() {
    this.addApplicationInfo();
        console.log("Data: ", this.applyScholarship.applyScholarshipForm.apApplication);
        this.applyscholarshipService.nextIndex(1);
        this.applyScholarship.activeIndex = this.applyscholarshipService.getIndex();
  }
}
