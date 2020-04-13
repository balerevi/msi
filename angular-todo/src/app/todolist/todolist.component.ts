import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-todolist',
  template: `
    <h3>ToDo List</h3>
    <input #task type="text" [placeholder]="'New Task'" [formControl]="inputField">
    <button (click)="addTodo()">Add</button>
    <ul *ngFor="let task of list">
      <p><input type="checkbox"> {{task}} <a [style.color]="'red'" (click)="removeTodo(task)" >X</a></p>
    </ul>`,
  styles: [`
  h3{
    text-align: center;
  }`]
})
export class TodolistComponent implements OnInit {

  public inputField = new FormControl('');
  public list = ['a', 'b', 'c'];
  public count = this.list.length;
  constructor() { }

  ngOnInit(): void {
  }

  addTodo(): void{
    this.count += 1;
    const value = this.inputField.value || 'Task ' + this.count;
    this.list.push(value);
    this.inputField.reset();
  }

  removeTodo(task): void{
    const index = this.list.indexOf(task);
    if (index > -1) {
      this.list.splice(index, 1);
    }
  }

}
