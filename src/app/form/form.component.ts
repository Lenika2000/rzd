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
    this.visibleChange.emit();
    this.ticketsService.addTicket(JSON.stringify(this.ticket));
    this.ticketsService.getTickets();
    this.cleanButtonClicked();
  }

  cleanButtonClicked(): void {
    this.ticket = new Ticket('', '', '', '', '', '', '');
  }

  closeForm(): void {
    this.cleanButtonClicked();
    this.visibleChange.emit();
  }
}
