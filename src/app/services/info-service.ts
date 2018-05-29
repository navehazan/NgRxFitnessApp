import { Subject } from "rxjs";
export class InfoService {
    sidenav$$ = new Subject<string>();
    goingTraining$$ = new Subject<boolean>();
}