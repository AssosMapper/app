import { Component } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private mailService: MailService) {}

  onSubmit(formValues) {
    const emailData = {
      toEmail: formValues.email,
      subject: formValues.subject,
      message: formValues.message
    };

    this.mailService.sendEmail(emailData).subscribe(
      response => console.log('Email sent', response),
      error => console.error('Error sending email', error)
    );
  }
}
