import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info-service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
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
  }
}
