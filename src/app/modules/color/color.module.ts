import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class ColorModule {
  colors: string[] = [
    '01087C',
    '4048C9',
    '505AFC',
    '020A96',
    '0311FC',
    'FFC432',
    '5CC0C7',
    '079BAB',
    '005D70',
    '0D212C',
    '658791',
    'F2EBD5',
    'F2A62A',
    'F27649',
    'B4766A',
    '0A5159',
    'F2EBC9',
    'BF5111',
    'C13828',
    'F5AC09',
    'FB7963',
    'D24B47',
    'A92C49',
    '5B2055',
    '2F163B',
    'D9C5C5',
    '8198A6',
    '99B1BF',
    'F2F2F2',
    'F2DAD8'
  ];

  getRandomColor(): string {
    return this.colors[(Math.random() * (this.colors.length + 1)) >>> 0];
  }

  //https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  lightenColor(col, amt = 60) {
    col = parseInt(col, 16);
    return (
      ((col & 0x0000ff) + amt) |
      ((((col >> 8) & 0x00ff) + amt) << 8) |
      (((col >> 16) + amt) << 16)
    ).toString(16);
  }

  //https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
  public invertColor(hex, bw = true) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }

    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }

    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    if (bw) {
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
    }

    return (
      '#' +
      this.padZero((255 - r).toString(16)) +
      this.padZero((255 - g).toString(16)) +
      this.padZero((255 - b).toString(16))
    );
  }

  private padZero(str, len?) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
}
