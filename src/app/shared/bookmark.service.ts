import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookmark } from './bookmark.model';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private apiUrl = 'http://localhost:5000/api/bookmarks';

  bookmarksChanged = new Subject<void>();

  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(bookmarks => bookmarks.map(bookmark => {
        const bookmarkObj = new Bookmark(bookmark.name, bookmark.url);
        bookmarkObj.id = bookmark._id; // Use MongoDB's _id
        return bookmarkObj;
      }))
    );
  }

  getBookmarkById(id: string): Observable<Bookmark> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(bookmark => {
        const bookmarkObj = new Bookmark(bookmark.name, bookmark.url);
        bookmarkObj.id = bookmark._id; // Use MongoDB's _id
        return bookmarkObj;
      })
    );
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<any>(this.apiUrl, {
      name: bookmark.name,
      url: bookmark.url.toString()
    }).pipe(
      map(response => {
        const newBookmark = new Bookmark(response.name, response.url);
        newBookmark.id = response.id;
        return newBookmark;
      })
    );
  }

  // updateBookmark(id: string, updatedFields: Partial<Bookmark>): Observable<Bookmark> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, {
  //     name: updatedFields.name,
  //     url: updatedFields.url ? updatedFields.url.toString() : undefined
  //   }).pipe(
  //     map(response => {
  //       const updatedBookmark = new Bookmark(response.name, response.url);
  //       updatedBookmark.id = response.id;
  //       return updatedBookmark;
  //     })
  //   );
  // }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>): Observable<Bookmark> {
    console.log('Updating bookmark:', { id, updatedFields });
    return this.http.put<any>(`${this.apiUrl}/${id}`, {
      name: updatedFields.name,
      url: updatedFields.url ? updatedFields.url.toString() : undefined
    }).pipe(
      tap(response => console.log('Update response:', response)),
      map(response => {
        const updatedBookmark = new Bookmark(response.name, response.url);
        updatedBookmark.id = response.id;
        return updatedBookmark;
      }),
      tap(() => this.bookmarksChanged.next()) // Trigger refresh
    );
  }

  deleteBookmark(id: string): Observable<void> {
    console.log('Attempting to delete bookmark with id:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => {
          console.log('Delete successful');
          this.bookmarksChanged.next(); // Trigger refresh similar to update method
        },
        error: (error) => console.error('Delete failed:', error)
      })
    );
  }
}