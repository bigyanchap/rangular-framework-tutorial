import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from './lesson.service';
import { BookmarksService } from './bookmarks.service';
import { HelloComponent } from './demos/hello.component';
import { InterpolationDemoComponent } from './demos/interpolation.component';
import { EventsDemoComponent } from './demos/events.component';
import { BindingsDemoComponent } from './demos/bindings.component';
import { ListsDemoComponent } from './demos/lists.component';
import { NgifDemoComponent } from './demos/ngif.component';
import { ClassStyleDemoComponent } from './demos/class-style.component';
import { ChildDemoComponent } from './demos/child.component';
import { InputsDemoComponent } from './demos/inputs.component';
import { OutputsDemoComponent } from './demos/outputs.component';
import { LifecycleDemoComponent } from './demos/lifecycle.component';
import { ProjectionDemoComponent } from './demos/projection.component';
import { RefsDemoComponent } from './demos/refs.component';
import { PipesDemoComponent } from './demos/pipes.component';
import { CustomPipesDemoComponent } from './demos/custom-pipes.component';
import { DirectivesDemoComponent } from './demos/directives.component';
import { SwitchCheckboxDemoComponent } from './demos/switch-checkbox.component';
import { RadioSwitcherDemoComponent } from './demos/radio-switcher.component';
import { IconsDemoComponent } from './demos/icons.component';
import { LayoutDemoComponent } from './demos/layout.component';
import { TabsDemoComponent } from './demos/tabs.component';
import { TablesDemoComponent } from './demos/tables.component';
import { ChipsDemoComponent } from './demos/chips.component';
import { ThemingDemoComponent } from './demos/theming.component';
import { NgmodelDemoComponent } from './demos/ngmodel.component';
import { InputTypesDemoComponent } from './demos/input-types.component';
import { ValidatorsBasicDemoComponent } from './demos/validators-basic.component';
import { ValidatorsShapeDemoComponent } from './demos/validators-shape.component';
import { FormStateDemoComponent } from './demos/form-state.component';
import { ErrorDisplayDemoComponent } from './demos/error-display.component';
import { SubmitDemoComponent } from './demos/submit.component';
import { FormControlDemoComponent } from './demos/form-control.component';
import { FormGroupDemoComponent } from './demos/form-group.component';
import { FormBuilderDemoComponent } from './demos/form-builder.component';
import { FormArrayDemoComponent } from './demos/form-array.component';
import { ReactiveStateDemoComponent } from './demos/reactive-state.component';
import { SetValueDemoComponent } from './demos/set-value.component';
import { DatePickerDemoComponent } from './demos/date-picker.component';
import { TimePickerDemoComponent } from './demos/time-picker.component';
import { SheetDemoComponent } from './demos/sheet.component';
import { DialogDemoComponent } from './demos/dialog.component';
import { SnackbarDemoComponent } from './demos/snackbar.component';
import { AutocompleteDemoComponent } from './demos/autocomplete.component';
import { SliderDemoComponent } from './demos/slider.component';
import { ChoiceFormDemoComponent } from './demos/choice-form.component';
import { SignupDemoComponent } from './demos/signup.component';
import { ServiceBasicsDemoComponent } from './demos/service-basics.component';
import { InjectionDemoComponent } from './demos/injection.component';
import { SingletonDemoComponent } from './demos/singleton.component';
import { ContainerDemoComponent } from './demos/container.component';
import { SharingDemoComponent } from './demos/sharing.component';
import { ReactivityDemoComponent } from './demos/reactivity.component';
import { StoreDemoComponent } from './demos/store.component';
import { SignalsDemoComponent } from './demos/signals.component';
import { RoutesTableDemoComponent } from './demos/routes-table.component';
import { RouterLinkDemoComponent } from './demos/router-link.component';
import { RouteParamsDemoComponent } from './demos/route-params.component';
import { ActivatedRouteDemoComponent } from './demos/activated-route.component';
import { ProgrammaticNavDemoComponent } from './demos/programmatic-nav.component';
import { RedirectsDemoComponent } from './demos/redirects.component';
import { RouteGateDemoComponent } from './demos/route-gate.component';
import { HttpBasicsDemoComponent } from './demos/http-basics.component';
import { HttpStatesDemoComponent } from './demos/http-states.component';
import { DataServiceDemoComponent } from './demos/data-service.component';
import { CapstoneDataDemoComponent } from './demos/capstone-data.component';
import { CapstoneDemoComponent } from './demos/capstone.component';
import { MenuDemoComponent } from './demos/menu.component';
import { DrawerDemoComponent } from './demos/drawer.component';
import { SelectDemoComponent } from './demos/select.component';
import { SelectFormDemoComponent } from './demos/select-form.component';
import { StepperDemoComponent } from './demos/stepper.component';
import { GridDemoComponent } from './demos/grid.component';
import { MasonryDemoComponent } from './demos/masonry.component';
import { TreeDemoComponent } from './demos/tree.component';
import { TooltipDemoComponent } from './demos/tooltip.component';
import { DividerDemoComponent } from './demos/divider.component';
import { TablesDepthDemoComponent } from './demos/tables-depth.component';
import { BottomNavDemoComponent } from './demos/bottom-nav.component';
import { RefreshDemoComponent } from './demos/refresh.component';
import { InfiniteScrollDemoComponent } from './demos/infinite-scroll.component';
import { SkeletonDemoComponent } from './demos/skeleton.component';
import { RowActionsDemoComponent } from './demos/row-actions.component';
import { FilePickerDemoComponent } from './demos/file-picker.component';
import { MaskDemoComponent } from './demos/mask.component';
import { RatingDemoComponent } from './demos/rating.component';
import { OtpDemoComponent } from './demos/otp.component';
import { CarouselDemoComponent } from './demos/carousel.component';
import { TimelineDemoComponent } from './demos/timeline.component';
import { CalendarDemoComponent } from './demos/calendar.component';
import { AvatarsDemoComponent } from './demos/avatars.component';
import { EmptyStateDemoComponent } from './demos/empty-state.component';
import { ChartsDemoComponent } from './demos/charts.component';
import { EditorDemoComponent } from './demos/editor.component';
import { ImageDemoComponent } from './demos/image.component';
import { ColorPickerDemoComponent } from './demos/color-picker.component';
import { BreadcrumbsDemoComponent } from './demos/breadcrumbs.component';
import { StreamsDemoComponent } from './demos/streams.component';

/**
 * One lesson screen. The lesson data comes from LessonService by
 * the route's id. Each lesson's live demo is its own small
 * component under src/demos/, hosted below when the lesson has
 * one; this component holds no demo state of its own. Opening a
 * lesson records it as the last lesson in the bookmarks service
 * and reads its bookmark state, so Home can offer a continue
 * row and the header card can offer a working bookmark toggle.
 */
@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styles: [`
    .eyebrow { color: #5f6368; font-weight: 700; }
    .tip-card { background-color: #e8f0fe; border-width: 0; }
    .demo-card { background-color: transparent; border-width: 0; padding: 0; }
    .cmd-line { background-color: #e8f0fe; border-radius: 12px; padding: 12px; }
    .cmd-text { color: #0b57d0; font-weight: 700; font-size: 16px; letter-spacing: 1px; text-align: center; }
  `],
})
export class LessonComponent {
  lesson: any = null;
  implBlocks: any[] = [];
  lessonId = 0;
  bookmarked = false;
  barTitle = 'Rangular Tutorial';
  hasCode = false;
  progressPct = 0;
  sectionName = '';
  done = false;
  nextLabel = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService,
    private bookmarks: BookmarksService,
  ) {}

  ngOnInit() {
    this.lesson = this.lessonService.getById(this.route.snapshot.params.id);
    this.lessonId = this.lesson === null ? 0 : this.lesson.id;
    if (this.lessonId > 0) {
      this.bookmarks.recordLast(this.lessonId);
      this.bookmarked = this.bookmarks.isBookmarked(this.lessonId);
      this.barTitle = 'Lesson ' + this.lessonId;
      this.hasCode = this.lesson.code !== '';
      this.done = this.bookmarks.isDone(this.lessonId);
      this.progressPct = Math.round((this.lessonId * 100) / 98);
      this.sectionName = this.nameFor(this.lessonId);
      this.nextLabel = this.labelFor(this.lessonId);
      this.implBlocks = this.buildImplBlocks(this.lesson.implementation || '');
    }
  }

  buildImplBlocks(text: string) {
    const blocks: any[] = [];
    text.split('\n').forEach((line: string) => {
      const rest = line.startsWith('// ') ? line.slice(3) : '';
      const isHeader = rest !== '' && !rest.includes(' ') && (rest.endsWith('.ts') || rest.endsWith('.html') || rest.endsWith('.css'));
      if (isHeader) {
        blocks.push({ name: rest, code: '' });
      } else if (blocks.length > 0) {
        const b = blocks[blocks.length - 1];
        b.code = b.code === '' ? line : b.code + '\n' + line;
      } else {
        blocks.push({ name: '', code: line });
      }
    });
    return blocks.map((b: any) => ({ name: b.name, code: b.code.trim() }));
  }

  nameFor(id: number) {
    if (id <= 5) return 'GETTING STARTED';
    if (id <= 25) return 'COMPONENTS AND TEMPLATES';
    if (id <= 47) return 'FORMS AND INTERACTION';
    if (id <= 67) return 'SERVICES, ROUTING, AND DATA';
    if (id <= 78) return 'THE MATERIAL PIECES';
    return 'BEYOND ANGULAR';
  }

  labelFor(id: number) {
    if (id >= 98) return this.done ? 'Done · Back home' : 'Mark done · Finish';
    return this.done ? 'Done · Next lesson' : 'Mark done · Next lesson';
  }

  prevLesson() {
    if (this.lessonId > 1) {
      this.router.navigate(['/lesson', this.lessonId - 1]);
    }
  }

  markDoneNext() {
    if (this.lessonId > 0) {
      this.bookmarks.markDone(this.lessonId);
      if (this.lessonId >= 97) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/lesson', this.lessonId + 1]);
      }
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  toggleBookmark() {
    if (this.lessonId > 0) {
      this.bookmarks.toggle(this.lessonId);
      this.bookmarked = this.bookmarks.isBookmarked(this.lessonId);
    }
  }
}
