import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit{

  @Input() todo!: Todo;

  @Output() editClick: EventEmitter<void> = new EventEmitter()
  @Output() deleteClick: EventEmitter<void> = new EventEmitter()


  constructor() { }

  ngOnInit(): void {
    
  }

  onEditClick () {
    this.editClick.emit()
  }

  onDeleteClick() {
    this.deleteClick.emit()
  }
}
