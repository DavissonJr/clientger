import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../../shared/services/modal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-inserir-clientes',
  templateUrl: './inserir-clientes.component.html',
  providers: [provideNgxMask()],
  imports: [FormsModule, CommonModule, NgxMaskDirective],
})
export class InserirClientesComponent {
  cliente = this.resetarCliente();

  constructor(private http: HttpClient, private modalService: ModalService) {}

  salvarCliente() {
    const payload = {
      ...this.cliente,
      telefone: this.cliente.telefone.replace(/\D/g, ''), // remove tudo que não for number (por conta da mask)
      cpf: this.cliente.cpf.replace(/\D/g, ''), // igual o de cima
    };

    this.http.post('https://localhost:7095/api/Cliente', payload).subscribe({
      next: () => {
        this.modalService.mostrarSucesso('Cliente inserido com sucesso!');
        this.cliente = this.resetarCliente();
      },
      error: (err) => {
        this.modalService.mostrarSucesso(
          'Erro ao inserir cliente: ' + err.message
        );
      },
    });
  }

  private resetarCliente() {
    return {
      id: 0,
      nome: '',
      telefone: '',
      cpf: '',
      endereco: '',
      observacoes: '',
      compras: [
        {
          id: 0,
          clienteId: 0,
          dataCompra: '',
          formaPagamento: '',
          itens: [
            {
              id: 0,
              compraId: 0,
              nomeProduto: '',
              quantidade: 0,
              valorUnitario: 0,
            },
          ],
        },
      ],
    };
  }
}
