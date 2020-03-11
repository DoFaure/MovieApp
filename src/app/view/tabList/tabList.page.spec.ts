import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabList } from './tabList.page';

describe('TabList', () => {
  let component: TabList;
  let fixture: ComponentFixture<TabList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabList],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
