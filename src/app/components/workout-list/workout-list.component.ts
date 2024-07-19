import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { WorkoutService } from "../../services/workout.service";

@Component({
  selector: "app-workout-list",
  templateUrl: "./workout-list.component.html",
  styleUrls: ["./workout-list.component.css"],
 
  
})
export class WorkoutListComponent implements OnInit ,OnChanges {
  displayedColumns: string[] = [
    "Name",
    "Workouts",
    "Number of Workouts",
    "Total Workout Minutes",
  ];

  workoutTypes: string[] = ["All", "Running", "Cycling", "Swimming", "Yoga"];
  users = new MatTableDataSource<any>([]);
  filteredUsers = new MatTableDataSource<any>([]);
  selectedValue: string = "";
  @Input()data:any; 
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private workoutService: WorkoutService,private cdr:ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.updatedata();
  }
  
  groupedData: any[] = [];
  ngOnInit(): void {
   this.updatedata();
    
  }
  updatedata(){
    this.users.data = this.workoutService.getUsers();
    console.log(this.data,"aya h");
   
   
    this.groupedData = this.users.data.reduce((acc, obj) => {
      const key = obj.name;
      if (!acc[key]) {
        acc[key] = {
          id: 0,
          name: key,
          type: "",
          minutes: 0,
          numberofworkouts: 0,
        };
        acc[key].id = obj.id;
      }
      acc[key].numberofworkouts = obj.workouts.length;
      let i = 0;
      const uniqueTypes = new Set(acc[key].type.split(",").filter(Boolean));

      while (i < obj.workouts.length) {
        acc[key].minutes += obj.workouts[i].minutes;

        uniqueTypes.add(obj.workouts[i].type);

        i++;
      }
      acc[key].type = Array.from(uniqueTypes).join(",");

      return acc;
    }, {});

    this.filteredUsers.data = Object.values(this.groupedData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.filteredUsers.filter = filterValue.trim().toLowerCase();
  }

  applyTypeFilter(filterValue: string) {
    if (filterValue === "All") {
      this.filteredUsers.data = Object.values(this.groupedData);
    } else {
      this.filteredUsers.data = Object.values(this.groupedData).filter((user) =>
        user.type.includes(filterValue)
      );
    }
  }

  ngAfterViewInit() {
    this.filteredUsers.paginator = this.paginator;
  }
}
