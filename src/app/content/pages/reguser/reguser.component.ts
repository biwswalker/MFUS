import { SelectItem } from 'primeng/primeng';
import { RegisterForm } from './../../form/register-form';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reguser',
  templateUrl: './reguser.component.html',
  styleUrls: ['./reguser.component.css', '../pages.component.css']
})
export class ReguserComponent implements OnInit {

  reguserForm: RegisterForm;

  // Dropdown List
  daybdList: SelectItem[];
  monthbdList: SelectItem[];
  yearbdList: SelectItem[];
  titleList: SelectItem[];
  schoolList: SelectItem[];
  majorList: SelectItem[];

    // Value
  DaybdValue: string;
  MonthbdValue: string;
  YearbdValue: string;
  TitleValue: string;
  SchoolValue: string;
  MajorValue: string;

  image: any = './assets/images/empty_profile.png';
  fileList: FileList;
  binaryString: string;
  file: File;



  constructor() { }

  ngOnInit() {
    this.reguserForm = new RegisterForm();
    this.getTitleList();
  }

  //make data list
  getTitleList() {
    this.titleList = [];
    this.titleList.push({ label: '', value: '' });
    this.titleList.push({ label: 'นาย', value: 'Mr' });
    this.titleList.push({ label: 'นาง', value: 'Miss' });
    this.titleList.push({ label: 'นางสาว', value: 'Mrs' });
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


}
