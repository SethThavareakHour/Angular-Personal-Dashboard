import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NoteCardComponent } from "../note-card/note-card.component";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterModule, CommonModule, NoteCardComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  notes : Note[] = []

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.notes = this.noteService.getNotes()
  }
}
