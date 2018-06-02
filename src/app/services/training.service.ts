import { Exercise } from './../models/exercise.model';
import { Subject, ReplaySubject } from "rxjs";

export class TrainingService {
    private currentExercise: Exercise;
    private availableExercise: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private pastExersice: Exercise[] = [];
    currentTrainingChange$$ = new ReplaySubject<Exercise>(1);
    getAviableExercise() {
        return [...this.availableExercise];
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