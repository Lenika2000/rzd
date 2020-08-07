import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Ticket} from '../model/ticket';
import {TicketsService} from '../services/tickets.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  isVisible = false;
  tickets: Ticket[];

  constructor(private ticketsService: TicketsService) {
    /*приходит измененный массив из localStorage*/
    this.ticketsService.observableTickets.subscribe(value => this.tickets = value);
    this.ticketsService.getTickets();
  }

  ngOnInit(): void {
  }

  onChangedVisible(): void{
    this.isVisible = false;
  }

  createTicket(): void {
    this.isVisible = true;
  }

  deleteTicket(ticket): void {
    this.ticketsService.removeTicket(ticket);
    this.ticketsService.getTickets();
  }
}
