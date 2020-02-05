import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabFilm } from './tabFilm.page';

describe('TabFilm', () => {
  let component: TabFilm;
  let fixture: ComponentFixture<TabFilm>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabFilm],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabFilm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
