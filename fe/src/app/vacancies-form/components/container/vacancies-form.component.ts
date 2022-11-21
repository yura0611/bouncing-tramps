import {QuestionService} from '../../../questions/services/question.service';
import {filter, map} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {IQuestion} from 'src/app/questions/models/question.interface';
import {VacancyService} from 'src/app/vacancies/services/vacancy.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-vacancies-form',
  templateUrl: './vacancies-form.component.html',
  styleUrls: ['./vacancies-form.component.scss']
})
export class VacanciesFormComponent implements OnInit, OnDestroy {
  vacancyForm: FormGroup;
  questions: IQuestion[] = [];
  editQuestion: IQuestion[] = [];
  public id: string = '';
  private sub: any;
  public totalTime: number = 0;
  public maxChars = 800;
  public curentChars = '';
  public chars = 0;

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private vacancyService: VacancyService,
    private router: Router,
    private questionService: QuestionService
  ) {
    this.vacancyForm = this.form.group({
      title: [null, [Validators.required, Validators.maxLength(199), Validators.minLength(10)]],
      type: ['', [Validators.required]],
      link: [
        '',
        [
          Validators.maxLength(2048),
          Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
        ]
      ],
      description: [
        null,
        [Validators.required, Validators.minLength(10), Validators.maxLength(800)]
      ],
      questions: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        map((params: any) => params['vacancyId']),
        filter(Boolean)
      )
      .subscribe((id: string) => {
        this.id = id;
        this.getDataById(id);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getDataById(id: string) {
    forkJoin({
      vacancy: this.vacancyService.one(id),
      questions: this.questionService.specific(id)
    }).subscribe(({vacancy, questions}) => {
      this.vacancyForm.patchValue(vacancy);
      this.editQuestion = questions.filter(item => vacancy.questions.includes(item._id));
      this.calcTime(this.editQuestion);
    });
  }

  calcTime(questions: IQuestion[]) {
    this.totalTime = questions.reduce((acc: number, cur: any) => acc + cur.maxLength, 0);
  }

  addItem(item: IQuestion): void {
    if (this.totalTime < 960 && this.questions.length <= 20) {
      let check = this.questions.find((elem: any) => elem.id === item._id);
      if (check) return;
      this.questions = [...this.questions, item];
      this.vacancyForm.patchValue({questions: this.questions.map((elem: any) => elem._id)});
      this.calcTime(this.questions);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getEditData() {
    return {
      title: this.vacancyForm.value.title,
      type: this.vacancyForm.value.type,
      link: this.vacancyForm.value.link,
      description: this.vacancyForm.value.description
    };
  }

  saveVacancyForm() {
    if (this.vacancyForm.valid) {
      if (this.id) {
        this.vacancyService.update(this.id, this.getEditData()).subscribe(() => {
          this.router.navigateByUrl('/vacancies');
        });
      } else {
        this.vacancyService.create(this.vacancyForm.value).subscribe(() => {
          this.router.navigateByUrl('/vacancies');
        });
      }
    } else {
      this.validateAllFormFields(this.vacancyForm);
    }
  }

  isFieldValid(field: string) {
    return !this.vacancyForm?.get(field)?.valid && this.vacancyForm?.get(field)?.touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  removeItem(id: any) {
    this.questions = [...this.questions.filter((item: any) => item._id !== id)];
    this.vacancyForm.patchValue({questions: this.questions.map((elem: any) => elem._id)});
    this.calcTime(this.questions);
  }
}
