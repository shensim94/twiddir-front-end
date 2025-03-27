import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetPageComponent } from './tweet-page.component';

describe('TweetPageComponent', () => {
  let component: TweetPageComponent;
  let fixture: ComponentFixture<TweetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TweetPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
