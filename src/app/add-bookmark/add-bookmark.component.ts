import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-bookmark',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-bookmark.component.html',
  styleUrl: './add-bookmark.component.scss'
})
export class AddBookmarkComponent {
  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private notificationService: NotificationService
  ) { }
  
  onFormSubmit(form: NgForm) {
    const { name, url } = form.value;
    const bookmark = new Bookmark(name, url);
    
    this.bookmarkService.addBookmark(bookmark).subscribe(() => {
      this.notificationService.show('Bookmark Created', 1200);
      this.router.navigateByUrl("/bookmarks");
    });
  }
}