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
    if (!data) {
      console.error('data cannot be null or undefined', data);
      return;
    }
    if (typeof data === 'string') {
      console.log('data was passed as a string but object is needed');
      if (!this.isStringDataOk(data)) {
        console.error('data is not a valid string', data);
        return;
      }
      this.info = JSON.parse(data);
    } else if (typeof data === 'object') {
      this.info = data;
    } else {
      console.error('initData must either be a string or an object', data);
    }
  }
  @Output() sayHiEvent = new EventEmitter<any>();
  constructor() {}
  ngOnInit(): void {}
  @Input()
  get actions() {
    return {
      save: this.save,
      cancel: this.cancel
    };
  }
  private isStringDataOk(data) {
    const d = data.trim();
    return !(d.length === 0 || d === 'null' || d === 'undefined');
  }
  sayHi() {
    console.log('sayHiEvent emitting message');
    this.sayHiEvent.emit({message: 'HI!!!'});
  }
  save() {
    console.log('saving ...');
  }
  cancel() {
    console.log('cancelling ...');
  }
}
