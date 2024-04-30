import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirmPassword');

  // Check if both controls are present and their values match
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true }; // Return an error object
  }
  return null; // No error
}
