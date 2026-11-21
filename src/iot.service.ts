import { Injectable } from '@angular/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The IoT sample's store: a small smart home that lives
 * entirely in this app. Each room is a card of devices,
 * every device is on or off, and every flip leaves a line
 * in that room's history, newest first, four lines kept:
 * a fifth change deletes the oldest line, and a longer
 * saved history is cut back to four when it loads. Some
 * devices, the outdoor ones, run on a timer instead: the
 * row names the hours, and its switch turns the timer on
 * or off. Nothing here talks to a real device: the state
 * is kept on this phone, and the switches change this
 * page only. First run seeds four rooms so the page has
 * life at once; after that, the home is the reader's own.
 */
@Injectable({ providedIn: 'root' })
export class IotService {
  storageKey = 'rangular-tutorial.iot.v2';
  rooms: any[] = [];
  loaded = false;
  waiters: any[] = [];

  constructor() {
    AsyncStorage.getItem(this.storageKey).then((raw) => {
      if (raw) {
        const saved = JSON.parse(raw);
        this.rooms = saved.map((room: any) => ({ title: room.title, devices: room.devices, history: room.history.slice(0, 4) }));
      } else {
        const now = Date.now();
        this.rooms = [
          {
            title: 'Living room',
            devices: [
              { name: 'Ceiling light', on: true },
              { name: 'Fan', on: false },
              { name: 'Television', on: false },
            ],
            history: [{ text: 'Ceiling light turned on', at: now - 42 * 60000 }],
          },
          {
            title: 'Kitchen',
            devices: [
              { name: 'Kettle', on: false },
              { name: 'Exhaust fan', on: true },
              { name: 'Under-cabinet light', on: true },
            ],
            history: [{ text: 'Exhaust fan turned on', at: now - 18 * 60000 }],
          },
          {
            title: 'Bedroom',
            devices: [
              { name: 'Bedside lamp', on: false },
              { name: 'Air conditioner', on: false },
              { name: 'Ceiling light', on: true },
            ],
            history: [],
          },
          {
            title: 'Outdoor',
            devices: [
              { name: 'Water pump', on: true, window: '6:00 AM to 7:00 AM' },
              { name: 'Garden lights', on: true, window: '6:30 PM to 10:00 PM' },
              { name: 'Porch light', on: false },
            ],
            history: [{ text: 'Water pump timer turned on', at: now - 180 * 60000 }],
          },
        ];
        this.persist();
      }
      this.loaded = true;
      this.waiters.forEach((cb) => cb());
      this.waiters = [];
    }, () => {
      this.loaded = true;
      this.waiters.forEach((cb) => cb());
      this.waiters = [];
    });
  }

  whenLoaded(cb: () => void) {
    if (this.loaded) cb();
    else this.waiters = this.waiters.concat([cb]);
  }

  persist() {
    AsyncStorage.setItem(this.storageKey, JSON.stringify(this.rooms)).then(() => {}, () => {});
  }

  toggle(roomTitle: string, deviceName: string) {
    const now = Date.now();
    this.rooms = this.rooms.map((room) => {
      if (room.title !== roomTitle) return room;
      const devices = room.devices.map((d: any) => (d.name === deviceName ? { name: d.name, on: !d.on, window: d.window } : d));
      const flipped = devices.find((d: any) => d.name === deviceName);
      const timed = flipped && flipped.window ? ' timer' : '';
      const line = deviceName + timed + (flipped && flipped.on ? ' turned on' : ' turned off');
      const history = [{ text: line, at: now }].concat(room.history).slice(0, 4);
      return { title: room.title, devices, history };
    });
    this.persist();
  }
}
