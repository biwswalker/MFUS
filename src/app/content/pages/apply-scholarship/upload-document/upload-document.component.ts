import { Response } from '@angular/http';
import { UtilsService } from './../../../../services/utils.service';
import { Component, OnInit } from "@angular/core";
import { ApDocumentUpload } from '../../../models/ap-document-upload';
import { ApplyScholarshipComponent } from '../apply-scholarship.component';

@Component({
  selector: "app-upload-document",
  templateUrl: "./upload-document.component.html",
  styleUrls: [
    "./upload-document.component.css",
    "../../../pages/pages.component.css"
  ]
})
export class UploadDocumentComponent implements OnInit {


  image: any;
  fileList: FileList;
  binaryString: string;
  file: File;
  img_name: string;
  img_type: string;


  documentList: ApDocumentUpload[] = [];
  constructor(private utilService: UtilsService,
              public applyScholarship: ApplyScholarshipComponent) {}

  ngOnInit(  ) {
    this.getDocument();
  }

  getDocument() {
    this.utilService.getDocument().subscribe(
      (res: ApDocumentUpload[])=>{
        console.log(res)
        this.documentList.push(...res)
      }
    );
    console.log(this.applyScholarship.applyScholarshipForm.apDocumentUpload)
  }

  onUpload(event, ref:number) {
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
    this.binaryString = readerEvent.target.result;
    this.image = 'data:' + this.file.type + ';base64,' + btoa(this.binaryString);
    // console.log(btoa(this.binaryString));
    this.img_name = this.file.name;
    this.img_type = this.file.type;
    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);
  }

  showDetail() {
    console.log(this.applyScholarship.applyScholarshipForm.apDocumentUpload)
  }
}
