import { NgxSpinnerService } from 'ngx-spinner';
import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/categories/category.service';
import { ICategory } from '../../core/interfaces/category/icategory';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {


  private readonly _CategoryService=inject(CategoryService)
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)
categoryData!:ICategory[];
SpecificCategory!:Subscription;

  ngOnInit(): void {

    this._CategoryService.GetAllCategories().subscribe({
      next:(res)=>{
        this._NgxSpinnerService.hide();
        this.categoryData=res.data;
        console.log(res.data);

      },
      error:(err)=>{
        console.log(err);

      }

    })




  }

 showSpecificCategory(c_id:string){

  this._CategoryService.GetSpecificCategory(c_id).subscribe({
    next:(res)=>{
      console.log(res.data);
      this.SpecificCategory=res.data
    },
    error:(err)=>{
      console.log(err);
    }

  })
 }


}
