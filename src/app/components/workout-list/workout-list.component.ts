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
  displayedColumns: string[] = ['Name', 'Workouts','Number of Workouts','Total Workout Minutes'];
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  users = new MatTableDataSource<any>([]);
  filteredUsers = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.users.data = this.workoutService.getUsers();
    console.table(this.users.data);
    const groupedData = this.users.data.reduce((acc, obj) => {
      const key = obj.name;
      if (!acc[key]) {
        acc[key] = { id:0,name:key,type:'', minutes: 0,numberofworkouts:0 };
        acc[key].id=obj.id;
      }
      acc[key].numberofworkouts=obj.workouts.length;
      let i=0;
      while(i<obj.workouts.length){
        acc[key].minutes += obj.workouts[i].minutes;
      
        acc[key].type+=obj.workouts[i].type;
        acc[key].type+=",";
        
        i++;
        
      }

     
      return acc;
    }, {});
   


    
    this.filteredUsers.data = Object.values(groupedData);
    console.table(groupedData);
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

interface WorkoutInter {
  id: number;
  name: string;
  type: string;
  minutes: number;
}
