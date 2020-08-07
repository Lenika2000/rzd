import {Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {Ticket} from '../model/ticket';
import {TicketsService} from '../services/tickets.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  // типы шаблонов(для чтения или редактирования)
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;
  editedTicket: Ticket; // редактируемый билет
  oldTicket: string;
  isVisible = false;
  tickets: Ticket[];

  constructor(private ticketsService: TicketsService) {
  }

  ngOnInit(): void {
    /*приходит измененный массив из localStorage*/
    this.ticketsService.observableTickets.subscribe(value => this.tickets = value);
    this.ticketsService.getTickets();
  }

  // редактирование пользователя
  setEditTicket(ticket: Ticket): void {
    this.oldTicket = JSON.stringify(new Ticket(ticket.trainId, ticket.fromWhere, ticket.departureDate, ticket.departureTime,
      ticket.fromWhere, ticket.arrivalDate, ticket.arrivalTime));
    this.editedTicket = ticket;
  }
  // загружаем один из двух шаблонов
  loadTemplate(ticket: Ticket): TemplateRef<any> {
    if (this.editedTicket && JSON.stringify(this.editedTicket) === JSON.stringify(ticket)) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  // отмена редактирования
  cancel(): void {
    this.editedTicket = null;
    this.oldTicket = null;
  }

  // поле для заполнения вновь становится невидимым после добавления нового билета
  onChangedVisible(): void{
    this.isVisible = false;
  }

  createTicket(): void {
    this.isVisible = true;
  }

  deleteTicket(ticket): void {
    this.ticketsService.removeTicket(JSON.stringify(ticket));
    this.ticketsService.getTickets();
  }

  editTicket(ticket): void {
    this.ticketsService.removeTicket(this.oldTicket);
    this.ticketsService.addTicket(JSON.stringify(ticket));
    this.oldTicket = null;
    this.editedTicket = null;
    this.ticketsService.getTickets();
  }
}
