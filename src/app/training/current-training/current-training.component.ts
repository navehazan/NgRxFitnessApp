import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info-service';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../current-training/stop-training/stop-training.component';
import { Router } from "@angular/router";
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  constructor(public dialog: MatDialog, public router: Router, private infoService: InfoService) { }
  progress = 0;
  timer;
  ngOnInit() {
    this.startExercise();
  }
  startExercise() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 20
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
  stopExercise() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
    });
    dialogRef.afterClosed().subscribe(resultes => {
      if (resultes) {
        clearInterval(this.timer);
        this.infoService.goingTraining$$.next(false);
      } else {
        this.startExercise()
        this.dialog.closeAll();
      }
    })
  }
}
