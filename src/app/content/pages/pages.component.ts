import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private authenService: AuthenticationService) { }

  ngOnInit() {
  }

}
