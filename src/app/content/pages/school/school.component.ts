import { RftSchool } from './../../models/rft-school';
import { Response } from '@angular/http';
import { SchoolService } from './../../../services/school.service';
import { SelectItem, Message } from 'primeng/primeng';
import { SchoolForm } from './../../form/school-form';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css', '../pages.component.css']
})
export class SchoolComponent implements OnInit {

  mode: string = 'S'; // I-insert, U-update, S-search
  schoolFg: FormGroup;
  msgs: Message[] = [];

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
    this.initSearchData();
    //autocomplete
    this.schoolList = [];
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
    this.schoolForm.rftSchool.create_user = 'poteii'
    this.schoolForm.rftSchool.update_user = 'poteii'
    this.getStatusList();

    this.validatorEditForm();


  }

  validatorEditForm() {
    this.schoolFg = new FormGroup({
      'school_code': new FormControl(this.schoolForm.rftSchool.school_code,
        Validators.compose([Validators.required, Validators.pattern('[0-9]+')])),
      'active_flag': new FormControl(this.schoolForm.rftSchool.active_flag, Validators.required ),
      'school_name_t': new FormControl(this.schoolForm.rftSchool.school_name_t,
        Validators.compose([Validators.required, Validators.maxLength(50)])),
      'school_name_e': new FormControl(this.schoolForm.rftSchool.school_name_e),
      'create_user': new FormControl(this.schoolForm.rftSchool.create_user),
      'update_user': new FormControl(this.schoolForm.rftSchool.update_user)
    });

    if(this.mode == 'I') {
      this.schoolFg.controls['active_flag'].disable();
    }
  }

  initSearchData() {
    this.schoolCriteriaForm = new SchoolForm();
    this.selectSchool = new SchoolForm();
    this.schoolList = [];
    this.rftSchoolList = [];
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
          console.log(this.rftSchools);
        }
      );
      console.log(results);
      return results;
  }

  onAddSchool() {

    console.log(this.schoolFg.value);
    const value = this.schoolFg.value;
    value.active_flag = 'Y';
    this.schoolService.addSchool(value)
    .subscribe(
      (res: Response) => {
        let school_ref = res.json().school_ref;
        console.log(res.json());
        console.log(res.json().school_ref);
        console.log(res.statusText);

        this.schoolFg.reset()

        this.initEditData();

        this.showSuccess('บันทึกข้อมูลสำนักวิชาเรียบร้อยแล้ว รหัสอ้างอิงคือ' + school_ref);

      },
      (error) =>{
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if(error.status == 409) {
          message = 'มีการใช้รหัสสำนักวิชานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );

  }

  onSearch() {
    this.schoolList = [];
    this.rftSchoolList = [];
    console.log(this.schoolCriteriaForm);
    this.searchSchool();

  }

  searchSchool(): SchoolForm[] {
    let resultList: SchoolForm[] = [];
    this.schoolService.searchSchool(this.schoolCriteriaForm)
    .subscribe(
      result => {
        this.rftSchoolList = result;
        let schoolForm : SchoolForm;
        console.log('1.length = ' + result.length);
        for(let data of result){
          schoolForm = new SchoolForm();
          console.log('data = ' + data.school_code);
          schoolForm.rftSchool = data;
          console.log('schoolForm.rftSchool = ' + schoolForm.rftSchool.school_code);
          this.schoolList.push(schoolForm);
        }
        console.log('3.this.schoolList = ' + this.schoolList.length);
      },
      (error) =>{
        console.log(error);
        this.showError(error);
      }
    );

    return resultList;
  }

  //changPage
  onPageSearch() {
    this.mode = 'S';
  }

  onPageInsert() {
    this.mode = 'I';
    this.initEditData();
  }

  onResetEdit(){
    this.initEditData();
  }

  onResetSearch() {
    this.initSearchData();
  }

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'ไม่สามารถบันทึกข้อมูลได้', detail: message});
  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'บันทีกข้อมูลสำเร็จ', detail: message});
  }


}
