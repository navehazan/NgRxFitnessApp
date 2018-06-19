import { Exercise } from './../models/exercise.model';
import { Subject, ReplaySubject, Subscription } from "rxjs";
import { AngularFirestore } from "angularfire2/firestore";
import { takeUntil, map } from "rxjs/operators";
import { Injectable } from '@angular/core';
@Injectable()
export class TrainingService {
    private currentExercise: Exercise;
    private availableExercise: Exercise[] = [];
    private pastExersice: Exercise[] = [];
    currentTrainingChange$$ = new ReplaySubject<Exercise>(1);
    exercisesChanged$ = new Subject<Exercise[]>();
    pastExercisesChanged$ = new Subject<Exercise[]>();
    ngUnsubscribe$ = new Subject();
    constructor(private db: AngularFirestore) { }
    getAviableExercise() {
        this.db.collection("aviableExersice").snapshotChanges().pipe(takeUntil(this.ngUnsubscribe$), map((results) => {
            return results.map((item) => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                }
            })
        })).subscribe((exersices: Exercise[]) => {
            this.availableExercise = exersices;
            this.exercisesChanged$.next([...this.availableExercise])
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
        this.db.collection("finishExersices").valueChanges().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: Exercise[]) => {
            this.pastExercisesChanged$.next([...res])
        })
    }
    private saveDataToDb(exercise: Exercise) {
        this.db.collection("finishExersices").add(exercise);
    }
    cancelSubscription() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();

    }
}