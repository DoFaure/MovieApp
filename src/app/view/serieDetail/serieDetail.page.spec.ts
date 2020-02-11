import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { SerieDetailPage } from './serieDetail.page';

describe('SerieDetailPage', () => {
  let component: SerieDetailPage;
  let fixture: ComponentFixture<SerieDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
