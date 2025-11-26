
import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { Travel, Truck } from './models/viewTravel.model';
import { EventService } from '../../shared/service/event.service';
import { ViewTravelService } from './service/view-travel.service';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { WeightFormatPipe } from "../../utils/Formats/WeightFormat/weight-format.pipe";
import { PlateFormatPipe } from "../../utils/Formats/PlateFormat/plate-format.pipe";
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-travel',
  imports: [PdfViewerModule, DatePipe, CurrencyPipe, WeightFormatPipe, NgIf, PlateFormatPipe],
  templateUrl: './view-travel.component.html',
  styleUrl: './view-travel.component.css'
})
export class ViewTravelComponent implements OnInit, OnChanges, OnDestroy {
  @Input() travelId!: string;
  viewTravel?: Travel;
  truck?: Truck;

  // pdfSrc usado pelo pdf-viewer: Uint8Array
  pdfSrc: Uint8Array | null = null;

  // Blob para download
  private lastBlob: Blob | null = null;

  private downloadSub?: Subscription;
  private travelSub?: Subscription;
  private truckSub?: Subscription;

  constructor(private viewTravelService: ViewTravelService, private eventService: EventService) { }

  ngOnInit() {
    if (this.travelId) {
      this.getTravel();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['travelId'] && changes['travelId'].currentValue) {
      this.getTravel();
    }
  }

  getTravel() {
    this.clearPdf();
    if (!this.travelId) return;

    this.travelSub?.unsubscribe();
    this.travelSub = this.viewTravelService.getTravelById(this.travelId).subscribe(
      (response) => {
        this.viewTravel = response;
        if (this.viewTravel?.id) {
          // CARREGAR E VALIDAR (inspeciona headers para evitar HTML/erro)
          this.loadPdfWithValidation(this.viewTravel.id);
        }
        this.getTruck();
      },
      (error) => {
        this.eventService.showError('Erro inesperado ao carregar viagem.');
      }
    );
  }

  getTruck() {
    if (!this.viewTravel?.truckId) return;
    this.truckSub?.unsubscribe();
    this.truckSub = this.viewTravelService.getTruckById(this.viewTravel.truckId).subscribe(
      (response) => {
        this.truck = response;
      },
      (error) => {
        this.eventService.showError('Erro ao carregar caminhão.');
      }
    );
  }

  /**
   * Baixa o arquivo e valida o conteúdo:
   * - checa header Content-Type
   * - se for HTML (ou outro texto), mostra erro (muitas vezes é uma página de login/erro)
   * - caso seja binário PDF, carrega no pdf-viewer
   */
  private loadPdfWithValidation(id: string) {
    this.clearPdf();

    this.downloadSub?.unsubscribe();
    this.downloadSub = this.viewTravelService.downloadTravelPdfWithResponse(id).subscribe({
      next: (resp: HttpResponse<ArrayBuffer>) => {
        const contentType = resp.headers.get('content-type') || '';
        // Se o servidor respondeu com tipo diferente de pdf, provável erro/HTML
        if (!contentType.toLowerCase().includes('pdf')) {
          // tenta detectar HTML nos primeiros bytes (fallback)
          const firstChunk = this.arrayBufferToString(resp.body, 0, 256).toLowerCase();
          if (firstChunk.includes('<html') || firstChunk.includes('<!doctype') || firstChunk.includes('doctype html')) {
            console.error('Resposta do download é HTML (provável erro/autenticação). Conteúdo:', firstChunk);
            this.eventService.showError('Documento não disponível: servidor retornou HTML (verifique autenticação/CORS).');
            return;
          }

          // outro tipo inesperado
          console.error('Content-Type inesperado ao baixar PDF:', contentType);
          this.eventService.showError('Documento não disponível (Content-Type inválido).');
          return;
        }

        // OK: é PDF — converte para Uint8Array e cria Blob para download
        const buffer = resp.body as ArrayBuffer;
        const uint8 = new Uint8Array(buffer);
        this.pdfSrc = uint8;
        this.lastBlob = new Blob([buffer], { type: 'application/pdf' });
      },
      error: (err: { status: number; }) => {
        console.error('Erro ao baixar PDF', err);
        // se 401/302/etc pode estar redirecionando para página de login (HTML)
        if (err?.status === 401) {
          this.eventService.showError('Não autorizado. Faça login.');
        } else {
          this.eventService.showError('Erro ao carregar documento PDF.');
        }
      }
    });
  }

  // Botão "Baixar" (usa o blob em memória ou re-baixa se necessário)
  DownloadPdf() {
    if (this.lastBlob) {
      const url = URL.createObjectURL(this.lastBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.viewTravel?.fileName ?? 'document.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return;
    }

    // fallback: rebaixar sem inspeção (ou pode chamar downloadTravelPdfWithResponse de novo)
    if (this.viewTravel?.id) {
      this.viewTravelService.downloadTravelPdf(this.viewTravel.id).subscribe({
        next: (arrayBuffer) => {
          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.viewTravel?.fileName ?? 'document.pdf';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        },
        error: () => {
          this.eventService.showError('Erro ao baixar PDF.');
        }
      });
    }
  }

  // converte parte do ArrayBuffer para string (ASCII/UTF-8 aproximado) — usado para detectar <html>
  private arrayBufferToString(buffer: ArrayBuffer | null, start = 0, length = 256): string {
    if (!buffer) return '';
    const bytes = new Uint8Array(buffer);
    const end = Math.min(bytes.length, start + length);
    let s = '';
    for (let i = start; i < end; i++) {
      s += String.fromCharCode(bytes[i]);
    }
    try {
      // tenta decodificar UTF-8 (melhor leitura)
      return new TextDecoder().decode(bytes.subarray(start, end));
    } catch {
      return s;
    }
  }

  private clearPdf() {
    this.pdfSrc = null;
    this.lastBlob = null;
  }

  ngOnDestroy(): void {
    this.downloadSub?.unsubscribe();
    this.travelSub?.unsubscribe();
    this.truckSub?.unsubscribe();
    this.clearPdf();
  }
}