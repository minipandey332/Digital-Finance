import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  submitButton!: HTMLElement;
  messageContainer!: HTMLElement;

  ngOnInit() {
    this.submitButton = document.getElementById("submitButton") as HTMLElement;
    this.messageContainer = document.getElementById("messageContainer") as HTMLElement;

    this.submitButton.addEventListener("click", this.handleSubmit);
  }

  handleSubmit = (event: Event) => {
    event.preventDefault(); // Prevent form submission

    const nameInput = document.getElementById("formName") as HTMLInputElement;
    const emailInput = document.getElementById("formEmail") as HTMLInputElement;
    const messageInput = document.getElementById("formMessage") as HTMLTextAreaElement;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Check if all fields are filled
    if (name === '' || email === '' || message === '') {
      this.messageContainer.textContent = `Please Fill All The Details !!!`;
      return;
    }

    // Perform form validation here if needed

    // Display the message in the messageContainer
    this.messageContainer.textContent = `Thank you! Your message has been sent.`;

    // Clear the form inputs
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
  };

}
