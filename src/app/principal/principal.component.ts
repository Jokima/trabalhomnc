import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const math = require('mathjs');

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  metodo: string;
  a: number;
  b: number;
  precisao: number;
  x: number;
  funcao: string;

  metodoForm: FormGroup;

  iteracoes = [];

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
    this.metodoForm = this.fb.group({
      a: 0,
      b: 0,
      precisao: 0,
      x: 0,
      funcao: ''
    });
  }

  calcularMetodo(metodo) {
    if (metodo === 'bisseccao') {
      this.metodoBisseccao(this.metodoForm.value);
    }
    if (metodo === 'cordas') {
    }
    if (metodo === 'cordasmod') {
    }
    if (metodo === 'newton') {
    }
    if (metodo === 'newtonmod') {
    }
  }

  metodoBisseccao(form) {
    let fx = 0;
    let fa = 0;
    let fb = 0;
    let a = form.a;
    let b = form.b;
    let iteracao = 1;
    this.iteracoes.splice(0);

    fa = this.resolveFuncao(a, form.funcao);

    fb = this.resolveFuncao(b, form.funcao);

    let x = ((a + b) / 2);
    fx = this.resolveFuncao(x, form.funcao);

    this.iteracoes.push({
      ix: x,
      ifx: fx,
      i: iteracao
    });

    if (fa * fb < 0) {
      console.log('Existe raíz');
      while ((Math.abs(fx) > form.precisao) && (b - a) > form.precisao) {
        iteracao++;
        if (fa * fx > 0) {
          a = x;
        } else {
          b = x;
        }
        x = (a + b) / 2;
        fx = this.resolveFuncao(x, form.funcao);
        this.iteracoes.push({
          ix: x,
          ifx: fx,
          i: iteracao
        });
      }
    } else {
      alert('Não existe raíz neste intervalo.');
    }
  }

  resolveFuncao(valor, funcao) {
    console.log('valor: ' + valor);
    const parser = math.parser();
    parser.set('x', valor);
    const result = parser.eval(funcao);
    console.log(result);
    return result;
  }

}
