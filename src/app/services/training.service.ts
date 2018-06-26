import { Exercise } from './../models/exercise.model';
import { Subject, ReplaySubject, Subscription } from "rxjs";
import { AngularFirestore } from "angularfire2/firestore";
import { takeUntil, map, take } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { UiService } from './ui.service';
import { Store } from '@ngrx/store';
import * as UI from "../actions/ui.action";
import * as TRAINING from "../actions/training.action";
import * as fromApp from "../app.reducer";
@Injectable()
export class TrainingService {
    constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromApp.State>) { }
    getAviableExercise() {
        this.store.dispatch(new UI.Start())
        this.db.collection("aviableExersice").snapshotChanges().pipe(map((results) => {
            return results.map((item) => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                }
            })
        })).subscribe((exersices: Exercise[]) => {
            this.store.dispatch(new TRAINING.SetAviableExersices(exersices))
            this.store.dispatch(new UI.End())
        }, (err) => {
            this.store.dispatch(new UI.End())
        })
    }
    startExercise(id: string) {
        this.store.dispatch(new TRAINING.SetCurrentExersice(id));
    }
    completeExercise() {
        this.store.select("training").pipe(take(1)).subscribe((state) => {
            state.currentExersice;
            this.saveDataToDb({ ...state.currentExersice, date: new Date(), state: "completed" })
            this.store.dispatch(new TRAINING.StopCurrentExersice());
        })

    }
    cancelExercise(progress: number) {
        this.store.select("training").pipe(take(1)).subscribe((state) => {
            state.currentExersice;
            this.saveDataToDb({
                ...state.currentExersice, date: new Date(),
                state: "cancelled",
                duration: state.currentExersice.duration * (progress / 100),
                calories: state.currentExersice.calories * (progress / 100)
            })
            this.store.dispatch(new TRAINING.StopCurrentExersice());
        })

    }
    getPastExercise() {
        this.db.collection("finishExersices").valueChanges().subscribe((res: Exercise[]) => {
            this.store.dispatch(new TRAINING.SetPastExersices([...res]))
        }, (err) => { })
    }
    private saveDataToDb(exercise: Exercise) {
        this.db.collection("finishExersices").add(exercise);
    }

}