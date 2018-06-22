import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { TrainingComponent } from '../components/training/training.component';
import { CurrentTrainingComponent } from '../components/training/current-training/current-training.component';
import { NewTrainingComponent } from '../components/training/new-training/new-training.component';
import { PastTrainingsComponent } from '../components/training/past-trainings/past-trainings.component';
import { StopTrainingComponent } from '../components/training/current-training/stop-training/stop-training.component';
@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    entryComponents: [
        StopTrainingComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ],
    exports: []
})
export class TrainingModule { }