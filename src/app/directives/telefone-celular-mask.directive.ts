import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appTelefoneCelularMask]'
})
export class TelefoneCelularMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event, backspace) {
    let newVal = event.replace(/\D/g, '');
    if (backspace && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length === 8) {
      newVal = newVal.replace(/^(\d{0,4})(\d{0,4})/, '$1-$2');
    } else if (newVal.length === 9) {
      newVal = newVal.replace(/^(\d{0,5})(\d{0,4})/, '$1-$2');
    } else if (newVal.length === 10) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})/, '($1) $2-$3');
    } else if (newVal.length === 11) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
    } else if (newVal.length === 13) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,5})(\d{0,4})/, '+$1 ($2) $3-$4');
    } 
    this.ngControl.valueAccessor.writeValue(newVal);
  }
}
