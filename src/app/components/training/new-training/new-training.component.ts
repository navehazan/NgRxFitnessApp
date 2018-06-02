import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../../services/info-service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  constructor(private infoService: InfoService) { }

  onGoingTraining() {
    this.infoService.goingTraining$$.next(true);
  }
  ngOnInit() {
  }

}
