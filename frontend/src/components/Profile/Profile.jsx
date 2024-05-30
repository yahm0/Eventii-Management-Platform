import React from 'react'; // Import the React library
import { useQuery } from '@apollo/client'; // Import the useQuery hook from Apollo Client
import { GET_USER } from '../../graphql/queries'; // Import the GET_USER query
import { useAuth } from '../../utils/Auth'; // Import the useAuth hook

// Define the Profile component to display user profile information
const Profile = () => {
  const { userId } = useAuth();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { user } = data;

  // Return the user's name, email, and registered events
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

export default Profile; // Export the Profile component
