import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showErrorMessage(message: string = 'Something went wrong!'): void {
    Swal.fire({
      icon: 'error',
      title: message,
      confirmButtonText: 'Aceptar'
    });
  }

  showConfirm(message: string = 'Something went wrong!', title: string = 'Alerta'): any {
    return Swal.fire({
      icon: 'question',
      title: title,
      text: message,
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`
    });
  }

  toastConfirm(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    Toast.fire({
      icon: 'success',
      title: message
    });
  }

}
