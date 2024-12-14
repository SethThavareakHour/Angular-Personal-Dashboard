// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
// import { FormsModule, NgForm } from '@angular/forms'
// import { Bookmark } from '../shared/bookmark.model';
// import { BookmarkService } from '../shared/bookmark.service';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { NotificationService } from '../shared/notification.service';

// @Component({
//   selector: 'app-edit-bookmark',
//   standalone: true,
//   imports: [RouterModule, CommonModule, FormsModule],
//   templateUrl: './edit-bookmark.component.html',
//   styleUrl: './edit-bookmark.component.scss'
// })

// export class EditBookmarkComponent implements OnInit{

//   bookmark!: Bookmark

//   constructor(
//     private bookmarkService: BookmarkService, 
//     private route: ActivatedRoute,
//     private router: Router,
//     private notificationService: NotificationService) { }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((paramMap: ParamMap) => {
//       const bookmarkId = paramMap.get('id');
//       const bookmarks = this.bookmarkService.getBookmarks();
//       this.bookmark = bookmarks.find(bookmark => bookmark.id === bookmarkId)!;
//     })
//   }
  
//   onFormSubmit(form: NgForm) {
//     const { name, url } = form.value
//     this.bookmarkService.updateBookmark(this.bookmark.id, {
//       name, 
//       url: new URL(url)
//     })

//     this.notificationService.show('Bookmark Updated', 1200)
//   }

//   delete() { 
//     this.bookmarkService.deleteBookmark(this.bookmark.id)
//     this.router.navigate(['../'], { relativeTo: this.route })
//     this.notificationService.show('Bookmark Deleted', 1200)
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-bookmark',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './edit-bookmark.component.html',
  styleUrl: './edit-bookmark.component.scss'
})
export class EditBookmarkComponent implements OnInit {
  bookmark!: Bookmark;

  constructor(
    private bookmarkService: BookmarkService, 
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        const bookmarkId = paramMap.get('id')!;
        return this.bookmarkService.getBookmarkById(bookmarkId);
      })
    ).subscribe(bookmark => {
      this.bookmark = bookmark;
    });
  }
  
  onFormSubmit(form: NgForm) {
    const { name, url } = form.value;
    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name, 
      url: new URL(url)
    }).subscribe(() => {
      this.notificationService.show('Bookmark Updated', 1200);
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  delete() {
    if (this.bookmark && this.bookmark.id) {
      this.bookmarkService.deleteBookmark(this.bookmark.id).subscribe({
        next: () => {
          this.notificationService.show('Bookmark Deleted', 1200);
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.error('Error deleting bookmark:', error);
        }
      });
    }
  }
}

