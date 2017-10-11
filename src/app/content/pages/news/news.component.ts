import { Response } from '@angular/http';
import { SelectItem, Message } from 'primeng/primeng';
import { NewsService } from '../../../services/news.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NewsForm } from '../../form/news-form';
import * as moment from 'moment';

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
  criteriaNewsForm: NewsForm = new NewsForm();

  newsSelected: NewsForm;

  statusList: SelectItem[];

  newsFormList: NewsForm[] = [];

  image: any;
  fileList: FileList;
  binaryString: string;
  file: File;


  onrowDate: string;
  minDate: Date;
  preview = false;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getStatusList();
    this.initEditData();
    this.minDate = new Date();
    this.minDate.getDate();
  }

  initEditData() {
    this.newsForm = new NewsForm();
    this.newsForm.smNews.active_flag = 'Y';
    this.newsForm.smNews.create_user = 'phai';
    this.newsForm.smNews.update_user = 'phai';
    this.validatorEditForm();
  }

  initSearchData() {
    this.criteriaNewsForm = new NewsForm();
    this.newsSelected = new NewsForm();
    this.newsFormList = [];
  }
  validatorEditForm() {
    this.newsFormGroup = new FormGroup({
      'news_topic': new FormControl(this.newsForm.smNews.news_topic,
        Validators.compose([Validators.required])),
      'news_detail': new FormControl(this.newsForm.smNews.news_detail,
        Validators.compose([Validators.required])),
      'news_image': new FormControl(this.newsForm.smNews.news_image),
      'publish_date': new FormControl(this.newsForm.smNews.publish_date,
        Validators.compose([Validators.required])),
      'active_flag': new FormControl(this.newsForm.smNews.active_flag),
      'news_ref': new FormControl(this.newsForm.smNews.news_ref),
    });

    if(this.mode == 'I') {
      this.newsFormGroup.controls['active_flag'].disable();
    }else if (this.mode == 'U') {
      this.newsFormGroup.controls['active_flag'].enable();
    }

  }

  onSubmit() {
    console.log('form: ', this.newsForm);

    if (this.mode === 'I') {
      this.addNews();
    } else if (this.mode === 'U') {
      this.updateNews();
    }
  }

  addNews() {
    console.log('addNews.value: ', this.newsFormGroup.value);

    const value = this.newsFormGroup.value;
    value.news_image = this.image;
    value.news_name = this.file.name;
    value.news_type = this.file.type;

    value.publish_date = moment(value.publish_date).format('YYYY-MM-DD');
    value.active_flag = 'Y';
    value.create_user = 'phai';
    value.update_user = 'phai';
    console.log('value is : ', value);

    this.newsService.addNews(value)
      .subscribe(
      (res: Response) => {
        const news_ref = res.json().news_ref;
        console.log(res.json());
        console.log(res.json().news_ref);
        console.log(res.statusText);

        this.newsFormGroup.reset();

        this.initEditData();

        this.showSuccess('บันทึกข้อมูลข่าวสารเรียบร้อยแล้ว รหัสอ้างอิงคือ ' + news_ref);

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
  onPageSearch() {
    this.mode = 'S';
    this.initSearchData();
  }

  onSearchNews() {
    this.newsFormList = [];
    console.log('Criteria : ', this.criteriaNewsForm);
    this.SearchNews();
  }

  SearchNews() {
    const resultList: NewsForm[] = [];
    // this.criteriaNewsForm.startDate = moment(this.criteriaNewsForm.startDate).format('YYYY-MM-DD');
    // this.criteriaNewsForm.endDate = moment(this.criteriaNewsForm.endDate).format('YYYY-MM-DD');
    this.newsService.searchNews(this.criteriaNewsForm)
      .subscribe(
      result => {
        console.log(result.length);
        this.newsFormList = result;
        console.log('newsFormList: ', this.newsFormList);
      },
      (error) => {
        console.log(error);
        this.showError(error);
      }
      );
  }

  resetSearch() {
    this.criteriaNewsForm = new NewsForm();
    this.newsFormList = [];
  }
  onRowSelect(event) {
    console.log('selectedNews', this.newsSelected);
    console.log(event.data);
    this.mode = 'U';
    // this.onrowDate = moment(this.newsSelected.smNews.publish_date).format('YYYY-MM-DD');;

    this.newsForm = new NewsForm();
    this.newsForm = event.data;
    this.newsForm.smNews.publish_date = moment(this.newsSelected.smNews.publish_date).toDate();
    console.log('image: ', this.newsForm.smNews.news_image);
    console.log('DateFormat',this.newsForm.smNews.publish_date);
    this.validatorEditForm();

    console.log(this.newsForm.smNews);
  }

  updateNews() {
    console.log(this.newsFormGroup.value);
    const value = this.newsFormGroup.value;
    value.news_image = this.image;
    if( this.file.name != null){
      value.news_name = this.file.name;
    }
    value.news_type = this.file.type;
    value.publish_date = moment(value.publish_date).format('YYYY-MM-DD');
    console.log(this.newsFormGroup.value.news_ref);
    this.newsService.updateNews(value, this.newsForm.smNews.news_ref)
    .subscribe(
      (res: Response) => {
        let school_ref = res.json().school_ref;
        console.log(res.json());
        console.log(res.json().school_ref);
        console.log(res.statusText);

        this.newsFormGroup.reset();

        this.onPageSearch();

        this.showSuccess('แก้ไขข้อมูลสาขาวิชาเรียบร้อยแล้ว');

      },
      (error) =>{
        console.log(error);
        let message = 'กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        if(error.status == 409) {
          message = 'มีการใช้รหัสสาขาวิชานี้แล้ว กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง';
        }
        this.showError(message);
        return;
      }
    );

  }

  // dropdown
  getStatusList() {
    this.statusList = [];
    this.statusList.push({ label: '', value: '' });
    this.statusList.push({ label: 'ใช้งาน', value: 'Y' });
    this.statusList.push({ label: 'ไม่ใช้งาน', value: 'N' });
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

  resetForm() {
    this.initEditData();
  }
  onPreview() {
    console.log('onPreview');
    this.preview = !this.preview;
  }

  onInsertNews() {
    this.mode = 'I';
    this.preview = false;
    this.initEditData();
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
