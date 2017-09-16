import { RftSchool } from './../../models/rft-school';
import { Response } from '@angular/http';
import { SchoolService } from './../../../services/school.service';
import { SelectItem } from 'primeng/primeng';
import { SchoolForm } from './../../form/school-form';
import { Component, OnInit } from '@angular/core';

import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css', '../pages.component.css']
})
export class SchoolComponent implements OnInit {

  schoolForm: SchoolForm = new SchoolForm();
  statusList: SelectItem[];

  //search
  schoolCriteriaForm: SchoolForm = new SchoolForm();
  schoolList: SchoolForm[] = [];
  rftSchoolList : RftSchool[] = [];
  selectSchool: SchoolForm = new SchoolForm();

  //autocomplete
  rftSchools: RftSchool[] = [];
  rftSchool: RftSchool = new RftSchool();

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.initEditData();
    this.schoolCriteriaForm = new SchoolForm();
    this.schoolList = [];
    this.selectSchool = new SchoolForm();
  //  this.getSchoolList();

  }

  // Autocomplete Method // On key wording
  autocompleteMethod(event) {
    let query = event.query;
    this.rftSchools = [];
    let objList: RftSchool[] = this.getSchoolList()
    for (let obj of objList) {
      // Filter By string event
      if (obj.school_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.rftSchools.push(obj);
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClick() {
    this.rftSchools = [];
    //mimic remote call
    setTimeout(() => {
      this.rftSchools = this.getSchoolList();
    }, 100)
  }

  initEditData() {
    this.schoolForm = new SchoolForm();
    this.schoolForm.rftSchool.active_flag = 'Y';
    this.getStatusList();
  }


  getStatusList() {
    this.statusList = [];
    this.statusList.push({ label: '', value: '' });
    this.statusList.push({ label: 'ใช้งาน', value: 'Y' });
    this.statusList.push({ label: 'ไม่ใช้งาน', value: 'N' });
  }

  getSchoolList(): RftSchool[] {
    let results = []
    this.schoolService.getSchools()
      .subscribe(
        result => {
          console.log(result);
          this.rftSchools = result;
          results = result;
          for(let data of result){
            console.log(data);
            console.log(data.school_ref);
            console.log(data.school_name_t);
          }
          console.log(this.rftSchools);
        }
      );
      console.log(results);
      return results;
  }

  onAddSchool(form: NgForm) {
    console.log(form.value);
    form.value.active_flag = this.schoolForm.rftSchool.active_flag;
    this.schoolService.addSchool(form.value)
    .subscribe(
      (res: Response) => {
        console.log(res.json());
      },
      (error) => console.log(error)
    );
    form.reset()
  }

  onSearch() {
    this.schoolList = [];
    this.rftSchoolList = [];
    console.log(this.schoolCriteriaForm);
    this.schoolService.searchSchool(this.schoolCriteriaForm)
    .subscribe(
      result => {
        let schoolForm : SchoolForm = new SchoolForm();
        this.rftSchoolList = result;
        for(let data of result){
          schoolForm = new SchoolForm();
          schoolForm.rftSchool = data;
          console.log(schoolForm.rftSchool);
          console.log(schoolForm.rftSchool.school_name_t);
          this.schoolList.push(schoolForm);
        }

        console.log(this.schoolList.length);
        for(let data of this.schoolList){
          console.log(data);
        }
      },
      (error) => console.log(error)
    );
  }

}
