import { IBrands } from './../../core/interfaces/brands/ibrands';
import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  brandsData! :IBrands[];
  brandDetials:IBrands|null = null;

  brandsInfo!:Subscription;
  brandID!:string;
  private readonly _BrandsService=inject(BrandsService)
    private readonly _ActivatedRoute=inject(ActivatedRoute);
    private readonly _NgxSpinnerService=inject(NgxSpinnerService);


  ngOnInit(): void {

this._ActivatedRoute.paramMap.subscribe({

  next:(param)=>{

    this.brandID=param.get('b_id')!;


    }
})


    this._BrandsService.GetAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data);
        this._NgxSpinnerService.hide();

        this.brandsData=res.data;
        this.showBrand(this.brandID)

      },error:(err)=>{
        console.log(err);

      }
    })


  }

  showBrand(b_id:string){
    this._BrandsService.GetSpecificBrand(b_id).subscribe({

      next:(res)=>{
        console.log(res.data);
        this._NgxSpinnerService.hide();

        this.brandDetials=res.data;
      },error:(err)=>{
        console.log(err);
      }


    })
  }



}
