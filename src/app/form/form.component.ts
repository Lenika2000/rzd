import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Ticket} from '../model/ticket';
import {TicketsService} from '../services/tickets.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private ticketsService: TicketsService) {
  }

  // форма показывается лишь при нажатии на кнопку создать
  @Input() public isVisible: boolean;
  @Output() public visibleChange = new EventEmitter<boolean>();
  @Output() public resetEditEmit = new EventEmitter();

  // новый билет
  public ticket: Ticket = {
    trainId: '',
    fromWhere: '',
    departureDate: '',
    departureTime: '',
    where: '',
    arrivalDate: '',
    arrivalTime: ''
  };

  ngOnInit(): void {
  }

  addTicket(): void {
    // добавление билета в локальное хранилище
    this.visibleChange.emit(); // скрытие формы добавления
    this.ticketsService.addTicket(JSON.stringify(this.ticket));
    this.ticketsService.getTickets();
    this.cleanButtonClicked(); // очистка формы
    // при добавлении нового билета убирает блокировку с кнопки редактирования
    this.resetEditEmit.emit();
  }

  cleanButtonClicked(): void {
    this.ticket = new Ticket('', '', '', '', '', '', '');
  }

  closeForm(): void {
    this.cleanButtonClicked();
    this.visibleChange.emit();
  }
}
