import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IotService } from './iot.service';

/**
 * Sample: an IoT project with no real device behind it.
 * One card per room; inside a card, one row per device
 * with its state in words and a switch to flip it; under
 * the devices, the room's short history, newest first,
 * with plain times like 5 min ago. The component is a
 * thin shell: the rooms live in IotService, and refresh
 * rebuilds the view rows, times included, after every
 * flip, the same shape the Todo sample uses.
 */
@Component({
  selector: 'app-iot-sample',
  templateUrl: './iot-sample.component.html',
  styles: [`
    .room-card { gap: 8px; padding: 16px; }
    .dev-row { flex-direction: row; align-items: center; gap: 12px; }
    .dev-main { flex: 1; gap: 4px; }
    .dev-name { font-size: 16px; }
    .win-row { flex-direction: row; gap: 12px; }
    .win-pick { flex: 1; }
    .dev-state { font-size: 12px; color: #5f6368; }
    .hist { font-size: 12px; color: #5f6368; }
  `],
})
export class IotSampleComponent {
  roomViews: any[] = [];

  constructor(
    public iot: IotService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.iot.whenLoaded(() => this.refresh());
  }

  refresh() {
    this.roomViews = this.iot.rooms.map((room) => ({
      title: room.title,
      devices: room.devices.map((d: any) => ({
        name: d.name,
        on: d.on,
        timed: d.fromIso ? true : false,
        fromIso: d.fromIso,
        toIso: d.toIso,
        state: d.fromIso ? this.fmtTime(d.fromIso) + ' to ' + this.fmtTime(d.toIso) + (d.on ? ' · Timer on' : ' · Timer off') : d.on ? 'On' : 'Off',
      })),
      history: room.history.map((h: any) => ({ text: h.text, ago: this.ago(h.at) })),
    }));
  }

  fmtTime(iso: string) {
    const h = Number(iso.slice(11, 13));
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ':' + iso.slice(14, 16) + ' ' + suffix;
  }

  setFrom(room: any, d: any, iso: string) {
    this.iot.setWindow(room.title, d.name, 'from', iso);
    this.refresh();
  }

  setTo(room: any, d: any, iso: string) {
    this.iot.setWindow(room.title, d.name, 'to', iso);
    this.refresh();
  }

  ago(at: number) {
    const mins = Math.floor((Date.now() - at) / 60000);
    if (mins <= 0) return 'just now';
    if (mins === 1) return '1 min ago';
    if (mins < 60) return mins + ' min ago';
    const hrs = Math.floor(mins / 60);
    return hrs === 1 ? '1 hour ago' : hrs + ' hours ago';
  }

  toggle(room: any, d: any) {
    this.iot.toggle(room.title, d.name);
    this.refresh();
  }

  goBack() {
    this.router.navigate(['/samples']);
  }
}
