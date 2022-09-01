import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbunCardsComponent } from './albun-cards.component';

describe('AlbunCardsComponent', () => {
  let component: AlbunCardsComponent;
  let fixture: ComponentFixture<AlbunCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbunCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbunCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
