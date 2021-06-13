import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropDown]'
})
export class DropdownDirective {    
    @HostBinding('class.open') // special type of binding: class binding
    isOpen = false;

    @HostListener('click')
    toggleOpen(){
        this.isOpen = !this.isOpen;
    }
}