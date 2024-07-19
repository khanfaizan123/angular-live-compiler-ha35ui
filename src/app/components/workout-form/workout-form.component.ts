import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';


@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent implements OnInit {
  workoutForm: FormGroup;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  workouts: any[] = [];
  constructor(private fb: FormBuilder, private workoutService: WorkoutService,private cdr:ChangeDetectorRef) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.workoutForm.valid) {
      const { name, type, minutes } = this.workoutForm.value;
      this.workouts = [...this.workouts, this.workoutForm.value];
      const newUser = { id: Date.now(), name, workouts: [{ type, minutes }] };
      this.workoutService.addUser(newUser);
      //this.workoutForm.reset();
      this.workoutForm.reset({
        name: null,
        type: null,
        minutes: null,
      });
      this.cdr.detectChanges();
  
      // Mark the entire form as pristine and untouched
      this.workoutForm.markAsPristine();
      this.workoutForm.markAsUntouched();
    }
  }
}
