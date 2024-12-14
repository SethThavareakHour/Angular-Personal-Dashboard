import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../shared/note.model';
@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent implements OnInit{

  @Input() note!: Note

  ngOnInit(): void {
  }

  constructor() {}

}

