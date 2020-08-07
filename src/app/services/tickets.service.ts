import {Injectable} from '@angular/core';
import {Ticket} from '../model/ticket';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  // уникальность билетов, каждый из них представлен в виде json строки
  private tickets: Set<string> = new Set<string>(JSON.parse(localStorage.getItem('ticketsList')));
  /*хранилище, на которое можно подписаться, чтобы следить за состоянием билетов*/
  public observableTickets: Subject<Ticket[]> = new Subject<Ticket[]>();

  constructor() {
    // инициализация табл данными
    if (localStorage.getItem('isFirstRun') == null){
      localStorage.setItem('isFirstRun', 'false' );
      this.addTicket(JSON.stringify(new Ticket('№ 074Е', 'Санкт-Петербург', '24.09.2020', '14:01',
        'Екатеринбург', '26.09.2020', '03:41')));
      this.addTicket(JSON.stringify(new Ticket('№ 076Е', 'Санкт-Петербург', '27.09.2020', '16:01',
        'Екатеринбург', '29.09.2020', '05:41')));
    }
  }

  addTicket(ticket: string): void {
    this.tickets.add(ticket);
    localStorage.setItem('ticketsList', JSON.stringify(Array.from(this.tickets)));
  }

  removeTicket(ticket: string): void {
    console.log('delete' + JSON.stringify(ticket));
    this.tickets = new Set<string>(JSON.parse(localStorage.getItem('ticketsList')));
    this.tickets.delete(ticket);
    localStorage.setItem('ticketsList', JSON.stringify(Array.from(this.tickets)));
  }

  // получение билетов из локального хранилища
  getTickets(): void {
    this.observableTickets.next(JSON.parse(localStorage.getItem('ticketsList')).map((item) =>
      JSON.parse(item)) as Ticket[]);
  }
}
