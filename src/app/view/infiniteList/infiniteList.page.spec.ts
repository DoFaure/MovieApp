import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { infiniteListPage } from './infiniteList.page';

describe('HomePage', () => {
  let component: infiniteListPage;
  let fixture: ComponentFixture<infiniteListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ infiniteListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(infiniteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
