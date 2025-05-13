import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  editarCliente(cliente: any, salvarCallback: (cliente: any) => void): void {
    Swal.fire({
      title: 'Editar Cliente',
      html: `
        <form id="form-edicao">
          <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" value="${cliente.nome}" required>
          </div>
          <div class="mb-3">
            <label for="telefone" class="form-label">Telefone</label>
            <input type="text" class="form-control" id="telefone" value="${cliente.telefone}" required>
          </div>
          <div class="mb-3">
            <label for="cpf" class="form-label">CPF</label>
            <input type="text" class="form-control" id="cpf" value="${cliente.cpf}" required>
          </div>
          <div class="mb-3">
            <label for="endereco" class="form-label">Endereço</label>
            <input type="text" class="form-control" id="endereco" value="${cliente.endereco}">
          </div>
          <div class="mb-3">
            <label for="observacoes" class="form-label">Observações</label>
            <input type="text" class="form-control" id="observacoes" value="${cliente.observacoes}">
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      color: '#052c65',
      iconColor: '#052c65',
      preConfirm: () => {
        const nome = (document.getElementById('nome') as HTMLInputElement)
          .value;
        const telefone = (
          document.getElementById('telefone') as HTMLInputElement
        ).value;
        const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
        const endereco = (
          document.getElementById('endereco') as HTMLInputElement
        ).value;
        const observacoes = (
          document.getElementById('observacoes') as HTMLInputElement
        ).value;

        if (!nome || !telefone || !cpf) {
          Swal.showValidationMessage('Nome, telefone e CPF são obrigatórios!');
          return null;
        }

        // Retorna os dados atualizados
        return {
          nome,
          telefone,
          cpf,
          endereco,
          observacoes,
        };
      },
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        // Atualiza os dados do cliente
        cliente.nome = result.value.nome;
        cliente.telefone = result.value.telefone;
        cliente.cpf = result.value.cpf;
        cliente.endereco = result.value.endereco;
        cliente.observacoes = result.value.observacoes;

        // Chama o callback com o cliente atualizado
        salvarCallback(cliente);
        this.mostrarSucesso('Cliente atualizado com sucesso!');
      }
    });
  }

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

  mostrarSucesso(mensagem: string): void {
    Swal.fire({
      title: 'Sucesso!',
      text: mensagem,
      icon: 'success',
      background: '#ffffff',
      color: '#052c65',
      iconColor: '#052c65',
      confirmButtonColor: '#052c65',
    });
  }
}
