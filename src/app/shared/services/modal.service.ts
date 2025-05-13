import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  confirmarExclusao(callback: () => void): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#052c65',
      cancelButtonColor: '#052c65',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      color: '#052c65',
      iconColor: '#052c65', 
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
        Swal.fire({
          title: 'Excluído!',
          text: 'O item foi excluído com sucesso.',
          icon: 'success',
          background: '#ffffff',
          color: '#052c65',
          iconColor: '#052c65',
          confirmButtonColor: '#052c65',
        });
      }
    });
  }
}
