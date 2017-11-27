import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";
import { Message, SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { ApplicationDocumentForm } from '../../form/application-document-form';
import { ApplicationDocumentService } from '../../../services/application-document.service';
import { Event } from '@angular/router/src/events';


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
    console.log("onAddApplicationDocument.....");
    const value = this.formGroup.value;
    value.active_flag = 'Y';
    value.pdf_file = this.file;
    this.applicationDocumentService.addApplicationDocument(value)
    .subscribe(
      (res: Response)=>{
        let ref = res.json().document_ref;
        this.formGroup.reset();
        this.initEditData();
        this.showSuccess('บันทึกข้อมูลเอกสารเรียบร้อยแล้ว รหัสอ้างอิงคือ '+ref);
      }
    );
    
  }

  onUpdateApplicationDocument(){

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
      } else {
        this.onDelete();
      }
    }
   
  }

  handleReaderLoaded(readerEvent) {
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);    
    this.form.rftApplicationDocument.pdf_name = this.file_name;
    this.form.rftApplicationDocument.pdf_file = btoa(this.binaryString)
  }

  onDelete() {
    /*this.applicationDocumentService.deleteNews(this.newsForm.smNews.news_ref)
    .subscribe((res: Response) => {
      let news_ref = res.json().news_ref;
      console.log(res.json());
      console.log(res.json().news_ref);
      console.log(res.statusText);

      this.newsFormGroup.reset();

      this.onPageSearch();

      this.showSuccess('ลบข้อมูลเรียบร้อยแล้ว');

    },
  )*/
  }

  onResetEdit(){
    this.initEditData();
  }

  onPageSearch(){
    this.mode = 'S';
    this.initSearchData();
  }

  showSuccess(message: string){
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'บันทึกข้อมูลสำเร็จ', detail: message});
  }

  onSearch(){
    
  }

  onResetSearch(){
    this.initSearchData();
  }

  onPageInsert(){
    this.mode = 'I';
    this.initEditData();
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

  onRowSelect(event){

  }
}
