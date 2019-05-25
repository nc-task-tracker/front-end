import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Ticket} from "../models/ticket.model";

@Injectable()
export class EmailSenderService {

  private readonly SEND_EMAIL_URL = '/api/email';

  constructor(private httpClient: HttpClient){}

  sendEmail(ticket: Ticket): Observable<{}>{
    return this.httpClient.put(`${this.SEND_EMAIL_URL}/send/${name}`,ticket)
      .pipe(catchError((error: any) => throwError(error.error)));
  }
}

