import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';


@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent implements OnInit {
  workoutForm: FormGroup;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(private fb: FormBuilder,private workoutService:WorkoutService) {
    this.workoutForm = this.fb.group({
      name: [''],
      type: [''],
      minutes: [0],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const { name, type, minutes } = this.workoutForm.value;
    const newUser = { id: Date.now(), name, workouts: [{ type, minutes }] };
    this.workoutService.addUser(newUser);
    this.workoutForm.reset();
  }
}
