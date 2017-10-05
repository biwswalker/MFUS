import { Response } from '@angular/http';
import { SmNews } from './../../models/sm-news';
import { NewsForm } from './../../form/news-form';
import { SelectItem, Message } from 'primeng/primeng';
import { NewsService } from '../../../services/news.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css', '../pages.component.css']
})
export class NewsComponent implements OnInit {

  msgs: Message[];

  mode = 'S'; // I-insert, U-update, S-search

  newsForm: NewsForm = new NewsForm();
  newsFormGroup: FormGroup;

  statusList: SelectItem[];

  image: any;
  fileList: FileList;
  binaryString: string;
  file: File;


  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getStatusList();
    this.initEditData();
  }

  initEditData() {
    this.newsForm = new NewsForm();
    this.newsForm.smNews.active_flag = 'Y';
    this.newsForm.smNews.create_user = 'phai';
    this.newsForm.smNews.update_user = 'phai';
    this.validatorEditForm();
  }

  validatorEditForm() {
    this.newsFormGroup = new FormGroup({
      'news_topic': new FormControl(this.newsForm.smNews.news_topic,
        Validators.compose([Validators.required])),
      'news_detail': new FormControl(this.newsForm.smNews.news_detail,
        Validators.compose([Validators.required])),
      'news_image': new FormControl(this.newsForm.smNews.news_image),
      'publish_date': new FormControl(this.newsForm.smNews.publish_date),
      'active_flag': new FormControl(this.newsForm.smNews.active_flag)
    });
  }

  onSubmit() {
    console.log('form: ', this.newsForm);
    this.addNews();
    if (this.mode === 'I') {

    } else if (this.mode === 'U') {
      this.updateNews();
    }
  }

  addNews() {
    console.log('addNews.value: ', this.newsFormGroup.value);
    const value = this.newsFormGroup.value;
    value.news_image = this.fileList;
    value.active_flag = 'Y';
    console.log('value is : ', value);

    this.newsService.addNews(value);
  }
  // this.majorService.addMajor(value)
  // .subscribe(
  //   (res: Response) => {
  //     let major_ref = res.json().major_ref;
  //     console.log(res.json());
  //     console.log(res.json().major_ref);
  //     console.log(res.statusText);

  //     this.majorFormGroup.reset();

  //     this.initEditData();

  //     this.showSuccess('บันทึกข้อมูลสาขาวิชาเรียบร้อยแล้ว รหัสอ้างอิงคือ ' + major_ref);

  //   },
  //   (error) => {
  //     console.log(error);
  //     let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
  //     if(error.status == 409) {
  //       message = 'มีการใช้รหัสสาขาวิชานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
  //     }
  //     this.showError(message);
  //     return;
  //   }
  // );
  updateNews() {

  }

  onUpload(event) {
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.file = this.fileList[0];
      // 10 MB
      if (this.file.size < 10000000) {
        const reader = new FileReader();
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

  // dropdown
  getStatusList() {
    this.statusList = [];
    this.statusList.push({ label: '', value: '' });
    this.statusList.push({ label: 'ใช้งาน', value: 'Y' });
    this.statusList.push({ label: 'ไม่ใช้งาน', value: 'N' });
  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'บันทีกข้อมูลสำเร็จ', detail: message});
  }
}
