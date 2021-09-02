import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-component-template',
  templateUrl: './my-component-template.component.html',
  styleUrls: ['./my-component-template.component.css']
})
export class MyComponentTemplateComponent implements OnInit {
  fullName = 'Name';
  @Input()
  set name(name) {
    this.fullName = name;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
