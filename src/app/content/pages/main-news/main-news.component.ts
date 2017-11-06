import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { Validators } from '@angular/forms';
import { NewsForm } from "../../form/news-form";

@Component({
  selector: 'app-main-news',
  templateUrl: './main-news.component.html',
  styleUrls: ['./main-news.component.css', '../pages.component.css']
})
export class MainNewsComponent implements OnInit {
arrnum = [1,2,3,4,5];
  constructor() { }

  ngOnInit() {
  }

}
