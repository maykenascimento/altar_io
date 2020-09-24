import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {
  // Matrix used to genared random combinations
  private matrix: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  // Two-dimensional array to store random letters
  private dataList: Array<Array<string>> = [];
  public get DataList() : Array<Array<string>> {
    return this.dataList
  }
  
  // The result after calculated
  private finalCode: string;
  public get FinalCode() : string {
    return this.finalCode;
  }
  
  // Letter that user can enter
  private userInput: string;
  public set SetUserInput(v : string) {
    this.userInput = v;
  }
  
  public get GetUserInput() : string {
    return this.userInput;
  }
  
  private time = new Date();
  private interval;

  constructor() {
    this.startTimer();
  }

  generateSequence() {
    var sequences = new Array<Array<string>>();

    for (let x = 0; x < 10; x++) {
      var newRow = new Array();
      for (let y = 0; y < 10; y++) {
        newRow.push(this.matrix[Math.floor(Math.random() * this.matrix.length)]);
      }
      sequences.push(newRow);
    }

    this.dataList = sequences;
    this.calcCode();
  }

  private calcCode() {
    const seconds = ("00" + this.time.getSeconds()).slice(-2);
    const splited = Array.from(seconds);
    const length1 = parseInt(splited[0]);
    const length2 = parseInt(splited[1]);

    const letter1 = this.dataList[length1][length2];
    const letter2 = this.dataList[length2][length1];

    var firstLetterCount = 0;
    var secondLetterCount = 0;

    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        // if (this.list[row][column] < lowestInteger)
        if (this.dataList[row][column] == letter1) {
          firstLetterCount += 1;
        }
        else if (this.dataList[row][column] == letter2) {
          secondLetterCount += 1;
        }
      }
    }

    if (firstLetterCount > 9) {
      if (length1 < length2) {
        firstLetterCount = Math.round(firstLetterCount / length1);
      } else {
        firstLetterCount = Math.round(firstLetterCount / length2);
      }
    }

    if (secondLetterCount > 9) {
      if (length1 < length2) {
        secondLetterCount = Math.round(secondLetterCount / length1);
      } else {
        secondLetterCount = Math.round(secondLetterCount / length2);
      }
    }

    this.finalCode = `${firstLetterCount}${secondLetterCount}`;
  }

  public set setUserValue(value: string) {
    if (value.length > 1) {
      value = value.substr(0, 1);
    }
    this.userInput = value;
  }

  private startTimer() {
    this.stopTimer();
    this.interval = setInterval(() => {
      this.time = new Date();
      if (this.time.getSeconds() % 2 == 1) {
        // Generate a new sequence every 2 seconds
        this.generateSequence();
      }
    }, 1000);
  }

  private stopTimer() {
    clearInterval(this.interval);
    this.interval = undefined;
  }
}
