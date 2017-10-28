import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Response } from '@angular/http';
import { Validators } from '@angular/forms';
import { TitleNameForm } from "../../form/titlename-form";

@Component({
  selector: 'app-titlename',
  templateUrl: './titlename.component.html',
  styleUrls: ['./titlename.component.css', '../pages.component.css']
})
export class TitlenameComponent implements OnInit {

  //mode
  mode: string = 'S'; // I-insert, U-update, S-search
  //message
  msgs: Message[] = [];

  //insert
  titleNameForm: TitleNameForm = new TitleNameForm();
  titleNameFormGroup: FormGroup;

  //search


  constructor() { }

  ngOnInit() {

  }

    onPageInsert() {}
    onResetSearch() {}
    onSearch() {}

}
