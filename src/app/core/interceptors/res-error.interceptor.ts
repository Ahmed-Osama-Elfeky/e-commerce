import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, pipe, throwError } from 'rxjs';

export const resErrorInterceptor: HttpInterceptorFn = (req, next) => {

// const _ToastrService=inject(ToastrService)

//   return next(req).pipe(
//     catchError((err)=>{
//       console.log('from interceptor', err.error.message);
//       _ToastrService.error(err.error.message, 'FreshCart', {
//         closeButton:true,
//         timeOut:1500,
//         progressBar:true,
//         progressAnimation:'decreasing',
//         positionClass:'toast-position'


//       })

//       return throwError(()=> err)
return next(req)


    }
//   )

//   );
// };
