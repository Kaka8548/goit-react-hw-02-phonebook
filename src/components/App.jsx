import { Component } from 'react';
import ContactList from './phonebookSection/contactList/ContactList';
import { ContactForm } from './contactForm/ContactForm';
import Filter from './filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = data => {
    this.setState(prevState => {
      if (prevState.contacts.find(contact => contact.name === data.name)) {
        alert(`${data.name} is already in contacts.`);
        return;
      }
      return {
        contacts: [...prevState.contacts, data],
      };
    });
  };

  filterContacts = event => {
    const query = event.currentTarget.value.toLowerCase();

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
        {contacts.length > 0 && (
          <>
            <Filter handleChange={this.filterContacts} />
            <ContactList
              contacts={contacts}
              filter={filter}
              onDeleteBtnClick={this.deleteItem}
            />
          </>
        )}
      </div>
    );
  }
}
