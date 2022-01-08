/**
 * Created by andrew.yang on 7/28/2017.
 */
import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'top-bar',
    styleUrls: ['./top-bar.component.css'],
    template: `
    <div class="main-header navbar-fixed-top">
        <div class="header-menu">
          <div class="header-cart-wrapper">
            <div class="header-cart" (click)="toggleCartPopup($event)">
              <div class="mobil-shopping-cart">
                <span><i class="fa fa-shopping-cart fa-2x"></i> <span *ngIf="cart_num">( {{cart_num}} )</span></span>
              </div>
              <div class="header-cart-item">
                <a href="">سبد خرید <span *ngIf="cart_num">( {{cart_num}} )</span><span class="fa fa-caret-down"></span></a>
              </div>
            </div>
          </div>
            <div class="header-nav-wrapper">
                <ul class="header-nav">
                  <li class="header-nav-item">
                    <a routerLink="/">بیشتر<span class="fa fa-caret-down"></span></a>
                  </li>
                  <li class="header-nav-item">
                    <a routerLink="/">مقاله</a>
                  </li>
                  <li class="header-nav-item">
                    <a routerLink="/">فروشگاه</a>
                  </li>
                  <li class="header-nav-item">
                    <a routerLink="/">خانه</a>
                  </li>
                </ul>
            </div>
          <div class="header-mobile-nav-wrapper">
            <button type="button" class="navbar-toggle" (click)="collapse = !collapse">
              <span class="fa fa-bars fa-2x"></span>
            </button>
          </div>
          <div class="header-logo-wrapper">
            <img class="header-logo-image" src="./assets/imgs/logo.png" alt="Hero">
          </div>
        </div>
        <ul class="mobile-header-nav" *ngIf="collapse" (click)="collapse = !collapse">
            <li>
                <a routerLink="/">خانه</a>
            </li>
            <li>
                <a routerLink="/">فروشگاه</a>
            </li>
            <li>
                <a routerLink="/">مقاله</a>
            </li>
            <li>
                <a routerLink="/">بیشتر</a>
            </li>
        </ul>
        <cart-popup></cart-popup>
    </div>
`
})
export class TopbarComponent implements OnInit {
    public collapse: boolean = false;
    public cart_num:number;
    constructor(
        private cartService: CartService
    ) { }

    ngOnInit() {
        this.cartService.cartListSubject
            .subscribe(res => {
                this.cart_num = res.length;
            })
    }
    toggleCartPopup = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.cartService.toggleCart()
    }
}
