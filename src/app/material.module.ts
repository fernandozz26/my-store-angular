import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

const materialModules = [MatToolbarModule, MatSidenavModule, MatCardModule,MatFormFieldModule, MatButtonModule,
  MatInputModule, MatDatepickerModule, MatSlideToggleModule,MatIconModule,MatSelectModule, MatTableModule,MatPaginatorModule];
@NgModule({
  imports : [...materialModules],
  exports :[...materialModules],
})

export class MaterialModule {};
