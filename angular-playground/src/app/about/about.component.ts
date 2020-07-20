import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  nameVal;
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {}
  goTo(id) {
    const el = document.getElementById(id);
    el.scrollIntoView();
  }

  onKey($event: any) {
    this.nameVal = $event.target.value + ' | ';
  }
}
