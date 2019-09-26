import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'susep'
})
export class SusepPipe implements PipeTransform {
  private tamanho17: number = 17
  private formato17: string = "00000.000000/0000-00"
  private tamanho15: number = 15
  private formato15: string = "00000.000000/00-00"
  private tamanho12: number = 12
  private formato12: string = "00.000000/00-00"
  private tamanho10: number = 10
  private formato10: string = "000.00000/00"

  public transform(value: any, ...args: any[]): any {
    return null;
  }

  /**
   * 
   * @param SUSEP string sem formatação
   * @fonte http://www.susep.gov.br/menu/consulta-de-produtos-1
   * @example com 17 digitos: adicionaMascaraSUSEP('12345678912345678'): '12345.678912/3456-78'
   * @example com 15 digitos: adicionaMascaraSUSEP('123456789123552'): '12345.678912/35-52'
   * @example com 12 digitos: adicionaMascaraSUSEP('123456789123'): '12.345678/91-23'
   * @example com 10 digitos: adicionaMascaraSUSEP('1234567891'): '123.45678/91'
   */
  public adicionaMascaraSUSEP(SUSEP: string): string {
    if (SUSEP.length === this.tamanho17) {
      return aplicarMascara(SUSEP, this.formato17)
    } else if (SUSEP.length === this.tamanho15) {
      return aplicarMascara(SUSEP, this.formato15)
    } else if (SUSEP.length === this.tamanho12) {
      return aplicarMascara(SUSEP, this.formato12)
    } else if (SUSEP.length === this.tamanho10) {
      return aplicarMascara(SUSEP, this.formato10)
    }
  }
}

const aplicarMascara = (valor: string, mascara: string) => {
  const literalPattern = /[0\*]/;
  const numberPattern = /[0-9]/;
  let newValue = "";
  try {
    for (let vId: number = 0, mId: number = 0; mId < mascara.length;) {
      if (vId > valor.length) {
        break;
      }

      // Number expected but got a different value, store only the valid portion
      if (valor[vId] == undefined) {
        break;
      }
      if (mascara[mId] == '0' && valor[vId].match(numberPattern) == null) {
        break;
      }

      // Found a literal
      while (mascara[mId].match(literalPattern) == null) {
        if (valor[vId] == mascara[mId]) {
          break;
        }
        newValue += mascara[mId++];
      }
      newValue += valor[vId++];
      mId++;
    }
    return newValue;
  } catch (e) {
    return newValue;
  }
}