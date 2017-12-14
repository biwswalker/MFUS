import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";
import { Message, SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { DocumentrequestService } from '../../../services/documentrequest.service';
import { DocumentRequestForm } from '../../form/document-request-form';
import { SmDocumentRequestDetail } from '../../models/sm-document-request-detail';
import { NgProgress } from 'ngx-progressbar';
import { DocumentUploadForm } from '../../form/document-upload-form';
import { forEach } from '@angular/router/src/utils/collection';
import { ApDocumentUpload } from '../../models/ap-document-upload';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-document-request',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './document-request.component.html',
  styleUrls: ['./document-request.component.css','../pages.component.css']
})
export class DocumentRequestComponent implements OnInit {

  criteriaForm: DocumentRequestForm = new DocumentRequestForm();
  form: DocumentRequestForm = new DocumentRequestForm();
 
  //display to screen
  msgs: Message[] = [];
  documentList: DocumentRequestForm[] = [];

  image: any;
  fileList: FileList;
  binaryString: string;
  file: File;
  file_name: string;
  file_type: string;

  activeFlag = 'Y';
  createUser="";
  updateUser="";
  emptyMessage="ไม่มีเอกสารที่ขอเพิ่ม";

  constructor(private documentRequestService: DocumentrequestService,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.criteriaForm.smDocumentRequest.reply_flag = '1';
    this.criteriaForm.sortField = 'due_date';
    this.documentRequestService.searchDocumentRequest(this.criteriaForm)
    .subscribe(
      result => {  
        this.documentList = result;   
        console.log("documentList: "+this.documentList.length);      
      },
      (error) => {
        this.showError(error);
      }
    );
    
    this.initEditData();
   
  }

  initEditData(){
    this.activeFlag = 'Y';
    this.createUser = 'noei'
    this.updateUser = 'noei'  
  }

  showError(message: string){
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'ไม่สามารถบันทึกข้อมูลได้',detail: message});
  }

  documentUpload:ApDocumentUpload;
  uploadAllFlg:number = 0;
  onUpload(event,detail: SmDocumentRequestDetail,i:number) {
    console.log('onUpload..........' + i);
    this.ngProgress.start();
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.file = this.fileList[0];
      console.log(this.file);
      // 10 MB
      if (this.file.size < 10000000) {
        let reader = new FileReader();    
        setTimeout(() => {           
          reader.onload = this.handleReaderLoaded.bind(this);
          reader.readAsBinaryString(this.file);
        },3000);
        setTimeout(() => { 
          console.log("after: "+this.image); 
                
        this.documentUpload = new ApDocumentUpload();
        this.documentUpload.application_ref = detail.application_ref;
        this.documentUpload.document_type = this.file.type;
        //this.documentUpload.apDocumentUpload.document_image = this.image;
        this.documentUpload.document_image = "test";
        this.documentUpload.document_name = this.file.name;
        this.documentUpload.document_ref = detail.document_ref;
        console.log("document_ref: "+this.documentUpload.document_ref);
        this.documentUpload.document_request_ref = detail.document_request_ref;
        this.documentUpload.create_user = this.createUser;
        this.documentUpload.update_user = this.updateUser;
        detail.upload_flag = true;
        detail.file_name = "ชื่อไฟล์: "+this.file.name;
        this.form.documentUploadList.push(this.documentUpload);
        this.uploadAllFlg+=1;
        this.ngProgress.done();
      },4000);
      }
    }   
  }

  handleReaderLoaded(readerEvent) {
    console.log("handleReaderLoaded......");
    this.image = null;
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);
  }

  onSubmit(doc: DocumentRequestForm){   
    console.log("on submit....."+this.form.requestDoc);    
    if(this.form.requestDoc > 0){    
    if(this.uploadAllFlg==doc.smDocumentRequestDetail.length){
       this.onAddApplicationDocument(doc);
        this.ngOnInit();
    }else{
        let message = 'กรุณาเลือกไฟล์เอกสารเพิ่มเติมให้ครบทุกรายการ';
        this.showError(message);
    }      
  }else{
    this.onAddApplicationDocument(doc);
    this.ngOnInit();
  }
   
  }

  onAddApplicationDocument(doc: DocumentRequestForm){
    console.log("onAddApplicationDocument....................");
    this.ngProgress.start();
this.form.smDocumentRequest = doc.smDocumentRequest;
    this.documentRequestService.addDocumentRequest(this.form).subscribe(
      (res: Response)=>{
        this.showSuccess("บันทึกข้อมูลเรียบร้อบแล้ว");
        this.ngProgress.done();
      },
      (error)=>{
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        this.showError(message);
        this.ngProgress.done();
        return;
      }
    );
  }

  showSuccess(message: string){
    this.msgs = [];
    this.msgs.push({severity:'success',summary:'บันทึกข้อมูลสำเร็จ',detail: message});
  }


}
