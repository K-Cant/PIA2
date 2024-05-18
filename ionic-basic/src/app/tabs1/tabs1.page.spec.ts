import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tabs1Page } from './tabs1.page';

describe('Tabs1Page', () => {
  let component: Tabs1Page;
  let fixture: ComponentFixture<Tabs1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabs1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
