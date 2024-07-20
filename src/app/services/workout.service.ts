import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private defaultUsers: User[] = [
    { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
    { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
    { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] },
  ];

  constructor() {}

  getUsers(): User[] {
    
      const users = localStorage.getItem('users');
      if(users){
       return JSON.parse(users);
      }else if(!users){
           return this.defaultUsers;
      }else if(!this.defaultUsers && !users){
           return [];
      }
    
  }
  

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
}
