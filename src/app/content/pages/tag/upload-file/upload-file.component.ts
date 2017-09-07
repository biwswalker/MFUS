import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css', '../../pages.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  image: any = './assets/images/empty_profile.png';
  fileList: FileList;
  binaryString: string;
  file: File;

  ngOnInit() {
  }

  onUpload(event) {
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
    // console.log(btoa(this.binaryString));
    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);
  }

  onDelete() {
    this.image = './assets/images/empty_profile.png';
    this.fileList = null;
    this.binaryString = null;
    this.file = null;
  }
}
