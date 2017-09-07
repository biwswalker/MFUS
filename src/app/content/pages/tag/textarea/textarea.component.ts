import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css', '../../pages.component.css']
})
export class TextareaComponent implements OnInit {

  // Value
  textareaValue: string;

  constructor() { }

  ngOnInit() {
  }

}
