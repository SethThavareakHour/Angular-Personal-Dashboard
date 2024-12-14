import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsComponent } from "./tabs/tabs.component";
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { NotificationComponent } from "./notification/notification.component";
import { CommonModule } from '@angular/common';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const baseStyles = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',

})

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabsComponent, NotificationComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnim', [
      transition(':increment' , [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter , :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(60px)'
            }))
          ], { optional: true }),
  
          query(':enter', [
            style({
              transform: 'translate(-60px)',
              opacity: 0
            }),
            animate('300ms 100ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0px)'
            }))
          ] , { optional: true })
        ])
      ]),

      transition(':decrement' , [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter , :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-60px)'
            }))
          ], { optional: true }),
  
          query(':enter', [
            style({
              transform: 'translate(60px)',
              opacity: 0
            }),
            animate('300ms 100ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0px)'
            }))
          ] , { optional: true })
        ])
  
      ]),

      transition('* => secondary', [
        style({
          position: 'relative',
          // overflow: 'hidden'
        }),

        query(':enter , :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ], { optional: true }),
  
          query(':enter', [
            style({
              transform: 'scale(1.2)',
              opacity: 0
            }),
            animate('300ms 100ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ] , { optional: true })
        ])
      ]),

      transition('secondary => *', [
        style({
          position: 'relative',
          // overflow: 'hidden'
        }),

        query(':enter , :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'scale(0.8)',
              opacity: 0
            }),
            animate('300ms 100ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ] , { optional: true })
        ])
      ]),
    ])
  ]
})


export class AppComponent implements OnInit{

  title = 'angular-personal-dashboard';

  currentIndex: number = 0;

  dateTime!: Observable<Date>; 

  ngOnInit(): void {
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    );
  }

  bg : string = 'https://images.unsplash.com/photo-1554110397-9bac083977c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) { 
      const tab = outlet.activatedRouteData['tabNumber'];
      if (!tab) return 'secondary'
      return tab
    }
  };


  async changeBgImage() {
    try {
      const response = await fetch('https://api.unsplash.com/photos/?client_id=MuQuOUxv0H6sSwVolbfRdGTO346R5bgmkkbqxiE6y5Q');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from Unsplash');
      }

      const data = await response.json();

      this.bg = data[this.currentIndex % data.length]?.urls?.regular || this.bg;
      this.currentIndex++;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }
}
