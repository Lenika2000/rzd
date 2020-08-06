import {Component, OnInit} from '@angular/core';
import {Ticket} from '../model/ticket';
import {TicketsService} from '../services/tickets.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  isVisible = false;
  tickets: Ticket[];
  constructor(private ticketsService: TicketsService) {

    this.tickets = this.ticketsService.getTickets();
  }

  // билеты,распределенные по строкам таблицы


  // ngOnChanges(changes: SimpleChanges) {
  //   this.tickets = this.ticketsService.getTickets();
  // }

  ngOnInit(): void {
  }

  createTicket(): void {
    this.isVisible = true;
  }

  deleteTicket(ticket): void {
    this.ticketsService.removeTicket(ticket.trainId);
  }
}
