import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { ContactForm } from 'components/ContactForm/Form';
import { Box } from 'components/ui/Box';
import { Section } from 'components/ui/Section';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useMemo } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import { nanoid } from 'nanoid';

const givenContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', givenContacts);
  const [filter, setFilter] = useState('');

  const handleSubmit = values => {
    const names = contacts.some(contacts => contacts.name === values.name);
    if (names) {
      toast(`${values.name} is already in contacts`);
      return;
    } else {
      const newContact = {
        id: nanoid(3),
        name: values.name,
        number: values.number,
      };
      setContacts([newContact, ...contacts]);
    }
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const deleteContact = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, contacts]);

  return (
    <>
      <Box
        width="460px"
        margin="0 auto"
        display="flex"
        flexDirection="column"
        as="section"
      >
        <Section title="Phonebook">
          <ContactForm onSubmit={handleSubmit} />
        </Section>

        <Section title="Contacts">
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            options={filteredContacts}
            onDeleteContact={deleteContact}
          />
        </Section>
      </Box>
      <ToastContainer autoClose={3000} />
    </>
  );
}
