import { Component } from '@angular/core';

/**
 * Lesson 82's live demo: pagination. The same sixty articles
 * as lesson 81's reading list, cut into six numbered pages
 * of ten. One method, go(n), swaps the items array for the
 * page asked for and updates the counts the screen shows:
 * the page number, and the first and last article on it.
 * Previous and Next step by one and rest disabled at the
 * ends; the numbered chips jump straight to a page. Nothing
 * renders ahead: a page exists on screen only while the
 * reader is on it.
 */
@Component({
  selector: 'app-pagination-demo',
  templateUrl: './pagination.component.html',
  styles: [`
    .pg-status { font-size: 14px; line-height: 20px; font-weight: 600; color: #5f6368; }
    .pg-nav { flex-direction: row; justify-content: space-between; align-items: center; margin-top: 12px; }
    .pg-pages { margin-top: 12px; }
    .chip { border-width: 1px; border-color: #bdc1c6; border-radius: 9999px; padding: 8px; }
    .chip-on { background-color: #0b57d0; border-color: #0b57d0; }
    .chip-text { font-size: 14px; color: #3c4043; text-align: center; }
    .chip-text-on { color: #ffffff; font-weight: 600; }
  `],
})
export class PaginationDemoComponent {
  total = 60;
  page = 1;
  first = 1;
  last = 10;
  pageNums = [1, 2, 3, 4, 5, 6];

  firstPage = [
    { id: 1, title: 'Article 1: Begin with the breath', sub: 'Start where the breath starts' },
    { id: 2, title: 'Article 2: The spine, held easy', sub: 'Posture without force' },
    { id: 3, title: 'Article 3: Sitting without force', sub: 'Let the seat hold you' },
    { id: 4, title: 'Article 4: Attention returns', sub: 'The gentle art of coming back' },
    { id: 5, title: 'Article 5: The witness stance', sub: 'Watch, do not chase' },
    { id: 6, title: 'Article 6: Sound and silence', sub: 'Two sides of listening' },
    { id: 7, title: 'Article 7: The pause between', sub: 'Rest in the gap' },
    { id: 8, title: 'Article 8: Ending well', sub: 'Close the sit with care' },
    { id: 9, title: 'Article 9: Carrying it into the day', sub: 'Practice after the cushion' },
    { id: 10, title: 'Article 10: Review and rest', sub: 'Look back, then let go' },
  ];

  morePages: any[] = [
    [
      { id: 11, title: 'Article 11: Morning light, first practice', sub: 'Begin with the day' },
      { id: 12, title: 'Article 12: The hands, relaxed', sub: 'Soft hands, soft mind' },
      { id: 13, title: 'Article 13: Counting the breath out', sub: 'Numbers as an anchor' },
      { id: 14, title: 'Article 14: A quieter jaw', sub: 'Release the small tensions' },
      { id: 15, title: 'Article 15: Standing like a mountain', sub: 'Stillness on your feet' },
      { id: 16, title: 'Article 16: The floor holds you', sub: 'Trust the ground' },
      { id: 17, title: 'Article 17: Eyes, soft focus', sub: 'See without gripping' },
      { id: 18, title: 'Article 18: One thing at a time', sub: 'The single thread' },
      { id: 19, title: 'Article 19: The space between thoughts', sub: 'Widen the gap' },
      { id: 20, title: 'Article 20: Listening to the room', sub: 'Sound as a teacher' },
    ],
    [
      { id: 21, title: 'Article 21: Shoulders down', sub: 'Drop what you carry' },
      { id: 22, title: 'Article 22: The long exhale', sub: 'Longer out than in' },
      { id: 23, title: 'Article 23: Walking without hurry', sub: 'Steps that arrive' },
      { id: 24, title: 'Article 24: Tea, taken slowly', sub: 'A practice in a cup' },
      { id: 25, title: 'Article 25: The body scans itself', sub: 'Attention, head to heel' },
      { id: 26, title: 'Article 26: Gratitude, briefly', sub: 'One honest thank you' },
      { id: 27, title: 'Article 27: Letting the day land', sub: 'Evening settling' },
      { id: 28, title: 'Article 28: A short sit before sleep', sub: 'Close the day seated' },
      { id: 29, title: 'Article 29: The breath at the nostrils', sub: 'The smallest anchor' },
      { id: 30, title: 'Article 30: Palms together', sub: 'A gesture of return' },
    ],
    [
      { id: 31, title: 'Article 31: The spine, one inch taller', sub: 'Grow the axis gently' },
      { id: 32, title: 'Article 32: Silence after sound', sub: 'What the bell leaves behind' },
      { id: 33, title: 'Article 33: Noticing the noticing', sub: 'Awareness of awareness' },
      { id: 34, title: 'Article 34: The weight of the hands', sub: 'Feel gravity kindly' },
      { id: 35, title: 'Article 35: A kinder inner voice', sub: 'Speak to yourself well' },
      { id: 36, title: 'Article 36: The pause before speaking', sub: 'One breath of room' },
      { id: 37, title: 'Article 37: Sitting with discomfort', sub: 'Stay, without fixing' },
      { id: 38, title: 'Article 38: The morning stretches', sub: 'Wake the body first' },
      { id: 39, title: 'Article 39: Breath and heartbeat', sub: 'Two rhythms, one seat' },
      { id: 40, title: 'Article 40: Coming back, again', sub: 'The practice is the return' },
    ],
    [
      { id: 41, title: 'Article 41: The cool of the evening', sub: 'Sit as the light fades' },
      { id: 42, title: 'Article 42: One minute of stillness', sub: 'Small, and complete' },
      { id: 43, title: 'Article 43: The gaze rests', sub: 'Eyes that do not hunt' },
      { id: 44, title: 'Article 44: Shoulders, neck, jaw', sub: 'The tension triangle' },
      { id: 45, title: 'Article 45: Counting to ten, slowly', sub: 'Ten breaths, no rush' },
      { id: 46, title: 'Article 46: The room, held in mind', sub: 'Know where you sit' },
      { id: 47, title: 'Article 47: A practice for busy days', sub: 'Short is not shallow' },
      { id: 48, title: 'Article 48: The last page of the day', sub: 'End on a kind note' },
      { id: 49, title: 'Article 49: Rest is also practice', sub: 'Doing nothing, well' },
      { id: 50, title: 'Article 50: Beginning again', sub: 'Every sit is the first' },
    ],
    [
      { id: 51, title: 'Article 51: The breath deepens', sub: 'Let it slow itself' },
      { id: 52, title: 'Article 52: Watching the mind settle', sub: 'Sediment and clear water' },
      { id: 53, title: 'Article 53: A steady seat', sub: 'Build the base' },
      { id: 54, title: 'Article 54: The sounds outside', sub: 'The world, included' },
      { id: 55, title: 'Article 55: Kindness toward the body', sub: 'Thank the instrument' },
      { id: 56, title: 'Article 56: The exhale lengthens', sub: 'Follow it all the way out' },
      { id: 57, title: 'Article 57: Stillness between tasks', sub: 'The hinge of the day' },
      { id: 58, title: 'Article 58: The evening review', sub: 'See the day, release it' },
      { id: 59, title: 'Article 59: One slow breath', sub: 'Enough for now' },
      { id: 60, title: 'Article 60: The whole list, held lightly', sub: 'All of it, loosely' },
    ],
  ];

  items = [
    { id: 1, title: 'Article 1: Begin with the breath', sub: 'Start where the breath starts' },
    { id: 2, title: 'Article 2: The spine, held easy', sub: 'Posture without force' },
    { id: 3, title: 'Article 3: Sitting without force', sub: 'Let the seat hold you' },
    { id: 4, title: 'Article 4: Attention returns', sub: 'The gentle art of coming back' },
    { id: 5, title: 'Article 5: The witness stance', sub: 'Watch, do not chase' },
    { id: 6, title: 'Article 6: Sound and silence', sub: 'Two sides of listening' },
    { id: 7, title: 'Article 7: The pause between', sub: 'Rest in the gap' },
    { id: 8, title: 'Article 8: Ending well', sub: 'Close the sit with care' },
    { id: 9, title: 'Article 9: Carrying it into the day', sub: 'Practice after the cushion' },
    { id: 10, title: 'Article 10: Review and rest', sub: 'Look back, then let go' },
  ];

  go(n: number) {
    if (n >= 1 && n <= 6) {
      this.page = n;
      this.first = (n - 1) * 10 + 1;
      this.last = n * 10;
      if (n === 1) {
        this.items = this.firstPage;
      } else {
        this.items = this.morePages[n - 2];
      }
    }
  }

  prev() {
    this.go(this.page - 1);
  }

  next() {
    this.go(this.page + 1);
  }
}
