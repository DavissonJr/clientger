import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inserir-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './inserir-clientes.component.html',
  styleUrl: './inserir-clientes.component.css',
})
export class InserirClientesComponent {
  cliente = {
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
        dataCompra: new Date().toISOString(),
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

  constructor(private http: HttpClient) {}

  salvarCliente() {
    this.http
      .post('https://localhost:7095/api/Cliente', this.cliente)
      .subscribe({
        next: () => alert('Cliente inserido com sucesso!'),
        error: (err) => alert('Erro ao inserir cliente: ' + err.message),
      });
  }
}
