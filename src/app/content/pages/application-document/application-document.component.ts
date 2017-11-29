import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";
import { Message, SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { ApplicationDocumentForm } from '../../form/application-document-form';
import { ApplicationDocumentService } from '../../../services/application-document.service';
import { Event } from '@angular/router/src/events';
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-application-document',
  templateUrl: './application-document.component.html',
  styleUrls: ['./application-document.component.css','../pages.component.css']
})
export class ApplicationDocumentComponent implements OnInit {

  mode: string = 'S';
  msgs: Message[] = [];
  formGroup: FormGroup;
  form: ApplicationDocumentForm = new ApplicationDocumentForm();
  criteriaForm: ApplicationDocumentForm = new ApplicationDocumentForm();
  selectedForm: ApplicationDocumentForm = new ApplicationDocumentForm();
  formList: ApplicationDocumentForm[] = [];
  statusList: SelectItem[];

  image: any;
  fileList: FileList;
  binaryString: string;
  file: File;
  file_name: string;
  file_type: string;


  constructor(private applicationDocumentService: ApplicationDocumentService) { }

  ngOnInit() {
    this.initEditData();
    this.initSearchData();
    this.validatorEditForm();
  }

  onInitFormGroup(){
    this.initEditData();
    this.validatorEditForm();
  }

  //getter method
  getStatusList(){
    this.statusList = [];
    this.statusList.push({label:'',value:''});
    this.statusList.push({label:'ใช้งาน',value:'Y'});
    this.statusList.push({label:'ไม่ใช้งาน',value:'N'});
  }

  validatorEditForm() {
    this.formGroup = new FormGroup({
      'document_code': new FormControl(this.form.rftApplicationDocument.document_code,Validators.required),
      'active_flag': new FormControl(this.form.rftApplicationDocument.active_flag, Validators.required ),
      'document_name': new FormControl(this.form.rftApplicationDocument.document_name, Validators.required ),
      'pdf_name': new FormControl(this.form.rftApplicationDocument.pdf_name, Validators.required ),     
    });
  }
  
  initEditData(){
    this.form = new ApplicationDocumentForm();  
    this.form.rftApplicationDocument.active_flag = 'Y';
    this.form.rftApplicationDocument.create_user = 'noei'
    this.form.rftApplicationDocument.update_user = 'noei'  
  }

  initSearchData(){
    this.criteriaForm = new ApplicationDocumentForm();
    this.selectedForm = new ApplicationDocumentForm();
    this.formList = [];
    this.statusList = [];
    this.getStatusList();
  }

  onSubmit(){
    console.log("onSubmit.............");
    if(this.mode == 'I'){
      this.onAddApplicationDocument();
      this.onInitFormGroup();
    }else if(this.mode == 'U'){
      this.onUpdateApplicationDocument();
    }
  }

  onAddApplicationDocument(){

    const value = this.formGroup.value;
    value.active_flag = 'Y';
    this.form.rftApplicationDocument.document_code = value.document_code;
    this.form.rftApplicationDocument.document_name = value.document_name;
    this.form.rftApplicationDocument.pdf_name = value.pdf_name;
    this.applicationDocumentService.addApplicationDocument(this.form)
    .subscribe(
      (res: Response)=>{
        let ref = res.json().document_ref;
        this.formGroup.reset();
        this.initEditData();
        this.getMaxCode();
        this.showSuccess('บันทึกข้อมูลเอกสารเรียบร้อยแล้ว รหัสอ้างอิงคือ '+ref);
      },
      (error)=>{
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if(error.status == 409) {
          message = 'มีการบันทึกเอกสารนี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );
    
  }

  onUpdateApplicationDocument(){
    const value = this.formGroup.value;
    this.applicationDocumentService.update(value, this.form.rftApplicationDocument.document_ref).subscribe(
      (res: Response)=>{
        let documentRef = res.json().document_ref;
        this.showSuccess('แก้ไขข้อมูลเรียบร้อบแล้ว');
    },
      (error)=>{
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลอีกครั้ง';
        if(error.status == 409){
          message = 'มีการบันทึกเอกสารนี้แล้ว กรุณาตรวจสอบข้อมูล';
        }
        this.showError(message);
        return;
      }      
    );
  }

  onUpload(event) {
    console.log('onUpload..........');
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.file = this.fileList[0];
      // 10 MB
      if (this.file.size < 10000000) {
        let reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
      }
    }
   
  }

  handleReaderLoaded(readerEvent) {
    console.log("handleReaderLoaded..................");
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);    
    this.form.rftApplicationDocument.pdf_name = this.file.name;
    this.form.rftApplicationDocument.pdf_file = btoa(this.binaryString)
    console.log(this.form.rftApplicationDocument.pdf_file);
  }

  onResetEdit(){
    this.form = null;
    this.initEditData();
    this.getMaxCode();
    this.validatorEditForm();
  }

  onPageSearch(){
    this.mode = 'S';
    this.initSearchData();
  }

  showSuccess(message: string){
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'บันทึกข้อมูลสำเร็จ', detail: message});
  }

  showError(message: string){
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'ไม่สามารถบันทึกข้อมูลได้',detail: message});
  }

  onSearch(){
    this.formList = [];
    let resultList: ApplicationDocumentForm[] = [];
    this.applicationDocumentService.searchApplicationDocument(this.criteriaForm)
    .subscribe(
      result => {
        this.formList = result;
      },
      (error) => {
        this.showError(error);
      }
    );
  }

  onResetSearch(){
    this.initSearchData();
  }

  onPageInsert(){
    this.mode = 'I';
    this.initEditData();
   this.getMaxCode();
    
  }

  onRowSelect(event){
    this.form = new ApplicationDocumentForm();
    this.form = this.selectedForm;
    console.log(this.form.rftApplicationDocument.pdf_name);
    this.validatorEditForm();
    this.mode = 'U';
    this.statusList = [];
    this.getStatusList();
  }

  getMaxCode(){
    this.applicationDocumentService.getMax()
    .subscribe(
      (res: string) => {
        console.log(res);
        this.form.rftApplicationDocument.document_code = res
      },
      (error) => {
        return;
      }
    );
  }
}
