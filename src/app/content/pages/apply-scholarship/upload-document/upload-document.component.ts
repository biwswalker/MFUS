import { DocumentDatatableForm } from './../../../form/documentDatatable-form';
import { ViewEncapsulation } from '@angular/core';
import { ApplyscholarshipService } from './../../../../services/applyscholarship.service';
import { ApplyScholarshipForm } from '../../../form/apply-scholarshop-form';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Rx';
import { RftApplicationDocument } from './../../../models/rft-application-document';
import { Response } from '@angular/http';
import { UtilsService } from './../../../../services/utils.service';
import { Component, OnInit } from "@angular/core";
import { ApDocumentUpload } from '../../../models/ap-document-upload';
import { ApplyScholarshipComponent } from '../apply-scholarship.component';
import { AcStudent } from '../../../models/ac-student';

@Component({
  selector: "app-upload-document",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./upload-document.component.html",
  styleUrls: [
    "../apply-scholarship.component.css",
    "../../../pages/pages.component.css"
  ]
})

export class UploadDocumentComponent implements OnInit {


  image: any;
  fileList: FileList;
  binaryString: string;
  file: File;
  file_name: string;
  file_type: string;

  document: ApDocumentUpload;
  documentList: RftApplicationDocument[] = [];

  uploadList: ApDocumentUpload[] = [];

  documentDatatable: DocumentDatatableForm[] = [];


  constructor(private utilService: UtilsService,
    public applyScholarship: ApplyScholarshipComponent,
    private applyscholarshipService: ApplyscholarshipService) { }

  ngOnInit() {
    this.getDocument();
  }

  getDocument() {
    this.utilService.getDocument().subscribe(
      (res: RftApplicationDocument[]) => {
        this.documentList = res;

      }
    );
  }

  handleReaderLoaded(readerEvent, ref: string) {
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);
    this.file_name = this.file.name;
    this.file_type = this.file.type;
  }

  upload(event, ref: string) {
    new Observable((observer: Observer<boolean>) => {
      setTimeout(() => {
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
        observer.next(true);
      }, 1000);
      setTimeout(() => {
        this.document = new ApDocumentUpload();
        this.document.document_ref = ref;
        this.document.document_image = this.image;
        this.document.document_name = this.file_name;
        this.document.document_type = this.file_type;
        if (this.uploadList.length == 0) {
          this.uploadList.push(this.document)
        } else {
          let index = new ApDocumentUpload();
          index = this.uploadList.find(i => i.document_ref == ref)
          if (typeof index === "undefined") {
            this.uploadList.push(this.document)
          } else {
            this.uploadList[this.uploadList.indexOf(index)] = this.document;
          }
        }
      }, 2000);
    }).subscribe()
  }

  uploadFileToList() {
    this.applyScholarship.applyScholarshipForm.fileList = this.uploadList;
  }

  onNext() {
    this.uploadFileToList();
    console.log("data: ", this.applyScholarship.applyScholarshipForm)
    this.applyscholarshipService.insertData(this.applyScholarship.applyScholarshipForm);
  }
}


