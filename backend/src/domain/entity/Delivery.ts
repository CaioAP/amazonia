import Step from './Step';
import crypto from 'crypto';

export default class Delivery {
  distance?: number;

  constructor(
    readonly id: string | undefined,
    readonly start: string,
    readonly pickup: string,
    readonly end: string,
    readonly steps: Step[] = []
  ) {
    if (!id) this.id = crypto.randomUUID();
  }

  getDistance(): number {
    if (!this.distance) return 0;
    return this.distance / 100;
  }

  setDistance(distance: number) {
    this.distance = Math.floor(distance * 100);
  }

  setSteps(path: string[]) {
    for (let i = 0; i < path.length - 1; i++) {
      const currentPath = path[i];
      const nextPath = path[i + 1];
      this.steps.push(new Step(undefined, currentPath, nextPath, this.id));
    }
  }
}
