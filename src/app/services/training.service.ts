import { Exercise } from './../models/exercise.model';
import { Subject, ReplaySubject } from "rxjs";
import { AngularFirestore } from "angularfire2/firestore";
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
@Injectable()
export class TrainingService {
    private currentExercise: Exercise;
    private availableExercise: Exercise[] = [];
    private pastExersice: Exercise[] = [];
    currentTrainingChange$$ = new ReplaySubject<Exercise>(1);
    constructor(private db: AngularFirestore) { }
    getAviableExercise() {
        return this.db.collection("aviableExersice").snapshotChanges().map((results) => {
            return results.map((item) => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                }
            })
        })
    }
    startExercise(id: string) {
        this.currentExercise = this.availableExercise.find(exercise => exercise.id === id);
        this.currentTrainingChange$$.next({ ...this.currentExercise });
    }
    completeExercise() {
        this.pastExersice.push({ ...this.currentExercise, date: new Date(), state: "completed" })
        this.currentExercise = null;
        this.currentTrainingChange$$.next(null);
    }
    cancelExercise(progress: number) {
        this.pastExersice.push({
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
        return [...this.pastExersice];
    }

}