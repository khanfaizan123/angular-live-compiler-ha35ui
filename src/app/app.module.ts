import {
  Compiler,
  CompilerFactory,
  COMPILER_OPTIONS,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { MatButtonModule } from '@angular/material/button';

import { MatSelectModule } from '@angular/material/select';
import { WorkoutService } from './services/workout.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule, // Add MatFormFieldModule
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    WorkoutListComponent,
    WorkoutFormComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    WorkoutService,
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS],
    },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] },
    WorkoutService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
})
export class AppModule {}

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}
