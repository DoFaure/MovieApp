import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabProfilPage } from './tabProfil.page';

describe('TabProfilPage', () => {
  let component: TabProfilPage;
  let fixture: ComponentFixture<TabProfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabProfilPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
