import { Component } from 'react';
import ContactList from './phonebookSection/contactList/ContactList';
import { ContactForm } from './contactForm/ContactForm';
import Filter from './filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
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

  filterContacts = event => {
    const query = event.target.value.toLowerCase();

    this.setState(prevState => ({
      filter: prevState.contacts.filter(element =>
        element.name.toLowerCase().includes(query)
      ),
    }));
  };

  deleteItem = itemId => {
    this.setState({
      contacts: this.state.contacts.filter(({ id }) => id !== itemId),
    });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        {contacts.length > 0 ? (
          <>
            <Filter handleChange={this.filterContacts} />
            <ContactList
              contacts={contacts}
              filter={filter}
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
