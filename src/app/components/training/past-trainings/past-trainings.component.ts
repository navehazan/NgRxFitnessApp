import { takeUntil } from 'rxjs/operators';
import { Exercise } from './../../../models/exercise.model';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../../../services/training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subject } from "rxjs";
@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private trainingService: TrainingService) { }
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ["date", "name", "calories", "duration", "state"];
  ngUnsubscribe$ = new Subject();
  ngOnInit() {
    this.trainingService.getPastExercise();
    this.trainingService.pastExercisesChanged$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((exersice: Exercise[]) => {
      this.dataSource.data = exersice;
    })

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
