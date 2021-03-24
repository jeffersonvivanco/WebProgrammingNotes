import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nums = new Set([1, 1, 2, 3, 4, 5]);
  constructor() { }

  ngOnInit(): void {}

}
