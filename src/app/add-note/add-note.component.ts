import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss'
})
export class AddNoteComponent {

  showValidationErrors!: boolean;

  constructor(
    private noteService: NoteService, 
    private router: Router,
    private notificationService : NotificationService 
  ) { }

  onFormSubmit(form: NgForm): boolean {
    console.log(form)

    if (form.invalid) {
      this.showValidationErrors = true;
      return false;
    }

    const note = new Note(form.value.title, form.value.content)

    this.noteService.addNote(note)
    this.notificationService.show('Note Created', 1200)
    this.router.navigateByUrl("/notes")
    return true;
  }
}
