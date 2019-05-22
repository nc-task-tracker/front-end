import {Subject} from "rxjs";

export class AutoUnsubscribe {

  protected streamEndSubject = new Subject();

  ngOnDestroy(): void {
    this.streamEndSubject.next();
    this.streamEndSubject.complete();
  }
}
