import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
      console.log('data was passed as a string but object is needed');
      this.info = JSON.parse(data);
    } else {
      this.info = data;
    }
  }
  @Output() sayHiEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  sayHi() {
    console.log('sayHiEvent emitting message');
    this.sayHiEvent.emit({message: 'HI!!!'});
  }

}
