import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserComponent } from './other-user.component';

describe('OtherUserComponent', () => {
  let component: OtherUserComponent;
  let fixture: ComponentFixture<OtherUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherUserComponent]
    });
    fixture = TestBed.createComponent(OtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
