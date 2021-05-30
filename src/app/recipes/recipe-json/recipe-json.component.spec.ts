import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeJsonComponent } from './recipe-json.component';

describe('RecipeJsonComponent', () => {
  let component: RecipeJsonComponent;
  let fixture: ComponentFixture<RecipeJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
