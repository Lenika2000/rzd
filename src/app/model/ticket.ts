export class Ticket {
  constructor(
    public trainId: string,
    public fromWhere: string,
    public departureDate: string,
    public departureTime: string,
    public where: string,
    public arrivalDate: string,
    public arrivalTime: string) { }
}
