import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userState } from '../State/user';
import { api } from '../API/api';
import '../CSS/CharacterCreation.css';


function CharacterCreation() {
    const [user,] = useAtom(userState);
    const [characterData, setCharacterData] = useState({
        name: '',
        description: '',
        backstory: '',
        imgURL: '',
        userId: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCharacterData(prevData => ({
            ...prevData,
            userId: user.id,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.character.create(characterData);
            if (response.ok) {
                // Character created successfully
                console.log('Character created:', response.data);
            } else {
                // Handle error response
                console.error('Failed to create character:', response.status);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error while creating character:', error);
        }
    };

    return (
        <div>
            <h3>Create Character</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={characterData.name}
                    onChange={handleChange}
                />

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={characterData.description}
                    onChange={handleChange}
                />

                <label htmlFor="backstory">Backstory:</label>
                <textarea
                    id="backstory"
                    name="backstory"
                    value={characterData.backstory}
                    onChange={handleChange}
                />

                <label htmlFor="imgURL">Image URL:</label>
                <input
                    type="text"
                    id="imgURL"
                    name="imgURL"
                    value={characterData.imgURL}
                    onChange={handleChange}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CharacterCreation;
