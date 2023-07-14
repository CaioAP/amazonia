import Step from './Step';

export default class Delivery {
  distance?: number;

  constructor(
    readonly id: string,
    readonly start: string,
    readonly pickup: string,
    readonly end: string,
    readonly steps: Step[] = []
  ) {}

  addStep(step: Step): void {
    this.steps.push(step);
  }
}
