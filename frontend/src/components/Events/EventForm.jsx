import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../graphql/mutations';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [fee, setFee] = useState('');
  const [createEvent] = useMutation(CREATE_EVENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent({
        variables: { eventInput: { title, description, date, location, fee: parseFloat(fee) } },
      });
      // Handle successful event creation (e.g., redirect, show message)
    } catch (error) {
      console.error(error);
    }
  };