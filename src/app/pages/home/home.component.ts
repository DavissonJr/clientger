import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../shared/services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  clientes: any[] = [];
  totalClientes: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0; // Variável para armazenar o número total de páginas

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clientService.getClientes(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.clientes = response.data;
        this.totalClientes = response.totalCount;
        this.totalPages = Math.ceil(this.totalClientes / this.pageSize); // Cálculo do total de páginas
      },
      (error) => {
        console.error('Erro ao carregar clientes', error);
      }
    );
  }

  // Método para alterar a página
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      // Garantir que a página seja válida
      this.currentPage = page;
      this.loadClientes();
    }
  }
}
