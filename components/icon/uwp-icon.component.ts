import {
  AfterViewInit,
  Component, ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

// @ts-ignore
import { Icons } from './icons';


@Component({
  selector: '[uwpIcon]',
  exportAs: 'uwpIcon',
  templateUrl: './uwp-icon.component.html',
  styleUrls: ['./uwp-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UwpIconComponent implements AfterViewInit {
  private _iconType: string;

  @Input() class = '';
  @Input()
  set iconType(value: string) {
    const _value = value.toLowerCase();
    this._iconType = Icons[_value.charAt(0).toUpperCase() + _value.slice(1)];
  }

  get iconType() {
    return this._iconType;
  }

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'uwp-icon',
      this.class,
    ].join(' ');
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    this.createIconElement();
  }

  private setElement(element: HTMLElement) {
    this.renderer.appendChild(this.el.nativeElement, element);
  }

  private createIconElement() {
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(this.iconType);
    this.renderer.appendChild(span, text);
    this.setElement(span);
  }
}
