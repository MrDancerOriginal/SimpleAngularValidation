import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { resolve } from "url";

export class MyValidators{ //Проверка на запрещенные почты
    static restricedEmails(control : FormControl): {[key:string]:boolean}{
        const blackList : string[] = ["v@gmail.ru","test@gmail.ru"];
        
        if(blackList.includes(control.value)){
            return{
                "restrictedEmail":true
            }
        }
        return null;
    }

    static uniqEmail(control : FormControl): Promise<any> | Observable<any>{ //Проверка на уникальность почты
        
        return new Promise(resolve => {
            setTimeout(()=>{
                if(control.value === "async@gmail.ru"){
                    resolve({
                        uniqEmail : true
                    });
                }else{
                    resolve(null);
                }
            },1000);
        });
    }
}