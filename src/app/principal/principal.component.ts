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

  displayedColumns: string[];
  dataSource: any;

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
      this.metodoNewton(this.metodoForm.value);
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
    let bmenosa = 0;
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
      while ((Math.abs(fx) > form.precisao) && Math.abs((b - a)) > form.precisao) {
        iteracao++;
        if (fa * fx > 0) {
          a = x;
        } else {
          b = x;
        }
        x = (a + b) / 2;
        fx = this.resolveFuncao(x, form.funcao);
        bmenosa = (b - a);
        this.iteracoes.push({
          ix: x,
          ifx: fx,
          bma: bmenosa,
          i: iteracao
        });
      }
      this.dataSource = this.iteracoes;
      this.displayedColumns = ['iteracao', 'x', 'fx', 'bma'];
    } else {
      alert('Não existe raíz neste intervalo.');
    }
  }

  metodoNewton(form) {
    let fx = 0;
    let dx = 0;
    let iteracao = 1;
    let x = form.x;
    let xatual = 0;
    let xmx = 0;
    this.iteracoes.splice(0);
    fx = this.resolveFuncao(x, form.funcao);
    dx = this.derivar(x, form.funcao);
    xatual = x - (fx / dx);
    xmx = Math.abs(xatual - x);
    this.iteracoes.push({
      ix: x,
      ifx: fx,
      idx: dx,
      ixmx: xmx,
      i: iteracao
    });
    x = xatual;
    while ((Math.abs(fx) > form.precisao) && xmx > form.precisao) {
      iteracao ++;
      fx = this.resolveFuncao(xatual, form.funcao);
      dx = this.derivar(xatual, form.funcao);
      xatual = xatual - (fx / dx);
      xmx = Math.abs(xatual - x);
      this.iteracoes.push({
        ix: x,
        ifx: fx,
        idx: dx,
        ixmx: xmx,
        i: iteracao
      });
      x = xatual;
    }
    this.dataSource = this.iteracoes;
    this.displayedColumns = ['iteracao', 'x', 'fx', 'dx', 'xmx'];
  }

  resolveFuncao(valor, funcao) {
    const parser = math.parser();
    parser.set('x', valor);
    const result = parser.eval(funcao);
    return result;
  }

  derivar(valor, funcao) {
    const result = math.derivative(funcao, 'x').eval({x: valor});
    return result;
  }

}
