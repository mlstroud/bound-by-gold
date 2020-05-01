// import { JobBoard } from './contracts.js';

export class IncomeStatement {
  constructor() {
    this.wage = 25;
    this.deathPayment = 100;
    this.aggregateIncome = 0;
    this.numberOfMercenaries = 0;
  }

  calculateIncome(contractClicked, mercSurvived) {
    let income = 0;
    if (mercSurvived) {

      income = contractClicked[1] -
        (this.numberOfMercenaries * this.wage) +
        ((contractClicked[0] - mercSurvived) * contractClicked[2]) -
        ((contractClicked[0] - mercSurvived) * this.deathPayment);
    } else {

      income = ((contractClicked[0] - mercSurvived) * contractClicked[2]) -
        ((contractClicked[0] - mercSurvived) * this.deathPayment) -
        (this.numberOfMercenaries * this.wage);
    }


    this.aggregateIncome = income + this.aggregateIncome;
    //return income;
  }
}