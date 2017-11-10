import { UserService } from '../../../services/user.service';
import { UtilsService } from './../../../services/utils.service';
import { StudentService } from './../../../services/student.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MajorService } from './../../../services/major.service';
import { SelectItem, Message } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { RftSchool } from '../../models/rft-school';
import { SchoolService } from '../../../services/school.service';
import { RftMajor } from '../../models/rft-major';
import { Response } from '@angular/http';
import { RftTitleName } from '../../models/rft-title-name';
import { StudentForm } from '../../form/student-form';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css', '../pages.component.css']
})
export class StudentComponent implements OnInit {

  msgs: Message[];

  mode:string;

  titleList: RftTitleName[] = [];
  listTitle: SelectItem[] = [];

  monthList: SelectItem[];
  birthMmonth: number = 0;

  dayList: SelectItem[];
  birthDay: number = 0;

  birthYear: number;
  birthDate:string;
  studentFormGroup: FormGroup;
  studentEditForm: StudentForm;
  studentCriteriaForm: StudentForm;
  selectedStudent: StudentForm;

  studentList: StudentForm[];

  schoolList: RftSchool[] = [];
  listSchool: RftSchool[] = [];

  majorList: RftMajor[] = [];
  listMajor: RftMajor[] = [];

  fileList: FileList;
  binaryString: string;
  file: File;

  student_ref: string;

  date = new Date();
  nowYear: string;
  previousYear: string;

  image: any;
  img_name: string;
  img_type: string;

  constructor(private schoolService: SchoolService,
              private majorService: MajorService,
              private studentService: StudentService,
              private utilService: UtilsService,
              private userService:UserService) {
              }

  ngOnInit() {
    this.getTitleList();
    this.getSchoolList();
    this.initialEditForm();
    console.log(this.getSchoolList())
    this.monthList = this.utilService.getDropdownMonthShort();

  }

  initialEditForm() {
    this.studentEditForm = new StudentForm();
    this.image = './assets/images/empty_profile.png';
    this.studentEditForm.acStudent.create_user = 'phai';
    this.studentEditForm.acStudent.update_user = 'phai';
    this.nowYear = this.date.getFullYear().toString();
    this.previousYear = (this.date.getFullYear()-50).toString();
    this.validateEditForm();
  }

  initSearchStudent() {
    this.studentCriteriaForm = new StudentForm();
  }

  validateEditForm() {
    this.studentFormGroup = new FormGroup({
      'personal_id': new FormControl(this.studentEditForm.acStudent.personal_id,
                    Validators.compose([Validators.required, Validators.pattern('[0-9]+')])),
      'gender': new FormControl(this.studentEditForm.rftTitleName.gender,
                    Validators.compose([Validators.required])),
      'birth_date': new FormControl(this.studentEditForm.acStudent.birth_date,
                    Validators.compose([Validators.required])),
      'title_ref': new FormControl(this.studentEditForm.rftTitleName.title_ref,
                    Validators.compose([Validators.required])),
      'image': new FormControl(this.image,
                    Validators.compose([Validators.required])),
      'student_id': new FormControl(this.studentEditForm.acStudent.student_id,
        Validators.compose([Validators.required])),
      'first_name_t': new FormControl(this.studentEditForm.acStudent.first_name_t,
        Validators.compose([Validators.required])),
      'last_name_t': new FormControl(this.studentEditForm.acStudent.last_name_t,
        Validators.compose([Validators.required])),
      'first_name_e': new FormControl(this.studentEditForm.acStudent.first_name_e),
      'last_name_e': new FormControl(this.studentEditForm.acStudent.last_name_e),
      'nationality': new FormControl(this.studentEditForm.acStudent.nationality),
      'race': new FormControl(this.studentEditForm.acStudent.race),
      'religion': new FormControl(this.studentEditForm.acStudent.religion),
      'phone_no': new FormControl(this.studentEditForm.acStudent.phone_no,
        Validators.compose([Validators.required, Validators.pattern('[0-9]+')])),
      'email': new FormControl(this.studentEditForm.acStudent.email,
        Validators.compose([Validators.required, Validators.email])),
      'month': new FormControl(null),
      'day': new FormControl(null),
      'year': new FormControl(null)
    });
  }

  selectMonth(){
    console.log('dad month: '+this.birthMmonth);
    this.dayList = this.utilService.getDropdownDayInMonth(this.birthMmonth);
    this.birthDay = null;
  }

  getTitleList() {
    this.utilService.getTitleList()
      .subscribe(
        (res: RftTitleName[]) => {
          for(let obj of res) {
          this.listTitle.push({label: obj.title_name_t, value: obj})
        }
        }
      );
  }

  getSchoolList() {
    this.schoolService.getSchools()
    .subscribe(
      (res: RftSchool[]) => {
        this.listSchool.push(...res);
      }
    );
  }

  getMajorList(ref: string) {
    console.log(ref)
    this.listMajor = [];
    this.majorService.getMajorBySchoolRef(ref).subscribe(
      (res: RftMajor[]) =>{
        this.listMajor.push(...res);
      }
    );
    console.log(this.listMajor)
  }

  //Begin Province Autocomplete Method // On key wording
  autocompleteSchool(event) {
    let query = event.query;
    this.schoolList = [];
    let objList: RftSchool[];
    objList = this.listSchool;
    for (let obj of objList) {
      if (obj.school_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.schoolList.push(obj);
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClickSchool() {
    let objList: RftSchool[];
    objList = this.listSchool;
    for (let obj of objList) {
          this.schoolList.push(obj);
    }

    setTimeout(() => {
      this.schoolList = this.listSchool
    }, 100)
  }

  autocompleteMajor(event) {
    let query = event.query;
    this.majorList = [];
    let objList: RftMajor[];
    objList = this.listMajor;
    for (let obj of objList) {
      if (obj.major_name_t.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.majorList.push(obj);
      }
    }
  }

  // On Click Autocomplete Dropdown Button
  handleCompleteClickMajor() {
    this.majorList = [];
    let objList: RftMajor[];
    objList = this.listMajor;
    for (let obj of objList) {
          this.majorList.push(obj);
    }
    setTimeout(() => {
      this.majorList = this.listMajor
    }, 100)
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
    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);
  }

  onSubmit() {
    this.onAddStudent();
  }

  onResetInsert() {
    this.initialEditForm();
  }

  onAddStudent() {
    const value = this.studentFormGroup.value;
    value.profile_image = this.image;
    value.profile_name = this.studentEditForm.acStudent.personal_id;
    value.profile_type = this.file.type;
    value.title_ref = this.studentEditForm.rftTitleName.title_ref;
    value.school_ref = this.studentEditForm.rftSchool.school_ref;
    value.major_ref = this.studentEditForm.rftMajor.major_ref;
    value.create_user = this.studentEditForm.acStudent.create_user;
    value.update_user = this.studentEditForm.acStudent.update_user;
    value.birth_date = this.birthMmonth.toString().concat(this.birthDay.toString()).concat(this.birthYear.toString())
    console.log(value);
    this.studentService.addStudent(value).subscribe(
      (res: Response) => {
        console.log(res.json())
        this.student_ref = res.json().student_ref;
        // console.log(this.student_ref)//3
        this.addAcUser();
      },
      (error) => {
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if (error.status === 409) {
          message = 'มีการใช้เลขประจำตัวประชาชนนี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );
  }

  addAcUser() {
    console.log(this.student_ref);//2
    const value = this.studentFormGroup.value;
    value.user_id = this.studentEditForm.acStudent.personal_id;
    value.password = this.studentEditForm.acStudent.personal_id;
    value.student_ref = this.student_ref;
    value.user_role = '1';
    value.create_user = 'phai';
    value.update_user = 'phai';
    console.log(value);
    this.userService.addUser(value)
    .subscribe(
      (res: Response) => {
        console.log(res.statusText);//4
        this.studentFormGroup.reset();
        this.initialEditForm();
        this.showSuccess('บันทึกข้อมูลผู้ใช้งานเรียบร้อยแล้ว รหัสอ้างอิงคือ ' + this.student_ref);
      },
      (error) => {
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if (error.status === 409) {
          message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );
  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'บันทีกข้อมูลสำเร็จ', detail: message });
  }

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'ไม่สามารถบันทึกข้อมูลได้', detail: message });
  }
}
