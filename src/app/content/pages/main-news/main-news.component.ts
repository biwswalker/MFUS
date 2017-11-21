import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { Validators } from '@angular/forms';
import { NewsForm } from "../../form/news-form";
import { NewsService } from './../../../services/news.service';
import { NgProgress } from 'ngx-progressbar';


@Component({
  selector: 'app-main-news',
  templateUrl: './main-news.component.html',
  styleUrls: ['./main-news.component.css', '../pages.component.css']
})
export class MainNewsComponent implements OnInit {
newsFormGroup: FormGroup;
msgs: Message[] = [];
newsForm: NewsForm = new NewsForm();
criretiaForm: NewsForm = new NewsForm();
newsList: NewsForm[] = [];
dateString: any;
newDate: any;

  constructor(public ngProgress: NgProgress,public newsService: NewsService) { }

  ngOnInit() {
    this.ngProgress.start();
    this.criretiaForm = new NewsForm();
    this.onSearch();
    this.dateString = '1968-11-16T00:00:00' 
    this.newDate = new Date(this.dateString);
    setTimeout(
      () =>  this.ngProgress.done(),2000
    );
   
  }

  onSearch(){
    this.newsList = [];
    this.searchNews();
   
  }

  searchNews(): NewsForm[] {
    let resultList: NewsForm[] = [];
    this.newsService.searchNews(this.criretiaForm)
    .subscribe(
      result => {        
        this.newsList = result;
      },
      (error) => {
        this.showError(error);
      }
    );
   
    return resultList;
    
  }

  showError(message: string){
    this.msgs = [];
    this.msgs.push({severity:'error',summary:'พบข้อผิดพลาด',detail: message});
  }
}
