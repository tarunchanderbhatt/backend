import { FormGroup, FormControl } from '@angular/forms';

//Allow Alphanumeric charachters and space only

export class TextFieldValidator {
    static validTextField(fc: FormControl) {
        if (fc.value || fc.value != undefined || fc.value != '') {
            const regex = /^[0-9a-zA-Z ]+$/;
            if (regex.test(fc.value)) {
                return (null);
            } else {
                return ({ validTextField: true });
            }

        } else {
            return ({ validTextField: true });
        }
    }
}



//Custom Validators to check that two field match
export function MustMatchValidators(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}