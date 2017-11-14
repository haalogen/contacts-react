import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Contact from './Contact'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addContact = this.addContact.bind(this);
    this.editContact = this.editContact.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.removeContact = this.removeContact.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.updateSearchQuery = this.updateSearchQuery.bind(this);

    this.state = {
      contacts: new Map(),
      searchQuery: ''
    }
  }

  getMatches(searchQuery) {
    const contacts = Array.from(this.state.contacts);
    // Search globally, case-insensitive
    const regex = new RegExp(searchQuery, 'gi');

    const matchArray = contacts.filter(item => {
      const [key, value] = item;
      return (
        key.match(regex) || value.info.match(regex)
      )
    });
    return matchArray
  }

  loadSamples() {
    // Clone the current contacts map
    const newContacts = new Map(this.state.contacts);
    // Path from root directory
    const url = './client/data/sample-data.json';
    const samples = [];

    // Asyncly(!) Load sample data
    fetch(url)
    .then(response => response.json())
    .then(data => samples.push(...data))
    .then(() => {
      // Add sample data to contacts
      samples.forEach(item => newContacts.set(item.name, item));
      console.log({newContacts});
    })
    .then( () =>
      this.setState({ /* Update the state */
        contacts: newContacts
      })
    )
    .catch((reject) => {
      console.log('reject', reject);
    });
  }

  addContact(event) {
    event.preventDefault();
    const form = event.target;

    const name = form.querySelector('[name="name"]').value;
    const info = form.querySelector('[name="info"]').value;
    const tel = form.querySelector('[name="tel"]').value;
    const telegram = form.querySelector('[name="telegram"]').value;
    const image = form.querySelector('[name="image"]').value;

    const item = {name, info, tel, telegram, image};
    console.log('newContact:', item);

    // Add item to state
    const newContacts = new Map(this.state.contacts);
    newContacts.set(name, item);
    this.setState({contacts: newContacts});

    form.classList.add('hidden'); /* hide form*/
  }

  editContact(event, oldName) {
    event.preventDefault();
    const form = event.target;
    console.log(form);

    // Get new values from form inputs
    const name = form.querySelector('[name="name"]').value;
    const info = form.querySelector('[name="info"]').value;
    const tel = form.querySelector('[name="tel"]').value;
    const telegram = form.querySelector('[name="telegram"]').value;
    const image = form.querySelector('[name="image"]').value;

    const item = {name, info, tel, telegram, image};
    console.log('editedContact:', item);

    // Update state
    const newContacts = new Map(this.state.contacts);

    // Remove old one from contacts
    newContacts.delete(oldName)

    // Add new item
    newContacts.set(name, item);
    this.setState({contacts: newContacts});

    form.remove(); /* delete edit form */
  }

  removeContact(event) {
    event.stopPropagation(); /* Stop on `button.remove` */
    console.log(event.currentTarget);

    // `currentTarget` gives the eventListener node
    const name = event.currentTarget.dataset.name;

    if (name.toLowerCase().includes('кадыров')) { /* Easter Egg */
      const msg = `Вы уверены, что хотите удалить "${name}" из списка контактов?`;
      const wantToRemove = confirm(msg);
      if (!wantToRemove) return;
    }

    // Remove item from state
    const newContacts = new Map(this.state.contacts);
    newContacts.delete(name);
    this.setState({ contacts: newContacts });
  }

  toggleCard(event) {
    const name = event.currentTarget.dataset.name;
    console.log(event.currentTarget);
    const contactCard = document.querySelector(
      `.contact[data-name="${name}"] .card`
    );
    contactCard.classList.toggle('hidden');
  }

  toggleEditForm(event) {
    const existingEditForm = document.querySelector('form.edit-contact');
    if (existingEditForm) {
      existingEditForm.remove();
      return;
    }

    const name = event.currentTarget.dataset.name;
    const contactCard = document.querySelector(
      `.contact[data-name="${name}"] .card`
    );

    // Hide card
    contactCard.classList.add('hidden');
    // Insert edit form
    const addForm = document.querySelector('form.add-contact');
    const editForm = addForm.cloneNode(true); /* `true` for deep cloning */

    editForm.classList.add('edit-contact');
    editForm.classList.remove('hidden');

    const {image, info, tel, telegram} = this.state.contacts.get(name);
    // Set values in inputs
    editForm.querySelector('[name="name"]').defaultValue = name;
    editForm.querySelector('[name="info"]').defaultValue = info;
    editForm.querySelector('[name="tel"]').defaultValue = tel;
    editForm.querySelector('[name="telegram"]').defaultValue = telegram;
    editForm.querySelector('[name="image"]').defaultValue = image;

    editForm.querySelector('[name="name"]').value = name;
    editForm.querySelector('[name="info"]').value = info;
    editForm.querySelector('[name="tel"]').value = tel;
    editForm.querySelector('[name="telegram"]').value = telegram;
    editForm.querySelector('[name="image"]').value = image;

    console.log(telegram);

    contactCard.insertAdjacentElement('afterend', editForm);

    const oldName = name;
    // Hook form to handler
    editForm.onsubmit = (event) => this.editContact(event, oldName);
  }

  toggleSearchBox(event) {
    const searchBox = document.querySelector('form.search-bar');
    searchBox.classList.toggle('hidden');
  }

  toggleAddForm(event) {
    const addForm = document.querySelector('form.add-contact');
    addForm.classList.toggle('hidden');
  }

  updateSearchQuery(searchQuery) {
    this.setState({
      searchQuery
    });
  }

  renderContact(item) {
    const [key, value] = item;

    return (
      <Contact key={key} {...value}
        toggleCard={this.toggleCard}
        removeContact={this.removeContact}
        toggleEditForm={this.toggleEditForm}
      />
    )
  }

  render() {
    const matchArray = this.getMatches(this.state.searchQuery);
    return (
      <div className="wrapper">
        <Header
          addContact={this.addContact}
          loadSamples={this.loadSamples}
          removeContact={this.removeContact}
          toggleSearchBox={this.toggleSearchBox}
          toggleAddForm={this.toggleAddForm}
          updateSearchQuery={this.updateSearchQuery}
        />
        <div className="contacts-list">
          {/* Filtered List of Contacts */}
          {
            matchArray.map((item) => this.renderContact(item))
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default App