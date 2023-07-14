import crypto from 'crypto';

export default class Step {
  constructor(
    readonly id: string | undefined,
    readonly start: string,
    readonly end: string,
    readonly deliveryId?: string
  ) {
    if (!id) this.id = crypto.randomUUID();
  }
}
