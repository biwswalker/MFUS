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

@Component({
  selector: 'app-document-request',
  templateUrl: './document-request.component.html',
  styleUrls: ['./document-request.component.css','../pages.component.css']
})
export class DocumentRequestComponent implements OnInit {

  criteriaForm: DocumentRequestForm = new DocumentRequestForm();
  form: DocumentUploadForm[] = [];
 
  //display to screen
  msgs: Message[] = [];
  documentList: DocumentRequestForm[] = [];

  image: any;
  fileList: FileList;
  binaryString: string;
  file: File;
  file_name: string;
  file_type: string;

  constructor(private documentRequestService: DocumentrequestService,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.criteriaForm.smDocumentRequest.reply_flag = '1';
    this.criteriaForm.sortField = 'due_date';
    this.documentRequestService.searchDocumentRequest(this.criteriaForm)
    .subscribe(
      result => {  
        this.documentList = result;  
        for(let i=0; i<this.documentList.length;i++){
          console.log("duedate: "+ i + "..." + this.documentList[i].smDocumentRequest.due_date);
              }
      },
      (error) => {
        this.showError(error);
      }
    );
    
   
  }

  showError(message: string){
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'ไม่สามารถบันทึกข้อมูลได้',detail: message});
  }

  documentUpload:DocumentUploadForm;
  onUpload(event,detail: SmDocumentRequestDetail) {
    console.log('onUpload..........' + detail.application_ref);
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.file = this.fileList[0];
      // 10 MB
      if (this.file.size < 10000000) {
        let reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
        this.documentUpload = new DocumentUploadForm();
        this.documentUpload.apDocumentUpload.application_ref = detail.application_ref;
        this.documentUpload.apDocumentUpload.document_type = this.file.type;
        this.documentUpload.apDocumentUpload.document_image = this.file;
        this.documentUpload.apDocumentUpload.document_name = this.file_name;
        this.form.push(this.documentUpload);
      }
      
    }
   
   
  }

  handleReaderLoaded(readerEvent) {
    console.log("handleReaderLoaded..................");
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);    
    //this.form.rftApplicationDocument.pdf_name = this.file.name;
   // this.form.rftApplicationDocument.pdf_file = btoa(this.binaryString)
   // console.log(this.form.rftApplicationDocument.pdf_file);
  }

  onSubmit(){
    console.log("file list: "+this.form.length);
    this.onAddApplicationDocument();
  }

  onAddApplicationDocument(){
    console.log("Begin onAddApplicationDocument");
    this.ngProgress.start();
   
    for(let i=0;i<this.form.length;i++){
      console.log(this.form[i].apDocumentUpload.application_ref);

    }
   /* this.documentRequestService.addDocumentRequest(this.form).subscribe(

    );*/
  }


}
