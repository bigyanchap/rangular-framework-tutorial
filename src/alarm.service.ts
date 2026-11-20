import { Injectable } from '@angular/core';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { createAudioPlayer } from 'expo-audio';

const toneSource = require('../assets/alarm-tone.wav');

/**
 * The alarm sample's engine. One alarm, one time, one tone.
 * Setting the alarm schedules a daily system notification
 * for that clock time, carrying the bundled tone, so the
 * alarm arrives even when the app is closed. While the app
 * is open, the same notification's arrival is heard by the
 * listener registered in the constructor, and the alarm
 * rings on the alarm screen itself, playing the tone until
 * it is stopped. The choice is kept in AsyncStorage, and an
 * alarm left on is re-armed when the app next starts. There
 * is exactly one alarm in this sample, so arming first
 * cancels every scheduled notification: restarts can never
 * stack duplicates.
 */
@Injectable({ providedIn: 'root' })
export class AlarmService {
  time = '07:00';
  enabled = false;
  ringing = false;
  storageKey = 'rangular-tutorial.alarm.v1';
  notificationId = '';
  player: any = null;
  listener: any = null;

  constructor() {
    if (Platform.OS !== 'web') {
      Notifications.setNotificationHandler({
        // Banner yes, sound no: while the app is open the
        // listener below hears the arrival and plays the tone
        // itself, so a sound here would double it. Closed or
        // backgrounded, this handler does not run and the
        // notification plays the bundled tone on its own.
        handleNotification: async () => ({
          shouldShowBanner: true,
          shouldShowList: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      this.listener = Notifications.addNotificationReceivedListener(() => {
        if (this.enabled) this.fire();
      });
    }
    AsyncStorage.getItem(this.storageKey).then((raw) => {
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.time !== undefined) this.time = saved.time;
        if (saved.enabled === true) {
          this.enabled = true;
          this.arm();
        }
      }
    }, () => {});
  }

  save() {
    AsyncStorage.setItem(this.storageKey, JSON.stringify({ time: this.time, enabled: this.enabled }));
  }

  arm() {
    if (Platform.OS === 'web') return;
    const parts = this.time.split(':');
    Notifications.requestPermissionsAsync().then(() => {
      Notifications.cancelAllScheduledNotificationsAsync().then(() => {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Alarm',
            body: 'Your alarm is ringing.',
            sound: 'alarm-tone.wav',
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: parseInt(parts[0], 10),
            minute: parseInt(parts[1], 10),
          },
        }).then((id) => {
          this.notificationId = id;
        }, () => {});
      }, () => {});
    }, () => {});
  }

  setAlarm(time: string) {
    this.time = time;
    this.enabled = true;
    this.save();
    this.arm();
  }

  cancel() {
    this.enabled = false;
    if (Platform.OS !== 'web') {
      Notifications.cancelAllScheduledNotificationsAsync().then(() => {}, () => {});
      this.notificationId = '';
    }
    this.save();
  }

  fire() {
    this.ringing = true;
    this.player = createAudioPlayer(toneSource);
    this.player.loop = true;
    this.player.play();
  }

  stop() {
    this.ringing = false;
    this.enabled = false;
    if (this.player) {
      this.player.pause();
      this.player.remove();
      this.player = null;
    }
    if (Platform.OS !== 'web') {
      Notifications.cancelAllScheduledNotificationsAsync().then(() => {}, () => {});
      this.notificationId = '';
    }
    this.save();
  }
}
