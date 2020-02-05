import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { filmListPage } from './filmList.page';

describe('HomePage', () => {
  let component: filmListPage;
  let fixture: ComponentFixture<filmListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ filmListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(filmListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
