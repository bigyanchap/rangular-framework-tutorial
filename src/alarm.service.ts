import { Injectable } from '@angular/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { createAudioPlayer } from 'expo-audio';


/**
 * The Alarm sample's state and scheduling, modelled on the
 * alarm in Awaken Me: one alarm with a title, a time, repeat
 * days and a volume, kept on this device. Setting it arms a
 * system notification for each chosen day, carrying the
 * bundled tone, so it rings even when the app is closed.
 * While the app is open, the same moment is caught by a
 * notification listener and the page itself rings: the tone
 * loops through the audio player and the ringing view takes
 * over the page, with Stop and Snooze. Snooze arms a single
 * notification five minutes out. On web there are no system
 * notifications, so the switch only records the setting.
 */
@Injectable({ providedIn: 'root' })
export class AlarmService {
  storageKey = 'rangular-tutorial.alarm.v1';
  time = '07:00';
  title = 'Wake up';
  days: number[] = [0, 1, 2, 3, 4, 5, 6];
  volume = 0.8;
  enabled = false;
  ringing = false;
  ringProgress = 0;
  player: any = null;
  ringTimer: any = null;
  ringStart = 0;
  loaded = false;
  waiters: any[] = [];

  constructor() {
    AsyncStorage.getItem(this.storageKey).then((raw) => {
      if (raw) {
        const s = JSON.parse(raw);
        this.time = s.time ? s.time : '07:00';
        this.title = s.title ? s.title : 'Wake up';
        this.days = s.days && s.days.length ? s.days : [0, 1, 2, 3, 4, 5, 6];
        this.volume = s.volume === undefined ? 0.8 : s.volume;
        this.enabled = s.enabled ? true : false;
      }
      this.loaded = true;
      this.waiters.forEach((cb) => cb());
      this.waiters = [];
      if (this.enabled) this.arm();
    }, () => {
      this.loaded = true;
      this.waiters.forEach((cb) => cb());
      this.waiters = [];
    });
    if (Platform.OS !== 'web') {
      Notifications.setNotificationHandler({
        handleNotification: () =>
          Promise.resolve({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }),
      });
      Notifications.addNotificationReceivedListener(() => {
        if (this.enabled) this.fire();
      });
    }
  }

  whenLoaded(cb: () => void) {
    if (this.loaded) cb();
    else this.waiters = this.waiters.concat([cb]);
  }

  persist() {
    AsyncStorage.setItem(this.storageKey, JSON.stringify({
      time: this.time,
      title: this.title,
      days: this.days,
      volume: this.volume,
      enabled: this.enabled,
    })).then(() => {}, () => {});
  }

  quiet(p: any) {
    p.then(() => {}, () => {});
  }

  parts() {
    const bits = this.time.split(':');
    return { hour: Number(bits[0]), minute: Number(bits[1]) };
  }

  content() {
    return { title: this.title, body: 'Your alarm is ringing.', sound: 'alarm-tone.wav' };
  }

  arm() {
    if (Platform.OS === 'web') return;
    const t = this.parts();
    this.quiet(Notifications.cancelAllScheduledNotificationsAsync().then(() => {
      if (this.days.length === 7) {
        this.quiet(Notifications.scheduleNotificationAsync({
          content: this.content(),
          trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: t.hour, minute: t.minute },
        }));
      } else {
        this.days.forEach((d) => {
          this.quiet(Notifications.scheduleNotificationAsync({
            content: this.content(),
            trigger: { type: Notifications.SchedulableTriggerInputTypes.WEEKLY, weekday: d + 1, hour: t.hour, minute: t.minute },
          }));
        });
      }
    }));
  }

  disarm() {
    if (Platform.OS === 'web') return;
    this.quiet(Notifications.cancelAllScheduledNotificationsAsync());
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    this.persist();
    if (on) this.arm();
    else this.disarm();
  }

  setTime(t: string) {
    this.time = t;
    this.persist();
    if (this.enabled) this.arm();
  }

  setTitle(t: string) {
    this.title = t ? t : 'Alarm';
    this.persist();
    if (this.enabled) this.arm();
  }

  toggleDay(d: number) {
    if (this.days.indexOf(d) >= 0) {
      if (this.days.length > 1) this.days = this.days.filter((x) => x !== d);
    } else {
      this.days = this.days.concat([d]).sort();
    }
    this.persist();
    if (this.enabled) this.arm();
  }

  setVolume(pct: number) {
    this.volume = pct / 100;
    this.persist();
  }

  tone() {
    return require('../assets/alarm-tone.wav');
  }

  fire() {
    this.ringing = true;
    this.ringStart = Date.now();
    this.ringProgress = 0;
    if (!this.player) this.player = createAudioPlayer(this.tone());
    this.player.loop = true;
    this.player.volume = this.volume;
    this.player.play();
    if (this.ringTimer) clearInterval(this.ringTimer);
    this.ringTimer = setInterval(() => {
      this.ringProgress = ((Date.now() - this.ringStart) % 8000) / 8000;
    }, 250);
  }

  stopRing() {
    this.ringing = false;
    this.ringProgress = 0;
    if (this.ringTimer) clearInterval(this.ringTimer);
    this.ringTimer = null;
    if (this.player) this.player.pause();
  }

  snooze() {
    this.stopRing();
    if (Platform.OS === 'web') return;
    this.quiet(Notifications.scheduleNotificationAsync({
      content: this.content(),
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 300 },
    }));
  }
}
