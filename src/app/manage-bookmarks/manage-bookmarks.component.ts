import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-bookmarks',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './manage-bookmarks.component.html',
  styleUrl: './manage-bookmarks.component.scss'
})
export class ManageBookmarksComponent implements OnInit {
  bookmarks$!: Observable<Bookmark[]>;

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.loadBookmarks();
    this.bookmarkService.bookmarksChanged.subscribe(() => {
      this.loadBookmarks();
    });
  }

  private loadBookmarks() {
    this.bookmarks$ = this.bookmarkService.getBookmarks();
  }
}