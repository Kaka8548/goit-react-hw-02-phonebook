import { Component } from 'react';
import { AddContactBtn, Input, InputTitle, Form } from './ContactForm.styled';
import { nanoid } from 'nanoid';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  createContact = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const nameId = nanoid();
    const newContact = {
      number: form.elements.number.value,
      name: form.elements.name.value,
      id: nameId,
    };
    this.props.addContact(newContact);

    form.reset();
  };

  render() {
    return (
      <Form onSubmit={this.createContact}>
        <InputTitle>Name</InputTitle>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <InputTitle>Number</InputTitle>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <AddContactBtn type="submit">Add contact</AddContactBtn>
      </Form>
    );
  }
}
