import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../../services/workout.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutServiceMock: any;

  beforeEach(async () => {
    workoutServiceMock = {
      addUser: jasmine.createSpy('addUser').and.returnValue(of(null))
    };

    await TestBed.configureTestingModule({
      declarations: [WorkoutFormComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatOptionModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceMock },
        ChangeDetectorRef
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.workoutForm).toBeDefined();
    expect(component.workoutForm.controls['name']).toBeDefined();
    expect(component.workoutForm.controls['type']).toBeDefined();
    expect(component.workoutForm.controls['minutes']).toBeDefined();
  });

  it('should be invalid when required fields are empty', () => {
    component.workoutForm.controls['name'].setValue('');
    component.workoutForm.controls['type'].setValue('');
    component.workoutForm.controls['minutes'].setValue('');
    expect(component.workoutForm.invalid).toBeTrue();
  });

  it('should be valid when all required fields are filled', () => {
    component.workoutForm.controls['name'].setValue('John Doe');
    component.workoutForm.controls['type'].setValue('Running');
    component.workoutForm.controls['minutes'].setValue(30);
    expect(component.workoutForm.valid).toBeTrue();
  });

  it('should validate minutes field to be at least 1', () => {
    component.workoutForm.controls['minutes'].setValue(0);
    expect(component.workoutForm.controls['minutes'].hasError('min')).toBeTrue();
  });

  it('should call workoutService.addUser on form submission', () => {
    component.workoutForm.controls['name'].setValue('John Doe');
    component.workoutForm.controls['type'].setValue('Running');
    component.workoutForm.controls['minutes'].setValue(30);

    component.onSubmit();

    expect(workoutServiceMock.addUser).toHaveBeenCalledWith({
      id: jasmine.any(Number),
      name: 'John Doe',
      workouts: [{ type: 'Running', minutes: 30 }]
    });
  });

  it('should reset the form after submission', () => {
    component.workoutForm.controls['name'].setValue('John Doe');
    component.workoutForm.controls['type'].setValue('Running');
    component.workoutForm.controls['minutes'].setValue(30);

    component.onSubmit();

    expect(component.workoutForm.controls['name'].value).toBeNull();
    expect(component.workoutForm.controls['type'].value).toBeNull();
    expect(component.workoutForm.controls['minutes'].value).toBeNull();
  });

  it('should mark form as pristine and untouched after submission', () => {
    component.workoutForm.controls['name'].setValue('John Doe');
    component.workoutForm.controls['type'].setValue('Running');
    component.workoutForm.controls['minutes'].setValue(30);

    component.onSubmit();

    expect(component.workoutForm.pristine).toBeTrue();
    expect(component.workoutForm.untouched).toBeTrue();
  });

  it('should not call workoutService.addUser if form is invalid', () => {
    component.workoutForm.controls['name'].setValue('');
    component.workoutForm.controls['type'].setValue('');
    component.workoutForm.controls['minutes'].setValue('');

    component.onSubmit();

    expect(workoutServiceMock.addUser).not.toHaveBeenCalled();
  });
});
