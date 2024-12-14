// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { BookmarkTileComponent } from "../bookmark-tile/bookmark-tile.component";
// import { BookmarkService } from '../shared/bookmark.service';
// import { Bookmark } from '../shared/bookmark.model';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-bookmarks',
//   standalone: true,
//   imports: [BookmarkTileComponent, CommonModule, RouterModule],
//   templateUrl: './bookmarks.component.html',
//   styleUrls: ['./bookmarks.component.scss']
// })
// export class BookmarksComponent implements OnInit {

//   bookmarks: Bookmark[]=[]

//   constructor(private bookmarkService: BookmarkService ) {

//   }
  
//   ngOnInit(): void {
//     this.bookmarks = this.bookmarkService.getBookmarks()
//   }

// }



import { Component, OnInit } from '@angular/core';
import { BookmarkTileComponent } from "../bookmark-tile/bookmark-tile.component";
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [BookmarkTileComponent, CommonModule, RouterModule],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks$!: Observable<Bookmark[]>;

  constructor(private bookmarkService: BookmarkService) {}
  
  ngOnInit(): void {
    this.bookmarks$ = this.bookmarkService.getBookmarks();
  }
}