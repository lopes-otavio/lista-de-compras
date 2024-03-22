import { Component, DoCheck, OnInit } from '@angular/core';
import { Item } from './interfaces/iItem';
import { ListaDeCompraService } from './service/lista-de-compra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'app-lista-de-compras';
  listaDeCompra!: Array<Item>;
  itemParaSerEditando!: Item;
  idDoItemQueVaiSerDeletado!: Number;

  constructor(private listaService: ListaDeCompraService) {}

  ngOnInit(): void {
    this.listaDeCompra = this.listaService.getListaDeCompra();
  }

  editarItem(item: Item): void {
    this.itemParaSerEditando = item;
  }

  deletarItem(id: string): void {
    const index = this.listaDeCompra.findIndex((item) => item.id === id);
    this.listaDeCompra.splice(index, 1);
  }

  limparLista(): void {
    this.listaDeCompra = [];
    this.listaService.setListaDeCompra(this.listaDeCompra);
  }

  ngDoCheck() {
    this.listaService.atualizarLocalStorage();
  }
}
