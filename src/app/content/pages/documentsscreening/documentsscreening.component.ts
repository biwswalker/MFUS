import { SmScholarshipAnnouncement } from './../../models/sm-scholarship-announcement';
import { SmScholarship } from './../../models/sm-scholarship';
import { MajorService } from './../../../services/major.service';
import { RftMajor } from './../../models/rft-major';
import { SchoolService } from './../../../services/school.service';
import { DocumentsForm } from './../../form/documents-form';
import { FormGroup } from '@angular/forms';
import { RftSchool } from './../../models/rft-school';
import { Message, SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './../../../services/documents.service';
import { ScholarshipService } from '../../../services/scholarship.service';

@Component({
  selector: 'app-documentsscreening',
  templateUrl: './documentsscreening.component.html',
  styleUrls: ['./documentsscreening.component.css','../pages.component.css']})

export class DocumentsscreeningComponent implements OnInit {

  msgs: Message[] = [];

   // insert
   documentsForm: DocumentsForm = new DocumentsForm();
   documentsFormGroup: FormGroup;

   //search
   documentsCriteriaForm: DocumentsForm = new DocumentsForm();
   //for datatable
   documentsFormList: DocumentsForm[] = [];
   selectDocuments: DocumentsForm = new DocumentsForm();

  //autocomplete
  rftSchoolList: RftSchool[] = [];
  rftSchools: RftSchool[] = [];
  rftSchool: RftSchool = new RftSchool();
  schoolObject: RftSchool;

  rftMajorList: RftMajor[] = [];
  rftMajorSubDistricts: RftMajor[] = [];
  rftMajor: RftMajor = new RftMajor();
  majorObject: RftMajor;

  //-------- List: SelectItem --------
  DocumentList: SelectItem[];
  documentValue: string;

  scholarshipList: SelectItem[];
  screeningStatusList: SelectItem[];
  schoolTestList: SelectItem[];
  majorTestList: SelectItem[];

  constructor(private documentsService: DocumentsService,
              private schoolService:SchoolService,
              private majorService: MajorService,
              private scholarshipService: ScholarshipService) { }

  ngOnInit() {
    this.initSearchData();
    this.getScreeningStatusList();
    this.getScholarshipList();
    this.getTestSchoolList();
    this.getTestMajorList();
  }

    getTestSchoolList(){
      this.schoolTestList = [];
      this.schoolTestList.push({label: '', value: '' });
      this.schoolTestList.push({label: 'สำนักวิชาเทคโนโลยีสารสนเทศ', value: '1' });
      this.schoolTestList.push({label: 'สำนักวิชาศิลปศาสตร์', value: '2' });
      this.schoolTestList.push({label: 'สำนักวิชาการจัดการ', value: '3' });
      this.schoolTestList.push({label: 'สำนักวิชาวิทยาศาสตร์', value: '4' });
    }

    getTestMajorList(){
      this.majorTestList = [];
      this.majorTestList.push({label: '', value: '' });
      this.majorTestList.push({label: 'สาขาวิชาเทคโนโลยีสารสนเทศ', value: '1' });
      this.majorTestList.push({label: 'สาขาวิชาวิทยาการคอมพิวเตอร์', value: '2' });
      this.majorTestList.push({label: 'สาขาวิชาวิศวกรรมซอฟต์แวร์', value: '3' });
      this.majorTestList.push({label: 'สาขาวิชาการบัญชี', value: '4' });
      this.majorTestList.push({label: 'สาขาวิชาเศรษฐศาสตร์', value: '5' });
      this.majorTestList.push({label: 'สาขาวิชาบริหารธุรกิจ', value: '6' });
      this.majorTestList.push({label: 'สาขาวิชาภาษาอังกฤษ', value: '7' });
      this.majorTestList.push({label: 'สาขาวิชาเคมีประยุกต์', value: '8' });
      this.majorTestList.push({label: 'สาขาวิชาวิศวกรรมวัศดุ', value: '9' });
      }

    getScreeningStatusList() {
        this.screeningStatusList = [];
        this.screeningStatusList.push({ label: '', value: '' });
        this.screeningStatusList.push({ label: 'ไม่ระบุ', value: '1' });
        this.screeningStatusList.push({ label: 'รอดำเนินการ', value: '2' });
        this.screeningStatusList.push({ label: 'รอเอกสาร', value: '3' });
        this.screeningStatusList.push({ label: 'ผ่าน', value: '4' });
    }

    getScholarshipList(){
      this.scholarshipList = [];
      this.scholarshipList.push({ label: '', value: '' });
      this.scholarshipList.push({ label: 'ทุน 1', value: '1' });
      this.scholarshipList.push({ label: 'ทุน 2', value: '2' });
      this.scholarshipList.push({ label: 'ทุน 3', value: '3' });
    }
    onSearch() {
      this.documentsFormList = [];
      this.searchDocuments();
  }

  searchDocuments() {
    // let resultList: DocumentsForm[] = [];
    // this.documentsService.searchDocuments(this.documentsCriteriaForm)
    //   .subscribe(
    //   result => {
    //     this.documentsFormList = result;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.showError(error);
    //   }
    //   );
  }

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'ไม่สามารถค้นหาได้', detail: message });
  }

  onResetSearch() {
    this.initSearchData();
  }

  initSearchData() {
  this.documentsCriteriaForm = new DocumentsForm();
  this.selectDocuments = new DocumentsForm();
  this.documentsFormList = [];
}

  onRowSelect() {

  }

  autocompleteMethodSchool(event){
    let query = event.query;
    this.rftSchools = [];
    this.rftSchool = new RftSchool();
    let objList: RftSchool[];
    objList = this.rftSchoolList;
    for (let obj of objList) {
      // Filter By string event
      if (obj.school_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.rftSchools.push(obj);
      }
    }
}

//------ autocomplete School dropdown -----
handleCompleteClickSchool(){
  let objList: RftSchool[];
  this.rftSchool = new RftSchool();
  objList = this.rftSchoolList;
  for (let obj of objList) {
    this.rftSchools.push(obj);
    }
    setTimeout(() => {
      this.rftSchools = this.rftSchoolList;
      this.rftSchools = [];
    }, 100)
  }
  //------------ end school autocomplete ----------

selectSchool(event: SelectItem){
  console.log(this.documentsForm.rftSchool.school_ref);
  this.schoolService.getSchools()
  .subscribe((res: RftSchool[]) => {
    this.rftSchoolList = [];
    this.rftSchoolList.push(...res);
    }
  );
  console.log(this.rftSchoolList.length);
}

selectMajor(event: SelectItem) {
  this.majorService.getMajorBySchoolRef(this.documentsForm.rftMajor.major_ref)
  .subscribe((res: RftMajor[]) => {
    this.rftMajorList = [];
    this.rftMajorList.push(...res);
    }
  );
  console.log(this.rftMajorList.length)
}

getSelectedSchool(code: string) {
  this.schoolObject = new RftSchool();
  let objList: RftSchool[];
  objList = this.rftSchoolList;
  for (let obj of objList) {
    // Filter By string event
      if (obj.school_ref == code) {
        this.schoolObject = obj;
        return this.schoolObject;
      }
  }
}

getSelectedMajor(code: string) {
  this.majorObject = new RftMajor();
  let objList: RftMajor[];
  objList = this.rftMajorList;
  for (let obj of objList) {
    // Filter By string event
      if (obj.major_ref == code) {
        this.majorObject = obj;
        return this.majorObject;
      }
  }
}

//---------- List ------------
getSchoolList() {
  this.rftSchools = []
  this.schoolService.getSchools()
    .subscribe(
    (result) => {
      this.rftSchoolList = result;
    }
    );
}

getMajorList() {
  // this.rftMajorList = [];
  // this.majorService.getMajorBySchoolRef()
  //   .subscribe(
  //   result => {
  //     this.rftMajorList = result;
  //   }
  //   );
}
//-------- End List ----------

}
