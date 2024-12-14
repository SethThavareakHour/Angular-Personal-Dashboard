import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmark-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-tile.component.html',
  styleUrl: './bookmark-tile.component.scss'
})
export class BookmarkTileComponent implements OnInit{

  @Input() bookmark!: Bookmark; 

  tileIconSrc!: string;

  faviconError!: boolean;

  constructor() {

  }

  ngOnInit(): void {
    const url = new URL(this.bookmark.url);
    this.tileIconSrc = url.origin + '/favicon.ico';
  }
  
}
