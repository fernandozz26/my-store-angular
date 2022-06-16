import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import {MaterialModule} from './material.module';
import { SliderComponent } from './shared/component/slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FavoritesModule } from './pages/favorites/favorites.module';
import { intercetorProvider } from './shared/interceptor/product-interceptor.service';
import { AdminModule } from './pages/admin/admin.module';
import { AdminComponent } from './pages/admin/admin.component';
import { CarouselComponent } from './shared/component/carousel/carousel.component';
import { ProductcardComponent } from './shared/component/productcard/productcard.component';
import { GridcardComponent } from './shared/component/gridcard/gridcard.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductImageViewerComponent } from './shared/component/product-image-viewer/product-image-viewer.component';
import { RenderStyleHtml } from './reder-style-html.pipe';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PopupComponent } from './shared/component/popup/popup.component';
import { MsgOkComponent } from './shared/component/msg-ok/msg-ok.component';
import { QuantitySelectComponent } from './shared/component/quantity-select/quantity-select.component';
import { CartModule } from './pages/cart/cart.module';
import { CartComponent } from './pages/cart/cart.component';
import { LinearProductComponent } from './shared/component/linear-product/linear-product.component';
import { CheckoutModule } from './pages/checkout/checkout.module';
import { CheckoutComponent } from './pages/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    AdminComponent,
    CarouselComponent,
    ProductcardComponent,
    GridcardComponent,
    ProductComponent,
    ProductImageViewerComponent,
    RenderStyleHtml,
    LoaderComponent,
    FavoritesComponent,
    PopupComponent,
    MsgOkComponent,
    QuantitySelectComponent,
    CartComponent,
    LinearProductComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule, FormsModule, CartModule, CheckoutModule
  ],
  providers: [intercetorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
