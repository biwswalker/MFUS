import { StudentForm } from './../../form/student-form';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { RftSchool } from '../../models/rft-school';
import { SchoolService } from '../../../services/school.service';
import { RftMajor } from '../../models/rft-major';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css', '../pages.component.css']
})
export class StudentComponent implements OnInit {

  titleList: SelectItem[];

  studentEditForm: StudentForm;

  schoolList: RftSchool[] = [];
  listSchool: RftSchool[] = [];

  majorList: RftMajor[] = [];
  listMajor: RftMajor[] = [];

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.getTitleList();
    this.initialEditForm();
    this.getSchoolList();
  }

  getTitleList() {
    this.titleList = [];
    this.titleList.push({ label:'นาย', value: '1'});
    this.titleList.push({ label:'นาง', value: '2'});
    this.titleList.push({ label:'นางสาว', value: '3'});
  }

  getSchoolList() {
    this.schoolService.getSchools()
    .subscribe(
      (res: RftSchool[]) => {
        this.listSchool.push(...res);
        console.log(this.schoolList);
      }
    );
  }

  //Begin Province Autocomplete Method // On key wording
  autocompleteSchool(event) {
    let query = event.query;
    this.schoolList = [];
    let objList: RftSchool[];
    objList = this.listSchool;
    for (let obj of objList) {
      // Filter By string event
        if (obj.school_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.schoolList.push(obj);
        }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClickSchool() {
    let objList: RftSchool[];
    objList = this.listSchool;
    for (let obj of objList) {
          this.schoolList.push(obj);
    }
    setTimeout(() => {
    }, 100)
  }
  initialEditForm() {
    this.studentEditForm = new StudentForm();
  }

  autocompleteMajor(event) {
    let query = event.query;
    this.majorList = [];
    let objList: RftMajor[];
    objList = this.listMajor;
    for (let obj of objList) {
      // Filter By string event
        if (obj.major_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.majorList.push(obj);
        }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClickMajor() {
    let objList: RftMajor[];
    objList = this.listMajor;
    for (let obj of objList) {
          this.majorList.push(obj);
    }
    setTimeout(() => {
    }, 100)
  }
}
