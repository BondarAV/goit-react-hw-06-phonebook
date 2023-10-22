import { FormComponent } from './Form';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

import { useSelector, useDispatch } from "react-redux";
import { addContact, deleteContact } from './redux/ContactsSlice.js';
import { setFilter } from './redux/FilterSlice.js';

export const App = () => {

  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const filterNames = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className="app">
      <h1 className="app-title">Phonebook</h1>

      <FormComponent addContact={(name, number) => dispatch(addContact(name, number))} />

      <h2 className="title">Contacts</h2>

      <Filter getNewFilter={(filter) => dispatch(setFilter(filter))} />

      {
        <ContactList
          filteredNames={filterNames()}
          deleteContact={(id) => dispatch(deleteContact(id))}
        />
      }
    </div>
  );
};
