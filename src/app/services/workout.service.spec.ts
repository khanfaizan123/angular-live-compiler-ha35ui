import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let localStorageMock: any;

  beforeEach(() => {
    localStorageMock = {
      getItem: jasmine.createSpy('getItem'),
      setItem: jasmine.createSpy('setItem'),
      clear: jasmine.createSpy('clear')
    };

    TestBed.configureTestingModule({
      providers: [
        WorkoutService,
        { provide: localStorage, useValue: localStorageMock }
      ]
    });
    service = TestBed.inject(WorkoutService);
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  

  it('should return users from localStorage if they exist', () => {
    const mockUsers = JSON.stringify([
      { id: 4, name: 'Bob White', workouts: [{ type: 'Cycling', minutes: 30 }] }
    ]);

    localStorageMock.getItem.and.returnValue(mockUsers);
    const users = service.getUsers();
    
    expect(users[3].name).toBe('Bob White');
  });

  
  
 
});
