import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material";
@Injectable()
export class UiService {
    constructor(private snackBar: MatSnackBar) { }
    sidenav$ = new Subject<string>();
    showSnackbar(messege, action, duration) {
        this.snackBar.open(messege, action, { duration })
    }
}