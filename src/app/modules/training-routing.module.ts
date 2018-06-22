import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from '../components/training/training.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    { path: '', component: TrainingComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TrainingRoutingModule { }