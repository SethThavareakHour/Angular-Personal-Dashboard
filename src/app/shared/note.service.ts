import { Injectable, OnDestroy } from '@angular/core';
import { Note } from './note.model';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy{

  private readonly STORAGE_KEY = 'notes';

  notes : Note[] = [];

  storageListenSub: Subscription

  constructor() { 
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage')
    .subscribe((event: StorageEvent) => {
      if (event.key === 'notes') this.loadState();
    })
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe
  }

  getNotes() {
    return this.notes
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id)
  }

  addNote(note: Note) {
    this.notes.push(note)

    this.saveState()
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    if (note) {
      Object.assign(note, updatedFields);
      this.saveState();
    }
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex === -1) return;
    this.notes.splice(noteIndex, 1);
    this.saveState();
  }

  private saveState() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.notes));
  }

  private loadState() {
    const notesData = localStorage.getItem(this.STORAGE_KEY);
    if (notesData) {
      try {
        this.notes.length = 0
        this.notes.push(...JSON.parse(notesData))
      } catch (error) {
        console.error('Failed to parse notes from localStorage:', error);
        this.notes = [];
      }
    }
  }
}
