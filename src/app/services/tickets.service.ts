import {Injectable} from '@angular/core';
import {Ticket} from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private tickets: Ticket[] = JSON.parse(localStorage.getItem('ticketsList'));
  private readonly ticket: Ticket;

  constructor() {
    this.ticket = new Ticket('№ 074Е', 'Санкт-Петербург', '24.09.2020', '14:01',
      'Екатеринбург', '26.09.2020', '03:41');
    this.addTicket(this.ticket);
  }

  // сериализация билета и добавление в локальное хранилище, сделать значение 1trainId уникальным
  addTicket(ticket: Ticket): void {
    console.log(ticket);
    this.tickets.push(ticket);
    localStorage.setItem('ticketsList', JSON.stringify(this.tickets));
  }


  removeTicket(trainId: string): void {
    this.tickets = JSON.parse(localStorage.getItem('ticketsList'));
    localStorage.removeItem('ticketsList');
    this.tickets = this.tickets.filter((item) => {
      return item.trainId !== trainId;
    });
    localStorage.setItem('ticketsList', JSON.stringify(this.tickets));
  }

  //ToDo получить билет, заменить данные, добавить, старый удалить
  updateTicket(ticket: Ticket): void {
    this.tickets = JSON.parse(localStorage.getItem('ticketsList'));
    localStorage.removeItem('ticketsList');
    for (let i = this.tickets.length - 1; i >= 0; i--) {
      if (this.tickets[i].trainId === ticket.trainId) {
        this.tickets[i] = ticket;
      }
    }
    localStorage.setItem('ticketsList', JSON.stringify(this.tickets));
  }

  // получение билетов из локального хранилища
  getTickets(): any {
    return JSON.parse(localStorage.getItem('ticketsList'));
  }

}
