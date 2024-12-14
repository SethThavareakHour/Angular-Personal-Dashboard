import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'
import { OnInit } from '@angular/core'
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss'
})
export class EditNoteComponent implements OnInit{

  showValidationErrors!: boolean;

  note!: Note;

  constructor(
    private route: ActivatedRoute, 
    private noteService: NoteService, 
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id');
      if (idParam) {
        const note = this.noteService.getNote(idParam);
        if (note) {
          this.note = note;
        } else {
          console.error('Note not found');
        }
      } else {
        console.error('ID parameter is missing');
      }
    });
  }

  onFormSubmit(form: NgForm): void {
    this.noteService.updateNote(this.note.id, form.value)
    this.router.navigateByUrl("/notes")
    this.notificationService.show('Note Updated', 1200)
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id)
    this.router.navigateByUrl("/notes")
    this.notificationService.show('Note Deleted', 1200)
  }
}


