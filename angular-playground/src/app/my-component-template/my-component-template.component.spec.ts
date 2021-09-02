import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComponentTemplateComponent } from './my-component-template.component';

describe('MyComponentTemplateComponent', () => {
  let component: MyComponentTemplateComponent;
  let fixture: ComponentFixture<MyComponentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyComponentTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
