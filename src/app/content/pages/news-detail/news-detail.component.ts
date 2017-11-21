import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { Validators } from '@angular/forms';
import { NgProgress } from 'ngx-progressbar';
import { NewsForm } from "../../form/news-form";
import { NewsService } from './../../../services/news.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css', '../pages.component.css']
})
export class NewsDetailComponent implements OnInit {

  newsForm: NewsForm = new NewsForm();
  criteriaForm: NewsForm = new NewsForm();
  dateString: any;
  newDate: any;
  private sub: any;
  private newsref: any;

  constructor(public ngProgress: NgProgress,public newsService: NewsService,private route: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.newsref = params['id']; // (+) converts string 'id' to a number
   });
    this.ngProgress.start();
    this.newsForm = new NewsForm;
    this.onSearch();

    setTimeout(
      () =>  this.ngProgress.done(),2000
    );
  }

  onSearch() : NewsForm{
    this.criteriaForm = new NewsForm;
    this.criteriaForm.smNews.news_ref = this.newsref;
    this.newsService.searchNews(this.criteriaForm)
    .subscribe(
      result => {        
        this.newsForm = result[0];
      },
      (error) => {
       this.newsForm = null;
      }
    );
    return this.newsForm;
  }



}
