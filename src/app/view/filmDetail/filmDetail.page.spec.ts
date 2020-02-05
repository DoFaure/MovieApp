import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { filmDetailPage } from './filmDetail.page';

describe('HomePage', () => {
  let component: filmDetailPage;
  let fixture: ComponentFixture<filmDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ filmDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(filmDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
