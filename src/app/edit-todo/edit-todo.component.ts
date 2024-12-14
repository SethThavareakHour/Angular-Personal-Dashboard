import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'
import { OnInit } from '@angular/core'
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss'
})
export class EditTodoComponent implements OnInit{

  todo!: Todo;

  showValidationErrors!: boolean;

  constructor(
    private todoService: TodoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id');
      if (todoId) {
        const todo = this.todoService.getTodo(todoId);
        if (todo) {
          this.todo = todo;
        } else { }
      }
    })
  }

  onFormSubmit(form: NgForm): boolean {
    if (form.invalid) {
      this.showValidationErrors = true;
      return false;
    }
    this.todoService.updateTodo(this.todo.id, form.value);
    this.notificationService.show('Todo Updated', 1200)
    this.router.navigateByUrl('/todos');
    return true;
  }

}
