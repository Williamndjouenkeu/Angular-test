import { Component } from '@angular/core';
import { Task, TaskService } from '../../Service/task.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  imports: [FormsModule, CommonModule, MatButtonModule, MatDividerModule, MatIconModule,
    MatCheckboxModule, MatInputModule
  ],
})
export class TaskList {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  defaultTask: Task = {
    title: '',
    completed: false
  };

  editingTask: Task = this.defaultTask;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }
  

  loadTasks() {
    this.taskService.getTasks().subscribe(data => this.tasks = data)
  }

  addTask() {
    if(this.newTaskTitle.trim()) {
      const task: Task = {title: this.newTaskTitle, completed: false};
      this.taskService.createTask(task).subscribe(() => {
        this.newTaskTitle = '';
        this.loadTasks();
      });
    }
  }

  deleteTask(id?: number){
    if(id){
      this.taskService.deleteTask(id).subscribe(()=>{
        this.loadTasks(); 
      });
    }
  }

  startEdit(task: Task) {
    this.editingTask = { ...task };
  }

  saveEdit(){
    if(this.editingTask !== this.defaultTask && this.editingTask.id !== undefined){
      this.taskService.updateTask(this.editingTask.id, this.editingTask).subscribe(() => {
          this.editingTask = this.defaultTask;
          this.loadTasks();
      })
    }
  }

  cancelEdit() {
    this.editingTask = this.defaultTask;
  }
}
