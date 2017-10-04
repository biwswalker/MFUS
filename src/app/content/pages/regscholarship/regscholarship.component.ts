import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regscholarship',
  templateUrl: './regscholarship.component.html',
  styleUrls: ['./regscholarship.component.css', '../pages.component.css']
})
export class RegscholarshipComponent implements OnInit {
  console: any;
  textStr: string;
  image: any = './assets/images/empty_profile.png';
  fileList: FileList;
  binaryString: string;
  file: File;
  checkedDoc1: boolean = false;
  checkedDoc2: boolean = false;


  debtList = [{ detail: '', amount: 0 }];

  constructor() {
  }
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
    this.checkedDoc1 = true;
    // console.log(btoa(this.binaryString));
    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);
  }

  onDelete() {
    this.checkedDoc1 = false;
    this.image = './assets/images/empty_profile.png';
    this.fileList = null;
    this.binaryString = null;
    this.file = null;
  }





}
