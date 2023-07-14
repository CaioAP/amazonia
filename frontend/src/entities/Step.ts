export default class Step {
  constructor(
    readonly id: string,
    readonly start: string,
    readonly end: string,
    readonly deliveryId?: string
  ) {}
}
