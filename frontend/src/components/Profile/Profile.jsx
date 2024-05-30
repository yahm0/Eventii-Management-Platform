import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../graphql/queries';
import { useAuth } from '../../utils/Auth';

const Profile = () => {
  const { userId } = useAuth();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { user } = data;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>Registered Events</h3>
      <ul>
        {user.events.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
