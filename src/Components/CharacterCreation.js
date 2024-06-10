import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userState } from '../State/user';
import { api } from '../API/api';
import '../CSS/CharacterCreation.css';
import { v4 as uuidv4 } from "uuid";

function CharacterCreation() {
    const [user,] = useAtom(userState);
    const [characterData, setCharacterData] = useState({
        id: '',
        name: '',
        description: '',
        characteristics: [],
        stats: [],
        coverImage: null,
        isPublic: false,
    });
    const [coverImage, setCoverImage] = useState(null)

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCharacterData(prevData => ({
            ...prevData,
            id: uuidv4(),
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (event) => {
        setCoverImage(event.target.files[0])
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify(characterData)], { type: 'application/json' }));
        formData.append('art', coverImage);

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

                <label htmlFor="coverImage">Cover Image:</label>
                <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    onChange={handleFileChange}
                />

                <label htmlFor="isPublic">Public:</label>
                <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={characterData.isPublic}
                    onChange={handleChange}
                />

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CharacterCreation;
