import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import css from './ContactsForm.module.css';

export default function ContactsForm() {
  const dispatch = useDispatch();
  const savedContacts = useSelector(getContacts);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = event => {
    const { value } = event.target;
    setName(value);
  };

  const handlePhoneChange = event => {
    const { value } = event.target;
    setPhone(value);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contactExists = savedContacts.some(
      contact => contact.name === name || contact.phone === phone
    );

    if (!contactExists) {
      dispatch(addContact({ name, phone }));
    } else {
      alert('Such a contact already exists in the phonebook!');
    }

    resetForm();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formLable}>
        Name:
        <input
          className={css.formInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label className={css.formLable}>
        Phone:
        <input
          className={css.formInput}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handlePhoneChange}
          value={phone}
        />
      </label>
      <button className={css.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
}
