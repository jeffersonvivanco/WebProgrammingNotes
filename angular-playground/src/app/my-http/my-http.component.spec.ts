import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHttpComponent } from './my-http.component';

describe('MyHttpComponent', () => {
  let component: MyHttpComponent;
  let fixture: ComponentFixture<MyHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHttpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
