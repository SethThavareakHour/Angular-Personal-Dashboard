import { Component, OnInit } from '@angular/core';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { CommonModule } from '@angular/common';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [RouterModule, TodoItemComponent, CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  animations: [
    trigger('todoItemAnim', [
      transition(':leave', [
        animate(150, style({
          opacity:0,
          height:0,
          marginBottom:0
        }))
      ])
    ])
  ]
})
export class TodosComponent implements OnInit{

  todos: Todo[] = [];

  constructor(
    private todoService: TodoService, 
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos()
  }

  toggleCompleted(todo: Todo) {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed})
  }

  onEditClick(todo: Todo) {
    this.router.navigate(['/todos', todo.id])
  }

  onDeleteClick(todo: Todo) {
    this.todoService.deleteTodo(todo.id)
    this.notificationService.show('Todo Deleted', 1200)
  }

  trackById(index: number, item: Todo) {
    return item.id
  }
}
