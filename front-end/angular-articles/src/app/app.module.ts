import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { ArticlesComponent } from './articles/articles.component';
import { ApiarticlesService } from './services/apiarticles.service';
import { MatTableModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

const MAT_MODULES  = [
  MatTableModule
];

@NgModule({
  declarations: [
    ArticlesComponent
  ],
  imports: [
    BrowserModule, HttpModule, MAT_MODULES, AngularFontAwesomeModule
  ],
  exports: MAT_MODULES,
  providers: [ApiarticlesService],
  bootstrap: [ArticlesComponent]
})
export class AppModule { }
