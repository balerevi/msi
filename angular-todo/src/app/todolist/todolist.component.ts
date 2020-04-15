import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TaskService} from '../task.service';
import {ITask} from '../task';

@Component({
  selector: 'app-todolist',
  template: `
    <h3>ToDo List</h3>
    <input #task type="text" [placeholder]="'New Task'" [formControl]="inputField">
    <button (click)="addTask()">Add</button>
    <ul *ngFor="let task of taskList">
      <p><input type="checkbox" [checked]="task.completed" (click)="toggleTaskStatus(task)"> {{task.title}} <a
        [style.color]="'red'" (click)="removeTask(task)">X</a></p>
    </ul>`,
  styles: [`
  h3{
    text-align: center;
  }`]
})
export class TodolistComponent implements OnInit {

  public inputField = new FormControl('');
  public taskList: ITask[] = [];
  public errorMsg;
  public count;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks()
      .subscribe(data => this.taskList = data,
        error => { this.errorMsg = error; alert(this.errorMsg); },
        () => { this.count = this.taskList.length; }
    );
  }

  addTask(): void{
    this.count += 1;
    const taskTitle = this.inputField.value || 'Task ' + this.count;
    const newTask: ITask = {id: 0, title: taskTitle, completed: false};
    this.taskService.addTask(newTask).subscribe(data => this.taskList.push(data));
    this.inputField.reset();
  }

  removeTask(task): void{
    const index = this.taskList.indexOf(task);
    if (index > -1) {
      const taskChange = this.taskList[index];
      this.taskService.removeTask(taskChange).subscribe();
      this.taskList.splice(index, 1);
    }
  }

  toggleTaskStatus(task: any) {
    const index = this.taskList.indexOf(task);
    if (index > -1) {
      const taskChange = this.taskList[index];
      taskChange.completed = !this.taskList[index].completed;
      console.log(this.taskList);
      this.taskService.updateTask(taskChange).subscribe();
    }
  }
}
