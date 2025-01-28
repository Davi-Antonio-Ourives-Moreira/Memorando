import { Component } from '@angular/core';
import { Tarefa } from '../../interfaces/tarefa';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { TarefaService } from '../../services/tarefa.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MensagemComponent } from '../../components/mensagem/mensagem.component';
import { cardHoverAnimations } from '../../animations/cardHover';
@Component({
  selector: 'app-listas-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MensagemComponent],
  templateUrl: './listas-tarefas.component.html',
  styleUrl: './listas-tarefas.component.css',
  animations: [cardHoverAnimations]
})
export class ListasTarefasComponent {
  listaTarefas: Tarefa[] = [];
  formAberto: boolean = false;
  categoria: string = '';
  validado: boolean = false;
  formulario!: FormGroup;
  indexTarefa = -1;
  public group: any;

  constructor(
    private service: TarefaService,
    private router: Router,
    private fomBuilder: FormBuilder
  ) {
    this.formulario = this.fomBuilder.group({
      id: [0],
      descricao: ['', Validators.required],
      statusFinalizado: [false, Validators.required],
      categoria: ['', Validators.required],
      prioridade: ['', Validators.required],
    });
  }

  ngOnInit(): Tarefa[] {
    this.service.listar(this.categoria).subscribe((listaTarefas) => {
      this.listaTarefas = listaTarefas;
    });
    return this.listaTarefas;
  }

  mostrarOuEsconderFormulario() {
    this.formAberto = !this.formAberto;
    this.resetarFormulario();
  }

  salvarTarefa() {
    if (this.formulario.value.id) {
      this.editarTarefa();
    } else {
      this.criarTarefa();
    }
  }

  editarTarefa() {
    this.service.editar(this.formulario.value).subscribe({
      complete: () => this.atualizarComponente(),
    });
  }

  criarTarefa() {
    const formularioLocal = this.formulario.value;

    formularioLocal.id = this.gerarIdMemoria();

    this.service.criar(formularioLocal).subscribe({
      complete: () => this.atualizarComponente(),
    });
  }

  excluirTarefa(id: number) {
    if (id) {
      this.service.excluir(id).subscribe({
        complete: () => this.recarregarComponente(),
      });
    }
  }

  cancelar() {
    this.resetarFormulario();
    this.formAberto = false;
  }

  resetarFormulario() {
    this.formulario.reset({
      descricao: '',
      statusFinalizado: false,
      categoria: '',
      prioridade: '',
    });
  }

  recarregarComponente() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  atualizarComponente() {
    this.recarregarComponente();
    this.resetarFormulario();
  }

  carregarParaEditar(id: number) {
    this.service.buscarPorId(id!).subscribe((tarefa) => {
      this.formulario = this.fomBuilder.group({
        id: [tarefa.id],
        descricao: [tarefa.descricao],
        categoria: [tarefa.categoria],
        statusFinalizado: [tarefa.statusFinalizado],
        prioridade: [tarefa.prioridade],
      });
    });
    this.formAberto = true;
  }

  finalizarTarefa(id: number) {
    this.service.buscarPorId(id!).subscribe((tarefa) => {
      this.service.atualizarStatusTarefa(tarefa).subscribe(() => {
        this.listarAposCheck();
      });
    });
  }

  listarAposCheck() {
    this.service.listar(this.categoria).subscribe((listaTarefas) => {
      this.listaTarefas = listaTarefas;
    });
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao-salvar';
    } else return 'botao-desabilitado';
  }

  campoValidado(campoAtual: string): string {
    if (
      this.formulario.get(campoAtual)?.errors &&
      this.formulario.get(campoAtual)?.touched
    ) {
      this.validado = false;
      return 'form-tarefa input-invalido';
    } else {
      this.validado = true;
      return 'form-tarefa';
    }
  }

  gerarIdMemoria(): string{
    return Math.random().toString(36).substr(2, 9);
  }
}
