import { config } from './../app.config';
import { ApplyScholarshipForm } from './../content/form/apply-scholarshop-form';
import { Observable } from "rxjs/Rx";
import { AcStudent } from "./../content/models/ac-student";
import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { StudentForm } from "../content/form/student-form";
import "rxjs/add/operator/map";
import { UtilsService } from './utils.service';

@Injectable()
export class StudentService {

  mainUrl = config.backendUrl;

  applyScholarshipForm: ApplyScholarshipForm = new ApplyScholarshipForm();
  constructor(private http: Http,
              private utilsService: UtilsService) {}

  addStudent(form: AcStudent) {
    const url = this.mainUrl + "student";
    const body = JSON.stringify(form);
    const headers = new Headers({ "content-type": "application/json" });
    return this.http.post(url, body, { headers: headers });
  }

  findStudentByRef(ref: string): Observable<ApplyScholarshipForm> {
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .get(this.mainUrl + "student-info/" + ref, { headers: headers })
      .map((res: Response) => {
        this.applyScholarshipForm.acStudent = res.json().ac_student;
        this.applyScholarshipForm.rftTitleName = res.json().rft_title;
        this.applyScholarshipForm.rftMajor = res.json().rft_major;
        this.applyScholarshipForm.rftSchool = res.json().rft_school;
        if(this.applyScholarshipForm.acStudent.gender == "M") {
          this.applyScholarshipForm.acStudent.gender = "ชาย";
        }else{
          this.applyScholarshipForm.acStudent.gender = "หญิง"
        }
        this.applyScholarshipForm.acStudent.birth_date = this.utilsService.displayDate(this.applyScholarshipForm.acStudent.birth_date);
        this.applyScholarshipForm.age = this.utilsService.getAge(this.applyScholarshipForm.acStudent.birth_date);
        return this.applyScholarshipForm;
      });
  }
}
