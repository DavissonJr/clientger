import { ModalService } from './../../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../shared/services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import Papa from 'papaparse';

@Component({
  selector: 'app-home',
  templateUrl: './client.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskPipe],
  providers: [provideNgxMask()],
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clientes: any[] = [];
  totalClientes: number = 0;
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;
  allClientes: any[] = [];
  tabelaVisivel: boolean = true;
  loading: boolean = false;

  constructor(
    private clientService: ClientService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  confirmarExclusao(): void {
    this.modalService.confirmarExclusao(() => {
      console.log('Excluindo...');
    });
  }

  loadClientes(): void {
    this.loading = true;
    this.clientService.getClientes().subscribe(
      (response) => {
        this.allClientes = response; // Armazenar todos os clientes recebidos
        this.totalClientes = this.allClientes.length;
        this.totalPages = Math.ceil(this.totalClientes / this.pageSize); // Calcular o total de páginas
        this.updatePageData(); // Atualiza os dados da página
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao carregar clientes', error);
        this.loading = false;
      }
    );
  }

  // Atualiza os clientes da página atual
  updatePageData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.clientes = this.allClientes.slice(startIndex, endIndex); // Filtra os clientes para a página atual
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePageData();
    }
  }

  // Alternar status do cliente
  toggleStatus(cliente: any): void {
    cliente.status = cliente.status === 'ativo' ? 'inativo' : 'ativo';
    this.updatePageData(); // Atualiza os dados da página após a mudança de status
  }

  // Exportar lista de clientes para CSV
  exportarCSV(): void {
    const csvData = Papa.unparse(this.allClientes); // Converte os dados em CSV usando a biblioteca PapaParse
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'clientes.csv');
    link.click(); // Dispara o download do CSV
  }

  // Alternar visibilidade da tabela de clientes
  toggleTabela(): void {
    this.tabelaVisivel = !this.tabelaVisivel;
  }
}
