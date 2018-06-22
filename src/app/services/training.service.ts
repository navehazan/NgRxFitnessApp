import { Exercise } from './../models/exercise.model';
import { Subject, ReplaySubject, Subscription } from "rxjs";
import { AngularFirestore } from "angularfire2/firestore";
import { takeUntil, map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { UiService } from './ui.service';
@Injectable()
export class TrainingService {
    private currentExercise: Exercise;
    private availableExercise: Exercise[] = [];
    private pastExersice: Exercise[] = [];
    currentTrainingChange$$ = new ReplaySubject<Exercise>(1);
    exercisesChanged$ = new Subject<Exercise[]>();
    pastExercisesChanged$ = new Subject<Exercise[]>();
    ngUnsubscribe1$: Subscription;
    ngUnsubscribe2$: Subscription;
    constructor(private db: AngularFirestore, private uiService: UiService) { }
    getAviableExercise() {
        this.uiService.loadingStateChanged$.next(true);
        this.ngUnsubscribe1$ = this.db.collection("aviableExersice").snapshotChanges().pipe(map((results) => {
            return results.map((item) => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                }
            })
        })).subscribe((exersices: Exercise[]) => {
            this.availableExercise = exersices;
            this.exercisesChanged$.next([...this.availableExercise])
            this.uiService.loadingStateChanged$.next(false);
        }, (err) => {
            this.uiService.loadingStateChanged$.next(false);
            this.uiService.showSnackbar("fetching exersice failed", null, 3000);
        })
    }
    startExercise(id: string) {
        this.currentExercise = this.availableExercise.find(exercise => exercise.id === id);
        this.currentTrainingChange$$.next({ ...this.currentExercise });
    }
    completeExercise() {
        this.saveDataToDb({ ...this.currentExercise, date: new Date(), state: "completed" })
        this.currentExercise = null;
        this.currentTrainingChange$$.next(null);
    }
    cancelExercise(progress: number) {
        this.saveDataToDb({
            ...this.currentExercise,
            date: new Date(),
            state: "cancelled",
            duration: this.currentExercise.duration * (progress / 100),
            calories: this.currentExercise.calories * (progress / 100)
        })
        this.currentExercise = null;
        this.currentTrainingChange$$.next(null);
    }
    getPastExercise() {
        this.ngUnsubscribe2$ = this.db.collection("finishExersices").valueChanges().subscribe((res: Exercise[]) => {
            this.pastExercisesChanged$.next([...res])
        })
    }
    private saveDataToDb(exercise: Exercise) {
        this.db.collection("finishExersices").add(exercise);
    }
    cancelSubscribtion() {
        this.ngUnsubscribe1$.unsubscribe();
        this.ngUnsubscribe2$.unsubscribe();
    }

}