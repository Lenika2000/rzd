import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Ticket} from '../model/ticket';
import {TicketsService} from '../services/tickets.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  // типы шаблонов(для чтения или редактирования)
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;
  editedTicket: Ticket; // редактируемый билет
  oldTicket: string;
  isVisible = false;
  tickets: Ticket[];
  editMode = false; // существует ли редактируемая строка

  constructor(private ticketsService: TicketsService) {
  }

  ngOnInit(): void {
    /*приходит измененный массив из localStorage*/
    this.ticketsService.observableTickets.subscribe(value => this.tickets = value);
    this.ticketsService.getTickets();
  }

  // редактирование пользователя
  setEditTicket(ticket: Ticket): void {
    this.editMode = true;
    this.oldTicket = JSON.stringify(ticket);
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
    this.editMode = false;
    this.editedTicket = null;
    this.oldTicket = null;
    this.ticketsService.getTickets(); // если даже пользователь что-то изменил в билете,
    // чтобы в табл отобразилиcь данные из localStorage
  }

  // поле для заполнения вновь становится невидимым после добавления нового билета
  onChangedVisible(): void {
    this.isVisible = false;
  }

  createTicket(): void {
    this.isVisible = true;
  }

  deleteTicket(ticket): void {
    this.editMode = false; // снятие блокировок с кнопок редактировать
    this.ticketsService.removeTicket(JSON.stringify(ticket));
    this.ticketsService.getTickets();
  }

  editTicket(ticket): void {
    this.ticketsService.removeTicket(this.oldTicket);
    this.ticketsService.addTicket(JSON.stringify(ticket));
    this.cancel();
  }
}
