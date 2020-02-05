import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabSerie } from './tabSerie.page';

describe('TabSerie', () => {
  let component: TabSerie;
  let fixture: ComponentFixture<TabSerie>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabSerie],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabSerie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
