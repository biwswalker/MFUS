import { UtilsService } from './../../../services/utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scholarship-announcement-detail',
  templateUrl: './scholarship-announcement-detail.component.html',
  styleUrls: ['../pages.component.css']
})
export class ScholarshipAnnouncementDetailComponent implements OnInit {

  image: any = './assets/images/empty_profile.png';
  fileList: FileList;
  binaryString: string;
  file: File;


  dateOfBirth: Date;
  dateStringDb: string;
  // Value
  rangeValues: number[] = [1, 8];

  // Boolean Value
  checkedBool: boolean = false;

  // List Value
  selectedSchoolCheckbox: string[] = [];
  selectedMajorCheckbox: string[] = [];

  // Checkbox Major List
  majorCheckboxList = [];

  constructor(private utilsService: UtilsService, ) { }

  ngOnInit() {
    console.log('displayStringDate ' + this.utilsService.displayStringDate(new Date()));
    console.log('displayDateToString ' + this.utilsService.displayDateToString('1', '9', '2017'));
    console.log('convertStringToDate ' + this.utilsService.convertStringToDate('1', '9', '2017'));
    console.log('convertStringDbToDate ' + this.utilsService.convertStringDbToDate('30092017'));
  }

  // On select checkbox
  onSelectSchool() {
    // New Data
    this.majorCheckboxList = [];
    // Clear Data
    this.selectedMajorCheckbox = [];
    // Add list
    for (let schoolRef of this.selectedSchoolCheckbox) {
      let school = this.getMajor(schoolRef);
      this.majorCheckboxList.push(...school);
    }
  }

  // BEGIN MAKE DATA //
  getMajor(ref: string) {
    let listObj: string[] = [];
    if (ref === 'IT') {
      return [{ value: 'IT', name: 'InformationTechnology' }, { value: 'SE', name: 'Software Engineering' }, { value: 'CE', name: 'Computer Engineering' }];
    } else if (ref === 'MA') {
      return [{ value: 'ACC', name: 'Accounting' }, { value: 'ECON', name: 'Economic' }];
    } else if (ref === 'SCI') {
      return [{ value: 'CHEM', name: 'Chemistry' }, { value: 'BIO', name: 'Biosciences' }];
    }
    return null;
  }
  // END MAKE DATA

  onDateSelected() {
    this.dateStringDb = this.utilsService.convertDateToDb(this.dateOfBirth);
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
