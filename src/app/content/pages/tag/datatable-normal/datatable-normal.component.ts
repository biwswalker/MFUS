import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable-normal',
  templateUrl: './datatable-normal.component.html',
  styleUrls: ['./datatable-normal.component.css', '../../pages.component.css']
})
export class DatatableNormalComponent implements OnInit {

  // Datatable
  studentFormList: StudentFormEx[] = [];
  selectedStudent: StudentFormEx = new StudentFormEx();

  constructor() { }

  ngOnInit() {
    this.studentFormList = [];
    this.studentFormList = this.getStudentList();
  }

  // DATATABLES
  getStudentList(): StudentFormEx[] {
    let studentListObj = [];
    let studentForm: StudentFormEx;
    for (let i = 1; i < 20; i++) {
      studentForm = new StudentFormEx();
      studentForm.student.studentRef = 'student' + i;
      studentForm.student.studentID = '605150100' + i;
      studentForm.student.studentFName = 'ชื่อจริง' + i;
      studentForm.student.studentLName = 'นามสกุล' + i;
      studentListObj.push(studentForm);
    }
    return studentListObj;
  }

  onRowSelect(event) {
    console.log('Selected Student : ' + this.selectedStudent.student.studentID);
  }
}

export class SchoolEx {
  public schoolRef: string;
  public schoolName: string;
}

export class StudentEx {
  public studentRef: string;
  public studentID: string;
  public studentFName: string;
  public studentLName: string;
}

export class StudentFormEx {
  public student: StudentEx;
  public school: SchoolEx;

  constructor() {
    this.student = new StudentEx();
    this.school = new SchoolEx();
  }
}
