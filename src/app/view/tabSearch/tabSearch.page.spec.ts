import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabSearchPage } from './tabSearch.page';

describe('TabSearchPage', () => {
  let component: TabSearchPage;
  let fixture: ComponentFixture<TabSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabSearchPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
