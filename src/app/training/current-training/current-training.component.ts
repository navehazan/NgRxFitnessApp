import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info-service';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../current-training/stop-training/stop-training.component';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  progress = 0;
  timer;
  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 20
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
  stopExercise() {
    clearInterval(this.timer);
    this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
    });
  }
}
