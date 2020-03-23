import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {
  info: {
    name: string
  };
  @Input()
  set initData(data) {
    console.log('data passed to basic form', data);
    if (typeof data === 'string') {
      this.info = JSON.parse(data);
    } else {
      this.info = data;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }
  sayHi() {
    window.alert('Hi!');
  }

}
