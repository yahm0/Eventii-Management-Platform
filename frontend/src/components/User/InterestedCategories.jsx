import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_INTERESTED_CATEGORIES } from '../../graphql/mutations';

const InterestedCategories = ({ userId, initialCategories }) => {
    const [categories, setCategories] = useState(initialCategories || []);
    const [updateCategories] = useMutation(UPDATE_USER_INTERESTED_CATEGORIES);

    const handleCategoryChange = (category) => {
        setCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCategories({ variables: { userId, categories } });
            alert('Interested categories updated successfully!');
        } catch (err) {
            console.error('Error updating interested categories:', err);
            alert('Failed to update interested categories. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Interested Categories</h3>
            {['Music', 'Sports', 'Technology', 'Art', 'Food'].map(category => (
                <label key={category}>
                    <input
                        type="checkbox"
                        checked={categories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                </label>
            ))}
            <button type="submit">Update Interests</button>
        </form>
    );
};

export default InterestedCategories;
