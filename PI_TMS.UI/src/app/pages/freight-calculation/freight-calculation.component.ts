import { CurrencyPipe } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface FreightTable {
  [key: string]: {
    [cargoType: number]: {
      displacement: { [axes: number]: number };
      loadUnload: { [axes: number]: number };
    };
  };
}

@Component({
  selector: 'app-freight-calculation',
  imports: [ CurrencyPipe, ReactiveFormsModule],
  templateUrl: './freight-calculation.component.html',
  styleUrl: './freight-calculation.component.css',
})

export class FreightCalculationComponent implements OnInit {

  calcForm: FormGroup;
  calculatedValue: number = 0;
  showResult: boolean = false;

  private freightTables: FreightTable = {
    'A': {
      1: { displacement: { 2: 3.7421, 3: 4.7423, 4: 5.4133, 5: 5.7673, 6: 6.4431, 7: 7.3863, 9: 8.3346 }, loadUnload: { 2: 413.06, 3: 503.16, 4: 547.19, 5: 503.06, 6: 534.98, 7: 729.94, 9: 782.50 } },
      2: { displacement: { 2: 3.7975, 3: 4.8140, 4: 5.6223, 5: 5.9126, 6: 6.5789, 7: 7.5406, 9: 8.4986 }, loadUnload: { 2: 420.01, 3: 514.58, 4: 588.12, 5: 526.44, 6: 555.76, 7: 755.80, 9: 811.04 } },
      3: { displacement: { 2: 4.3949, 3: 5.5382, 4: 6.4295, 5: 6.8793, 6: 7.6390, 7: 8.8913, 9: 9.9944 }, loadUnload: { 2: 470.77, 3: 563.73, 4: 641.71, 5: 597.75, 6: 623.07, 7: 903.05, 9: 961.91 } },
      4: { displacement: { 3: 4.8151, 4: 5.3495, 5: 5.6974, 6: 6.3669, 7: 7.4249, 9: 8.2864 }, loadUnload: { 3: 523.18, 4: 529.65, 5: 483.84, 6: 514.02, 7: 740.55, 9: 769.24 } },
      5: { displacement: { 2: 3.7116, 3: 4.7063, 4: 5.3919, 5: 5.7491, 6: 6.4328, 7: 7.3819, 9: 8.3597 }, loadUnload: { 2: 404.67, 3: 493.25, 4: 541.33, 5: 498.04, 6: 532.13, 7: 728.74, 9: 789.41 } },
      6: { displacement: { 2: 3.3596, 3: 4.7056, 4: 5.4037, 5: 5.7402, 6: 6.4258, 7: 7.4215, 9: 8.3528 }, loadUnload: { 2: 404.67, 3: 493.06, 4: 544.57, 5: 495.60, 6: 530.22, 7: 739.60, 9: 787.50 } },
      7: { displacement: { 2: 4.4451, 3: 5.4453, 4: 6.1625, 5: 6.5166, 6: 7.1923, 7: 8.1635, 9: 9.1412 }, loadUnload: { 2: 547.62, 3: 637.73, 4: 689.83, 5: 645.70, 6: 677.62, 7: 880.27, 9: 940.93 } },
      8: { displacement: { 2: 4.5121, 3: 5.5286, 4: 6.3530, 5: 6.6433, 6: 7.3096, 7: 8.2993, 9: 9.2867 }, loadUnload: { 2: 566.04, 3: 660.62, 4: 742.24, 5: 680.55, 6: 709.88, 7: 917.61, 9: 980.95 } },
      9: { displacement: { 2: 4.9455, 3: 6.0888, 4: 7.0111, 5: 7.4609, 6: 8.2206, 7: 9.5092, 9: 10.6506 }, loadUnload: { 2: 570.02, 3: 662.98, 4: 751.48, 5: 707.52, 6: 732.84, 7: 1022.80, 9: 1092.20 } },
      10: { displacement: { 3: 5.1524, 4: 5.7330, 5: 6.0809, 6: 6.7504, 7: 7.8364, 9: 8.7273 }, loadUnload: { 3: 611.30, 4: 625.86, 5: 580.04, 6: 610.22, 7: 844.45, 9: 881.24 } },
      11: { displacement: { 2: 4.0488, 3: 5.0436, 4: 5.7754, 5: 6.1326, 6: 6.8162, 7: 7.7934, 9: 8.8006 }, loadUnload: { 2: 492.80, 3: 581.37, 4: 637.53, 5: 594.24, 6: 628.33, 7: 832.63, 9: 901.40 } },
      12: { displacement: { 5: 6.0407, 6: 6.7779, 9: 8.7789 }, loadUnload: { 5: 578.22, 6: 627.03, 9: 904.69 } }
    },
    'B': {
      1: { displacement: { 4: 4.8719, 5: 5.4308, 6: 6.1348, 7: 6.4985, 9: 7.1109 }, loadUnload: { 4: 495.49, 5: 539.23, 6: 578.93, 7: 655.73, 9: 679.04 } },
      2: { displacement: { 4: 4.9321, 5: 5.4910, 6: 6.1950, 7: 6.5587, 9: 7.1711 }, loadUnload: { 4: 495.49, 5: 539.23, 6: 578.93, 7: 655.73, 9: 679.04 } },
      3: { displacement: { 4: 5.7088, 5: 6.3627, 6: 7.1747, 7: 7.5663, 9: 8.3401 }, loadUnload: { 4: 540.69, 5: 584.43, 6: 624.13, 7: 708.62, 9: 740.03 } },
      4: { displacement: { 4: 4.8719, 5: 5.4308, 6: 6.1348, 7: 6.4985, 9: 7.1109 }, loadUnload: { 4: 495.49, 5: 539.23, 6: 578.93, 7: 655.73, 9: 679.04 } },
      5: { displacement: { 4: 4.8719, 5: 5.4308, 6: 6.1348, 7: 6.4985, 9: 7.1109 }, loadUnload: { 4: 495.49, 5: 539.23, 6: 578.93, 7: 655.73, 9: 679.04 } },
      6: { displacement: { 4: 4.8719, 5: 5.4308, 6: 6.1348, 7: 6.4985, 9: 7.1109 }, loadUnload: { 4: 495.49, 5: 539.23, 6: 578.93, 7: 655.73, 9: 679.04 } },
      7: { displacement: { 4: 5.6211, 5: 6.1800, 6: 6.8840, 7: 7.2757, 9: 7.9176 }, loadUnload: { 4: 638.13, 5: 681.88, 6: 721.57, 7: 806.06, 9: 837.48 } },
      8: { displacement: { 4: 5.6628, 5: 6.2217, 6: 6.9258, 7: 7.3174, 9: 7.9593 }, loadUnload: { 4: 649.60, 5: 693.35, 6: 733.04, 7: 817.53, 9: 848.95 } },
      9: { displacement: { 4: 6.2904, 5: 6.9443, 6: 7.7563, 7: 8.1843, 9: 8.9963 }, loadUnload: { 4: 650.45, 5: 694.20, 6: 733.89, 7: 828.38, 9: 870.33 } },
      10: { displacement: { 4: 5.2554, 5: 5.8143, 6: 6.5183, 7: 6.9099, 9: 7.5518 }, loadUnload: { 4: 591.69, 5: 635.44, 6: 675.13, 7: 759.62, 9: 791.04 } },
      11: { displacement: { 4: 5.2554, 5: 5.8143, 6: 6.5183, 7: 6.9099, 9: 7.5518 }, loadUnload: { 4: 591.69, 5: 635.44, 6: 675.13, 7: 759.62, 9: 791.04 } },
      12: { displacement: { 5: 5.4308, 6: 6.1348, 9: 7.1109 }, loadUnload: { 5: 539.23, 6: 578.93, 9: 679.04 } }
    },
    'C': {
      1: { displacement: { 2: 3.1786, 3: 3.9689, 4: 4.6076, 5: 5.1855, 6: 5.8057, 7: 6.2217, 9: 7.1180 }, loadUnload: { 2: 154.94, 3: 174.36, 4: 195.46, 5: 205.91, 6: 215.89, 7: 245.88, 9: 268.84 } },
      2: { displacement: { 2: 3.2178, 3: 4.0139, 4: 4.7212, 5: 5.2763, 6: 5.8930, 7: 6.3157, 9: 7.2155 }, loadUnload: { 2: 156.44, 3: 176.82, 4: 204.28, 5: 210.95, 6: 220.37, 7: 251.45, 9: 274.99 } },
      3: { displacement: { 2: 3.7939, 3: 4.7206, 4: 5.5216, 5: 6.1948, 6: 6.9143, 7: 7.4614, 9: 8.5190 }, loadUnload: { 2: 183.37, 3: 203.41, 4: 235.30, 5: 245.80, 6: 254.35, 7: 305.97, 9: 333.78 } },
      4: { displacement: { 3: 3.9950, 4: 4.5847, 5: 5.1604, 6: 5.7783, 7: 6.2355, 9: 7.1007 }, loadUnload: { 3: 178.67, 4: 191.68, 5: 201.77, 6: 211.37, 7: 248.16, 9: 265.98 } },
      5: { displacement: { 2: 3.1677, 3: 3.9559, 4: 4.5999, 5: 5.1790, 6: 5.8020, 7: 6.2201, 9: 7.1270 }, loadUnload: { 2: 153.14, 3: 172.22, 4: 194.19, 5: 204.83, 6: 215.27, 7: 245.62, 9: 270.33 } },
      6: { displacement: { 2: 2.8119, 3: 3.9513, 4: 4.5866, 5: 5.1583, 6: 5.7786, 7: 6.2043, 9: 7.0858 }, loadUnload: { 2: 152.51, 3: 171.46, 4: 192.00, 5: 201.42, 6: 211.42, 7: 243.01, 9: 263.52 } },
      7: { displacement: { 2: 3.6650, 3: 4.4553, 4: 5.1424, 5: 5.7204, 6: 6.3405, 7: 6.7866, 9: 7.7147 }, loadUnload: { 2: 199.94, 3: 219.35, 4: 245.67, 5: 256.13, 6: 266.10, 7: 301.06, 9: 329.26 } },
      8: { displacement: { 2: 3.6890, 3: 4.4851, 4: 5.2109, 5: 5.7659, 6: 6.3827, 7: 6.8354, 9: 7.7669 }, loadUnload: { 2: 203.91, 3: 224.28, 4: 256.96, 5: 263.64, 6: 273.05, 7: 309.11, 9: 337.89 } },
      9: { displacement: { 2: 4.2392, 3: 5.1659, 4: 6.0009, 5: 6.6741, 6: 7.3936, 7: 7.9798, 9: 9.0787 }, loadUnload: { 2: 225.56, 3: 245.59, 4: 284.28, 5: 294.77, 6: 303.33, 7: 361.40, 9: 396.03 } },
      10: { displacement: { 3: 4.2239, 4: 4.8621, 5: 5.4378, 6: 6.0557, 7: 6.5431, 9: 7.4400 }, loadUnload: { 3: 213.67, 4: 231.89, 5: 241.99, 6: 251.59, 7: 293.36, 9: 316.42 } },
      11: { displacement: { 2: 3.3965, 3: 4.1848, 4: 4.8773, 5: 5.4563, 6: 6.0793, 7: 6.5276, 9: 7.4662 }, loadUnload: { 2: 188.12, 3: 207.21, 4: 234.40, 5: 245.04, 6: 255.48, 7: 290.80, 9: 320.75 } },
      12: { displacement: { 5: 5.2837, 6: 5.9259, 9: 7.2776 }, loadUnload: { 5: 222.11, 6: 235.72, 9: 295.17 } }
    },
    'D': {
      1: { displacement: { 4: 4.1872, 5: 4.6441, 6: 5.2557, 7: 5.5073, 9: 6.1359 }, loadUnload: { 4: 184.32, 5: 193.74, 6: 202.29, 7: 229.89, 9: 246.55 } },
      2: { displacement: { 4: 4.2474, 5: 4.7043, 6: 5.3159, 7: 5.5675, 9: 6.1961 }, loadUnload: { 4: 184.32, 5: 193.74, 6: 202.29, 7: 229.89, 9: 246.55 } },
      3: { displacement: { 4: 5.0368, 5: 5.5888, 6: 6.3083, 7: 6.5900, 9: 7.3823 }, loadUnload: { 4: 213.53, 5: 222.96, 6: 231.51, 7: 264.08, 9: 285.97 } },
      4: { displacement: { 4: 4.1872, 5: 4.6441, 6: 5.2557, 7: 5.5073, 9: 6.1359 }, loadUnload: { 4: 184.32, 5: 193.74, 6: 202.29, 7: 229.89, 9: 246.55 } },
      5: { displacement: { 4: 4.1872, 5: 4.6441, 6: 5.2557, 7: 5.5073, 9: 6.1359 }, loadUnload: { 4: 184.32, 5: 193.74, 6: 202.29, 7: 229.89, 9: 246.55 } },
      6: { displacement: { 4: 4.1872, 5: 4.6441, 6: 5.2557, 7: 5.5073, 9: 6.1359 }, loadUnload: { 4: 184.32, 5: 193.74, 6: 202.29, 7: 229.89, 9: 246.55 } },
      7: { displacement: { 4: 4.7220, 5: 5.1790, 6: 5.7905, 7: 6.0722, 9: 6.7326 }, loadUnload: { 4: 234.53, 5: 243.96, 6: 252.51, 7: 285.07, 9: 306.97 } },
      8: { displacement: { 4: 4.7370, 5: 5.1940, 6: 5.8055, 7: 6.0872, 9: 6.7476 }, loadUnload: { 4: 237.00, 5: 246.43, 6: 254.98, 7: 287.54, 9: 309.44 } },
      9: { displacement: { 4: 5.5161, 5: 6.0681, 6: 6.7875, 7: 7.1084, 9: 7.9419 }, loadUnload: { 4: 262.51, 5: 271.94, 6: 280.49, 7: 319.51, 9: 348.22 } },
      10: { displacement: { 4: 4.4645, 5: 4.9215, 6: 5.5330, 7: 5.8147, 9: 6.4751 }, loadUnload: { 4: 224.52, 5: 233.95, 6: 242.50, 7: 275.07, 9: 296.96 } },
      11: { displacement: { 4: 4.4645, 5: 4.9215, 6: 5.5330, 7: 5.8147, 9: 6.4751 }, loadUnload: { 4: 224.52, 5: 233.95, 6: 242.50, 7: 275.07, 9: 296.96 } },
      12: { displacement: { 5: 4.6441, 6: 5.2557, 9: 6.1359 }, loadUnload: { 5: 193.74, 6: 202.29, 9: 246.55 } }
    }
  };

  constructor(private fb: FormBuilder) {
    this.calcForm = this.fb.group({
      tipoCarga: ['', Validators.required],
      numeroEixos: ['', Validators.required],
      distancia: ['', [Validators.required, Validators.min(1)]],
      cargaLotacao: ['nao', Validators.required],
      altoDesempenho: ['nao', Validators.required],
      retornoVazio: ['nao', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  private determineTable(): string {
    const isComposicao = this.calcForm.get('cargaLotacao')?.value === 'sim';
    const isAltoDesempenho = this.calcForm.get('altoDesempenho')?.value === 'sim';

    if (isComposicao && isAltoDesempenho) return 'C';
    if (isComposicao && !isAltoDesempenho) return 'A';
    if (!isComposicao && isAltoDesempenho) return 'D';
    if (!isComposicao && !isAltoDesempenho) return 'B';

    return 'A';
  }

  private findNearestAxes(cargoData: any, selectedAxes: number): number | null {
    const availableAxes = Object.keys(cargoData.displacement).map(Number).sort((a, b) => a - b);

    if (availableAxes.includes(selectedAxes)) {
      return selectedAxes;
    }

    const lower = availableAxes.filter(ax => ax < selectedAxes).pop();
    if (lower !== undefined) {
      return lower;
    }

    const upper = availableAxes.find(ax => ax > selectedAxes);
    if (upper !== undefined) {
      return upper;
    }
    
    return null; 
  }

  calculateFreight(): void {
    if (!this.calcForm.valid) {
      this.calculatedValue = 0;
      this.showResult = false;
      return;
    }

    const tipoCarga = parseInt(this.calcForm.get('tipoCarga')?.value);
    const numeroEixos = parseInt(this.calcForm.get('numeroEixos')?.value);
    const distancia = parseFloat(this.calcForm.get('distancia')?.value);
    const retornoVazio = this.calcForm.get('retornoVazio')?.value === 'sim';

    const tabela = this.determineTable();
    const tableData = this.freightTables[tabela];

    if (!tableData || !tableData[tipoCarga]) {
      this.calculatedValue = 0;
      this.showResult = false;
      return;
    }

    const cargoData = tableData[tipoCarga];
    const effectiveAxes = this.findNearestAxes(cargoData, numeroEixos);

    if (effectiveAxes === null) {
      return;
    }

    const ccd = cargoData.displacement[effectiveAxes];
    const cc = cargoData.loadUnload[effectiveAxes];

    if (!ccd || !cc) {
      this.calculatedValue = 0;
      this.showResult = false;
      return;
    }

    let valorFrete = (distancia * ccd) + cc;

    if (retornoVazio) {
      const valorRetornoVazio = 0.92 * distancia * ccd;
      valorFrete += valorRetornoVazio;
    }

    this.calculatedValue = valorFrete;
    this.showResult = true;
  }

  onCalculateDistance(): void {
    
    alert('Funcionalidade de cálculo de distância será implementada em breve!');
  }

  onSubmit(): void {
      this.calculateFreight();
  }
}