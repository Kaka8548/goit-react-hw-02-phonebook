import { Component } from 'react';
import ContactList from './phonebookSection/contactList/ContactList';
import { ContactForm } from './contactForm/ContactForm';
import Filter from './filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const isInContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name
    );
    if (isInContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(prevState => {
      const nameId = nanoid();

      return {
        contacts: [
          ...prevState.contacts,
          { name: name, number: number, id: nameId },
        ],
      };
    });
  };

  getFilterQuery = event => {
    // const query = event.target.value.toLowerCase();

    this.setState({ filter: event.target.value.toLowerCase() });
  };

  getFilteredList = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  deleteItem = itemId => {
    this.setState({
      contacts: this.state.contacts.filter(({ id }) => id !== itemId),
    });
  };

  render() {
    const { contacts } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        {contacts.length > 0 ? (
          <>
            <Filter handleChange={this.getFilterQuery} />
            <ContactList
              contacts={contacts}
              filteredContacts={this.getFilteredList()}
              onDeleteBtnClick={this.deleteItem}
            />
          </>
        ) : (
          <p>There are no contacts in your contact list. Try to make one.</p>
        )}
      </div>
    );
  }
}
