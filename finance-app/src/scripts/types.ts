export interface Registro {
  fecha: string;
  monto: number;
  concepto: string;
}

export interface ConfigColumna {
  inicio: number;
  colFecha: number;
  colMonto: number;
  colConcepto: number;
  nombre: string;
}

export interface CategoriaCache {
  id: number;
  nombre: string;
  normalizado: string;
}
