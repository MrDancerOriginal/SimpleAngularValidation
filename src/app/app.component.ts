import {Component, OnInit} from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { MyValidators } from './my.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email : new FormControl("",
      [
      Validators.email,
      Validators.required,
      MyValidators.restricedEmails
    ], [MyValidators.uniqEmail]),
      password : new FormControl(null,[
        Validators.required,
        Validators.minLength(6)
      ]),
      address:new FormGroup({
        country : new FormControl("ru"),
        city : new FormControl("",Validators.required)
      }),
      skills: new FormArray([])
    });
  }
  sumbit(){ //Для отправки формы
    if(this.form.valid){
      console.log("Form submitted",this.form);
      const formData = {...this.form.value};

      this.form.reset();
    }
  }
  setCapital(){ //Автоматического выбора столицы
    const cityMap={
      ru: 'Москва',
      ua: "Киев",
      by: "Минск"
    };
    const cityKey = this.form.get('address').get("country").value;
    const city = cityMap[cityKey];
    this.form.patchValue({
      address: {city}
    });
    // this.form.get('address').get("city").setValue(city);
  }
  addSkill(){ //Функция создания input для добавления скилла
    const control = new FormControl("",Validators.required);
    //(<FormArray>this.form.get("skills")).push();
    (this.form.get("skills") as FormArray).push(control);
  }

}

