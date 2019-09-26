import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appSusepMask]'
})
export class SusepMaskDirective {

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
    if (backspace && newVal.length <= 10) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 10) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,5})/, '$1.$2/');
    } else if (newVal.length === 12) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,6})(\d{0,2})/, '$1.$2/$3-');
    } else if (newVal.length === 15) {
      newVal = newVal.replace(/^(\d{0,5})(\d{0,6})(\d{0,2})/, '$1.$2/$3-');
    } else if (newVal.length === 17) {
      newVal = newVal.replace(/^(\d{0,5})(\d{0,6})(\d{0,4})/, '$1.$2/$3-');
    }
    
    this.ngControl.valueAccessor.writeValue(newVal);
  }
}
