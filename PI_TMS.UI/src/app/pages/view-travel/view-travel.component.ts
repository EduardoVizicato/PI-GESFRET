import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Travel, Truck } from './models/viewTravel.model';
import { EventService } from '../../shared/service/event.service';
import { ViewTravelService } from './service/view-travel.service';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { WeightFormatPipe } from "../../utils/Formats/WeightFormat/weight-format.pipe";
import { PlateFormatPipe } from "../../utils/Formats/PlateFormat/plate-format.pipe";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-travel',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, WeightFormatPipe, PlateFormatPipe],
  templateUrl: './view-travel.component.html',
  styleUrl: './view-travel.component.css'
})
export class ViewTravelComponent implements OnInit, OnChanges, OnDestroy {
  @Input() travelId!: string;
  viewTravel?: Travel;
  truck?: Truck;

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
    if (!this.travelId) return;

    this.travelSub?.unsubscribe();
    this.travelSub = this.viewTravelService.getTravelById(this.travelId).subscribe(
      (response) => {
        this.viewTravel = response;
        console.log(this.viewTravel);
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

  DownloadPdf() {
    if (this.viewTravel?.id) {
      this.viewTravelService.downloadTravelPdf(this.viewTravel.id).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.viewTravel?.fileName ?? 'document.pdf';
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        },
        error: () => {
          this.eventService.showError('Erro ao baixar PDF.');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.travelSub?.unsubscribe();
    this.truckSub?.unsubscribe();
  }
}