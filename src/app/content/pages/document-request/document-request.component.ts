import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";
import { Message, SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { DocumentrequestService } from '../../../services/documentrequest.service';
import { DocumentRequestForm } from '../../form/document-request-form';
import { SmDocumentRequestDetail } from '../../models/sm-document-request-detail';

@Component({
  selector: 'app-document-request',
  templateUrl: './document-request.component.html',
  styleUrls: ['./document-request.component.css','../pages.component.css']
})
export class DocumentRequestComponent implements OnInit {

  criteriaForm: DocumentRequestForm = new DocumentRequestForm();
 
  //display to screen
  msgs: Message[] = [];
  documentList: DocumentRequestForm[] = [];

  constructor(private documentRequestService: DocumentrequestService) { }

  ngOnInit() {
    this.criteriaForm.smDocumentRequest.reply_flag = '1';
    this.criteriaForm.sortField = 'due_date';
    this.documentRequestService.searchDocumentRequest(this.criteriaForm).subscribe
    (
      result => {
        this.documentList = result;
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

}
