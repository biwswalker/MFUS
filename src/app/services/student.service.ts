import { config } from './../app.config';
import { ApplyScholarshipForm } from './../content/form/apply-scholarshop-form';
import { Observable } from "rxjs/Rx";
import { AcStudent } from "./../content/models/ac-student";
import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { StudentForm } from "../content/form/student-form";
import "rxjs/add/operator/map";

@Injectable()
export class StudentService {

  mainUrl = config.backendUrl;

  applyScholarshipForm: ApplyScholarshipForm = new ApplyScholarshipForm();
  constructor(private http: Http) {}

  addStudent(form: AcStudent) {
    const url = this.mainUrl + "student";
    const body = JSON.stringify(form);
    const headers = new Headers({ "content-type": "application/json" });
    console.log(body);
    return this.http.post(url, body, { headers: headers });
  }

  findStudentByRef(ref: string): Observable<ApplyScholarshipForm> {
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .get(this.mainUrl + "student-info/" + ref, { headers: headers })
      .map((res: Response) => {
        console.log(res)
        this.applyScholarshipForm.acStudent = res.json().ac_student;
        this.applyScholarshipForm.rftTitleName = res.json().rft_titleName;
        this.applyScholarshipForm.rftMajor = res.json().rft_major;
        this.applyScholarshipForm.rftSchool = res.json().rft_school;
        console.log(this.applyScholarshipForm)
        return this.applyScholarshipForm;
      });
  }
}
