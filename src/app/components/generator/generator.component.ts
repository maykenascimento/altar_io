import { Component, OnInit } from '@angular/core';
import { CodeGeneratorService } from 'src/app/services/code-generator.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  
  // Countdown timer uses to lock user input
  entryLocked: boolean = false;

  constructor(private codeGeneratorService: CodeGeneratorService) {
  }

  ngOnInit(): void {
  }
  
  public get currentCode() : string {
    return this.codeGeneratorService.FinalCode;
  }

  public get listCharacteres() {
    return this.codeGeneratorService.DataList;
  }

  public get userInput() : string {
    return this.codeGeneratorService.GetUserInput;
  }
  
  public get isRunning() : boolean {
    return this.codeGeneratorService.IsRunning;
  }

  // Set the user input value to the generator service
  setUserInput(event: any) {
    var value: string = event.target.value.toString();

    if (this.codeGeneratorService.GetUserInput != value) {
      // Lock the user input for 4 seconds
      this.entryLocked = true;
      setTimeout(() => {
        this.entryLocked = false;
      }, 4000);
  
      if (value.length > 1) {
        value = value.substr(0, 1);
      }
      this.codeGeneratorService.setUserValue = value;
    }
  }
  
  // Start to generate the random list
  startGenerate(){
    this.codeGeneratorService.startTimer();
  }
  
}
