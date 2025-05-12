import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../shared/services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskPipe],
  providers: [provideNgxMask()],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  clientes: any[] = [];
  totalClientes: number = 0;
  currentPage: number = 1;
  pageSize: number = 6; // Tamanho da página
  totalPages: number = 0;
  allClientes: any[] = []; // Armazenar todos os clientes sem paginar

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clientService.getClientes().subscribe(
      (response) => {
        this.allClientes = response; // Armazenar todos os clientes recebidos
        this.totalClientes = this.allClientes.length; // Total de clientes
        this.totalPages = Math.ceil(this.totalClientes / this.pageSize); // Calcular o total de páginas
        this.updatePageData(); // Atualiza os dados da página atual
      },
      (error) => {
        console.error('Erro ao carregar clientes', error);
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
      this.updatePageData(); // Atualiza os dados da página quando o usuário mudar de página
    }
  }
}
