import { RftMajor } from './../../models/rft-major';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { MajorService } from './../../../services/major.service';
import { SchoolService } from './../../../services/school.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { RftSchool } from './../../models/rft-school';
import { Message, SelectItem } from 'primeng/primeng';
import { FormGroup } from '@angular/forms';
import { MajorForm } from './../../form/major-form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css', '../pages.component.css']
})
export class MajorComponent implements OnInit {

  //mode
  mode: string = 'S'; // I-insert, U-update, S-search
  //message
  msgs: Message[] = [];

  //insert
  majorForm: MajorForm = new MajorForm();
  majorFormGroup: FormGroup;

  //search
  majorCriteriaForm: MajorForm = new MajorForm();
  //for datatable
  majorFormList: MajorForm[] = [];
  selectMajor: MajorForm = new MajorForm();

  //autocomplete
  rftSchools: RftSchool[] = [];
  rftSchool: RftSchool = new RftSchool();

  //dropdown
  statusList: SelectItem[];


  constructor(private schoolService: SchoolService,
              private majorService: MajorService) { }

  ngOnInit() {
    this.initEditData();
    this.initSearchData();

    //autocomplete
    this.rftSchool = new RftSchool();
    this.getStatusList();
  }

  initEditData() {
    this.majorForm = new MajorForm();
    this.majorForm.rftMajor.active_flag = 'Y';
    this.majorForm.rftMajor.create_user = this.getUser();
    this.majorForm.rftMajor.update_user = this.getUser();

    this.validatorEditForm();

  }

  getUser() {
    return 'poteii';
  }

  validatorEditForm() {
    this.majorFormGroup = new FormGroup({
      'major_ref': new FormControl(this.majorForm.rftMajor.major_ref),

      'major_code': new FormControl(this.majorForm.rftMajor.major_code,
        Validators.compose([Validators.required, Validators.pattern('[0-9]+')])),

      'active_flag': new FormControl(this.majorForm.rftMajor.active_flag, Validators.required ),

      'major_name_t': new FormControl(this.majorForm.rftMajor.major_name_t,
        Validators.compose([Validators.required, Validators.maxLength(50)])),

      'major_name_e': new FormControl(this.majorForm.rftMajor.major_name_e),

      'create_user': new FormControl(this.majorForm.rftMajor.create_user),

      'update_user': new FormControl(this.majorForm.rftMajor.update_user),

      'school_ref': new FormControl(this.majorForm.rftMajor.school_ref, Validators.required)
    });

    if(this.mode == 'I') {
      this.majorFormGroup.controls['active_flag'].disable();
    }else if (this.mode == 'U') {
      this.majorFormGroup.controls['active_flag'].enable();
    }
  }

  initSearchData() {
     this.majorCriteriaForm = new MajorForm();
     this.selectMajor = new MajorForm();
     this.majorFormList = [];
  }


  onSubmit() {
    console.log(this.majorFormGroup);
    console.log('onSubmit mode ' + this.mode)
    if (this.mode == 'I') {
      this.onAddMajor();
    }else if (this.mode == 'U') {
      this.onUpdateMajor();
    }
  }

  onAddMajor() {
    console.log(this.majorFormGroup.value);
    const value = this.majorFormGroup.value;

    value.active_flag = 'Y';
    value.school_ref = this.rftSchool.school_ref;

    console.log(this.majorFormGroup.value);

    this.majorService.addMajor(value)
    .subscribe(
      (res: Response) => {
        let major_ref = res.json().major_ref;
        console.log(res.json());
        console.log(res.json().major_ref);
        console.log(res.statusText);

        this.majorFormGroup.reset();

        this.initEditData();

        this.showSuccess('บันทึกข้อมูลสาขาวิชาเรียบร้อยแล้ว รหัสอ้างอิงคือ ' + major_ref);

      },
      (error) => {
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if(error.status == 409) {
          message = 'มีการใช้รหัสสาขาวิชานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );

  }



  onSearch() {
    this.majorFormList = [];
    console.log(this.majorCriteriaForm);
    this.searchMajor();
  }

  // searchMajor(): MajorForm[] {
  //   let resultList: MajorForm[] = [];

  //   this.majorService.searchMajor(this.majorCriteriaForm)
  //   .subscribe(
  //     result => {
  //       console.log(result.length);
  //       this.majorFormList = result;
  //     },
  //     (error) =>{
  //       console.log(error);
  //       this.showError(error);
  //     }
  //   );

  //   return resultList;
  // }

  searchMajor() {
    let resultList: MajorForm[] = [];

    this.majorService.searchMajor(this.majorCriteriaForm)
    .subscribe(
      result => {
        console.log(result.length);
        this.majorFormList = result;
      },
      (error) =>{
        console.log(error);
        this.showError(error);
      }
    );

  }

  onRowSelect(event) {
    console.log(this.selectMajor);
    console.log(event.data);
    this.mode = 'U';
    this.majorForm = new MajorForm();
    this.majorForm = this.selectMajor;
    this.majorForm.rftSchool.create_user = this.getUser();
    this.majorForm.rftSchool.update_user = this.getUser();
    this.validatorEditForm();
    console.log(this.majorForm.rftSchool);
    this.rftSchool = new RftSchool();
    this.rftSchool = this.majorForm.rftSchool;
    console.log(this.rftSchool);
    console.log(this.mode);
  }

  onUpdateMajor() {
    console.log(this.majorFormGroup.value);
    const value = this.majorFormGroup.value;
    console.log(this.rftSchool.school_ref);
    value.school_ref = this.rftSchool.school_ref;
    this.majorService.updateMajor(value, this.majorForm.rftMajor.major_ref)
    .subscribe(
      (res: Response) => {
        let school_ref = res.json().school_ref;
        console.log(res.json());
        console.log(res.json().school_ref);
        console.log(res.statusText);

        this.majorFormGroup.reset()

        this.initEditData();

        this.showSuccess('แก้ไขข้อมูลสาขาวิชาเรียบร้อยแล้ว');

      },
      (error) =>{
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if(error.status == 409) {
          message = 'มีการใช้รหัสสาขาวิชานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );

  }


 //changPage
  onPageSearch() {
    this.mode = 'S';
    this.initSearchData();
  }

  onPageInsert() {
    this.mode = 'I';
    this.initEditData();
  }

  onResetEdit(){
    console.log(this.mode);
    if (this.mode == 'I') {
      this.initEditData();
    }else if (this.mode == 'U') {
      this.majorForm = new MajorForm();
      this.majorForm = this.selectMajor;
      this.rftSchool = new RftSchool();
      console.log(this.majorForm.rftSchool);
      this.rftSchool = this.majorForm.rftSchool;
      console.log(this.rftSchool);
      this.validatorEditForm();
    }
  }

  onResetSearch() {
    this.initSearchData();
  }







  //dropdown
  getStatusList() {
    this.statusList = [];
    this.statusList.push({ label: '', value: '' });
    this.statusList.push({ label: 'ใช้งาน', value: 'Y' });
    this.statusList.push({ label: 'ไม่ใช้งาน', value: 'N' });
  }




















  //autocomplete
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


  getSchoolList(): RftSchool[] {
    let results = []
    this.schoolService.getSchools()
      .subscribe(
        result => {
          this.rftSchools = result;
          results = result;
        }
      );
      return results;
  }




  //message
  showError(message: string) {
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'ไม่สามารถบันทึกข้อมูลได้', detail: message});
  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'บันทีกข้อมูลสำเร็จ', detail: message});
  }

}
