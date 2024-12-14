import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements OnInit {
  
  showValidationErrors!: boolean;

  constructor(
    private todoService: TodoService, 
    private router: Router,
    private notificationService : NotificationService
  ) {}

  ngOnInit(): void {
      
  }

  onFormSubmit(form: NgForm): boolean {
    if (form.invalid) {
      this.showValidationErrors = true;
      return false;
    }
    
    const todo = new Todo(form.value.text);
    this.todoService.addTodo(todo);
    this.notificationService.show('Todo Created', 1200)
    this.router.navigateByUrl('/todos');
    return true;
  }
}


