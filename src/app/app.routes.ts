import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthComponent } from './layouts/auth-layout/auth/auth.component';
import { MainComponent } from './layouts/main-layout/main/main.component';
 import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [


    {path:'', component:AuthComponent, children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login', component:LoginComponent, title:'Login'},
        {path:'register', loadComponent:()=> import('./pages/register/register.component').then((classes)=>classes.RegisterComponent), title:'Register'},
        {path:'forget-password', loadComponent:()=> import('./pages/forget-password/forget-password.component').then((classes)=>classes.ForgetPasswordComponent), title:'Forget Password'},
        {path:'verify-code', loadComponent:()=> import('./pages/verify-code/verify-code.component').then((classes)=>classes.VerifyCodeComponent),title:'Forget Password'},
        {path:'reset-password', loadComponent:()=> import('./pages/reset-password/reset-password/reset-password.component').then((classes)=>classes.ResetPasswordComponent),title:'Reset Password'},
    ]},

    {path:'', component:MainComponent,canActivate:[authGuard] , children:[

        {path:'home', component:HomeComponent, title:'Home'},
        {path:'products', loadComponent:()=> import('./pages/products/products.component').then((classes)=>classes.ProductsComponent), title:'Products'},
        {path:'brands', loadComponent:()=> import('./pages/brands/brands.component').then((classes)=>classes.BrandsComponent), title: 'Brands'},
        {path:'categories', loadComponent:()=>import('./pages/categories/categories.component').then((classes)=>classes.CategoriesComponent), title: 'Categories'},
        {path:'cart', loadComponent:()=>import('./pages/cart/cart.component').then((classes)=>classes.CartComponent),title: 'Cart'},
        {path:'whishlist', loadComponent:()=>import('./pages/whishlist/whishlist/whishlist.component').then((classes)=>classes.WhishlistComponent),title: 'Whishlist'},
        {path:'allorders', loadComponent:()=>import('./pages/allorders/allorders.component').then((classes)=>classes.AllordersComponent),title: 'All Orders'},
        {path:'checkout/:c_id', loadComponent:()=>import('./pages/check-out/check-out.component').then((classes)=>classes.CheckOutComponent),title: 'Check Out'},
        {path:'product-details/:p_id',loadComponent:()=>import('./pages/productdtails/productdetails/productdetails.component').then((classes)=>classes.ProductdetailsComponent),title:'details'},
        {path:'**',component:NotFoundComponent,title: 'Error 404'}

    ]},

];
