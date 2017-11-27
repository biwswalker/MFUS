import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";
import { Message, SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { TitleNameForm } from "../../form/titlename-form";
import { TitleNameService } from './../../../services/titlename.service';


@Component({
  selector: 'app-titlename',
  templateUrl: './titlename.component.html',
  styleUrls: ['./titlename.component.css', '../pages.component.css']
})
export class TitlenameComponent implements OnInit {

  //mode
  mode: string = 'S'; // I-insert, U-update, S-search
  titleNameFormGroup: FormGroup;
  //message
  msgs: Message[] = [];
  statusList: SelectItem[];
  genderList: SelectItem[];
  titleNameForm: TitleNameForm = new TitleNameForm();
  titleCriteriaForm: TitleNameForm = new TitleNameForm();
  selectedTitleName: TitleNameForm = new TitleNameForm();
  titleList: TitleNameForm[] = [];
  

  constructor(private titleNameService: TitleNameService) { }

  ngOnInit() {
    this.initEditData();
    this.initSearchData();
  }

  //getter method
  getStatusList(){
    this.statusList = [];
    this.statusList.push({label:'',value:''});
    this.statusList.push({label:'ใช้งาน',value:'Y'});
    this.statusList.push({label:'ไม่ใช้งาน',value:'N'});
  }

  getGenderList(){
    this.genderList = [];
    this.genderList.push({label:'',value:''});
    this.genderList.push({label:'หญิง',value:'F'});
    this.genderList.push({label:'ชาย',value:'M'});
  }

  getUser(){
    return 'sirikarn.ra'
  }
   //getter method
  

  initEditData() {
    this.titleNameForm = new TitleNameForm();
    this.titleNameForm.rftTitleName.active_flag = 'Y';
    this.titleNameForm.rftTitleName.create_user = 'sirikarn.ra'
    this.titleNameForm.rftTitleName.update_user = 'sirikarn.ra'
    this.titleNameForm.rftTitleName.gender = 'F';
    this.validatorEditForm();
    this.getStatusList();
    this.getGenderList();
  }

   validatorEditForm() {
    this.titleNameFormGroup = new FormGroup({
      'title_code': new FormControl(this.titleNameForm.rftTitleName.title_code,
        Validators.compose([Validators.required, Validators.pattern('[0-9]+')])),
      'active_flag': new FormControl(this.titleNameForm.rftTitleName.active_flag, Validators.required ),
      'gender': new FormControl(this.titleNameForm.rftTitleName.gender, Validators.required ),
      'title_name_t': new FormControl(this.titleNameForm.rftTitleName.title_name_t,
        Validators.compose([Validators.required, Validators.maxLength(50)])),
      'title_name_e': new FormControl(this.titleNameForm.rftTitleName.title_name_e),
      'create_user': new FormControl(this.titleNameForm.rftTitleName.create_user),
      'update_user': new FormControl(this.titleNameForm.rftTitleName.update_user)
    });

    if(this.mode == 'I') {
      this.titleNameFormGroup.controls['active_flag'].disable();
    }else if (this.mode == 'U') {
      this.titleNameFormGroup.controls['active_flag'].enable();
    }
  }

   initSearchData() {
    this.titleCriteriaForm = new TitleNameForm();
    this.selectedTitleName = new TitleNameForm();
    this.statusList = [];
    this.titleList = [];
    this.getGenderList();
  }

    onPageInsert() {
      this.mode = 'I';
      this.initEditData();
    }

    onSearch() {
      this.titleList = [];
      this.searchTitleName();
    }

    searchTitleName() : TitleNameForm[] {
      let resultList: TitleNameForm[] = [];
      console.log("criteria: "+this.titleCriteriaForm.rftTitleName.title_name_t);
      console.log("criteria: "+this.titleCriteriaForm.rftTitleName.title_name_e);
      
      console.log("criteria-gender: "+this.titleNameFormGroup.controls['gender'].value);
      this.titleNameService.searchTitlename(this.titleCriteriaForm)
      .subscribe(
        result => {
          this.titleList = result;
        },
        (error) => {
          this.showError(error);
        }
      );
      console.log(resultList.length);
      return resultList;
    }

    onSubmit(){
      if(this.mode == 'I'){
        this.onAddTitle();
      }else if(this.mode == 'U'){
        this.onUpdateTitleName();
      }
    }

onAddTitle(){
  console.log(this.titleNameFormGroup.value);
    const value = this.titleNameFormGroup.value;
    value.active_flag = 'Y';
    this.titleNameService.addTitle(value)
    .subscribe(
      (res: Response) => {
        let title_ref = res.json().title_ref;  
          this.titleNameFormGroup.reset()
          this.initEditData(); 
        this.showSuccess('บันทึกข้อมูลคำนำหน้าชื่อเรียบร้อยแล้ว รหัสอ้างอิงคือ ' + title_ref);

      },
      (error) =>{
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if(error.status == 409) {
          message = 'มีการใช้รหัสคำนำหน้าชื่อนี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );
}


    onAddTitleName(){
      const value = this.titleNameFormGroup.value;
      value.active_flag = 'Y';
      this.titleNameService.addTitle(this.titleCriteriaForm)
      .subscribe(
        (res: Response)=> {
          let title_ref = res.json().title_ref;
          this.titleNameFormGroup.reset();
          this.initEditData();
          this.showSuccess('บันทึกข้อมูลสคำนำหน้าชื่อเรียบร้อยแล้ว หรัสอ้างอิงคือ'+title_ref);
        },
        (error)=> {
          let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
          if(error.status == 409){
            message = 'มีการใช้รหัสคำนำหน้าชื่อนี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
          }
          this.showError(message);
          return;
        }
      );
    }

    onUpdateTitleName(){
      const value = this.titleNameFormGroup.value;
      this.titleNameService.updateTitle(value, this.titleNameForm.rftTitleName.title_ref)
      .subscribe(
        (res: Response) => {
        let title_ref = res.json().title_ref;

       // this.titleNameFormGroup.reset()

        //this.initEditData();

        this.showSuccess('แก้ไขข้อมูลคำนำหน้าชื่อเรียบร้อยแล้ว');

      },
      (error) =>{
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if(error.status == 409) {
          message = 'มีการใช้รหัสคำนำหน้าชื่อานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
      );
    }

    onPageSearch(){
      this.mode = 'S';
      this.initSearchData();
    }
    
    onResetEdit(){
      if(this.mode == 'I'){
        this.initEditData();
      }else if(this.mode == 'U'){
        this.titleNameForm = new TitleNameForm();
        this.titleNameForm = this.selectedTitleName;
        this.validatorEditForm();
      }
    }

    onRowSelect(event){
      this.titleNameForm = new TitleNameForm();
      this.titleNameForm = this.selectedTitleName;
      this.validatorEditForm();
      this.mode = 'U';
      this.statusList = [];
      this.getStatusList();
    }

    onResetSearch(){
      this.initSearchData();
    }

    showError(message: string){
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'ไม่สามารถบันทึกข้อมูลได้',detail: message});
    }

    showSuccess(message: string){
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'บันทึกข้อมูลสำเร็จ', detail: message});
    }
}
