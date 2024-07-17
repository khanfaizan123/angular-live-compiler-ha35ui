import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'workouts'];
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  users = new MatTableDataSource<any>([]);
  filteredUsers = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.users.data = this.workoutService.getUsers();
    this.filteredUsers.data = this.users.data;
    this.filteredUsers.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.filteredUsers.filter = filterValue.trim().toLowerCase();
  }

  applyTypeFilter(filterValue: string) {
    this.filteredUsers.data = this.users.data.filter((user) =>
      user.workouts.some((workout) => workout.type === filterValue)
    );
  }
}
