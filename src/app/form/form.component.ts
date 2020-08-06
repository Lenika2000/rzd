import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
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

  // форма показывается лишь при нажатии на кнопку добавить
  @Input() isVisible = false;

  // новый билет
  private ticket: Ticket = {
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
    this.isVisible = false;
    this.ticketsService.addTicket(this.ticket);
  }

}
