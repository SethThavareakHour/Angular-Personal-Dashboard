import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy{

  private readonly STORAGE_KEY = 'todos';

  todos: Todo[] = []

  storageListenSub: Subscription

  constructor() { 
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage')
    .subscribe((event: StorageEvent) => {
      if (event.key === 'todos') this.loadState();
    })
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe
  }

  getTodos() {
    return this.todos
  }

  getTodo(id: string) {
    return this.todos.find( t => t.id === id )
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)

    this.saveState()
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id)
    if (todo) {
      Object.assign(todo, updatedTodoFields);
    }

    this.saveState()
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex( t => t.id === id )
    if (index == -1) return 

    this.todos.splice(index, 1)

    this.saveState()
  }

  private saveState() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
  }

  private loadState() {
    const todosData = localStorage.getItem(this.STORAGE_KEY);
    if (todosData) {
      try {
        this.todos.length = 0
        this.todos.push(...JSON.parse(todosData))
      } catch (error) {
        console.error('Failed to parse notes from localStorage:', error);
        this.todos = [];
      }
    }
  }
}
