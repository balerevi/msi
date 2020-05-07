import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-todolist',
  template: `
    <h3>ToDo List</h3>
    <input #task type="text" [placeholder]="'New Task'" [formControl]="inputField">
    <button (click)="addTask()">Add</button>
    <ul *ngFor="let task of tasks; index as i">
      <input type="checkbox" [checked]="task.completed" (click)="toggleTaskStatus(task)"> {{task.title}} <a
      [style.color]="'red'" (click)="removeTask(i)">X</a>
    </ul>`,
  styles: [`
    h3{
      text-align: center;
    }`]
})
export class TodolistComponent implements OnInit {
  public inputField = new FormControl('');
  public tasks = [
    {
      id: 1,
      title: 'Task 1',
      completed: true
    },
    {
      id: 2,
      title: 'Task 2',
      completed: true
    },
    {
      id: 3,
      title: 'Task 3',
      completed: false
    }
  ];
  public count = this.tasks.length;
  constructor() { }

  ngOnInit(): void {
  }

  addTask(): void{
    this.count += 1;
    const taskTitle = this.inputField.value || 'Task ' + this.count;
    const newTask = {id: this.count, title: taskTitle, completed: false};
    this.tasks.push(newTask);
    this.inputField.reset();
  }

  removeTask(index): void{
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  toggleTaskStatus(task: any) {
    task.completed = !task.completed;
  }
}
