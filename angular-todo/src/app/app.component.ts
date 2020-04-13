import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
        <app-todolist></app-todolist>
    </div>`,
  styles: [`
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
    }`]
})
export class AppComponent {
  title = 'angular-todo';
}
