import { Item } from 'src/app/interfaces/iItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListaDeCompraService {
  private listaDeCompra: Item[];

  constructor() {
    this.listaDeCompra = JSON.parse(localStorage.getItem('itens') || '[]');
  }

  setListaDeCompra(listaDeCompra: Array<Item>): void {
    this.listaDeCompra = listaDeCompra;
  }
  getListaDeCompra() {
    return this.listaDeCompra;
  }

  criarItem(nome: string) {
    const id = this.listaDeCompra.length + 1;
    const item: Item = {
      id,
      nome,
      data: new Date().toLocaleDateString('pt-BR'),
      comprado: false,
    };
    return item;
  }

  adicionarItemNaLista(nome: string): void {
    const item = this.criarItem(nome);
    this.listaDeCompra.push(item);
  }

  editarItemDaLista(itemAntigo: Item, nomeDoItemEditado: string) {
    const itemEditado: Item = {
      id: itemAntigo.id,
      nome: nomeDoItemEditado,
      data: itemAntigo.data,
      comprado: itemAntigo.comprado,
    };

    const id = itemAntigo.id;
    this.listaDeCompra.splice(Number(id) - 1, 1, itemEditado);
  }

  atualizarLocalStorage() {
    localStorage.setItem('itens', JSON.stringify(this.listaDeCompra));
  }
}
