import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css','../../pages.component.css']
})
export class InputTextComponent implements OnInit {

  textStr: string;

  constructor() { }

  ngOnInit() {
  }

}
