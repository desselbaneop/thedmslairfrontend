import React, { useState } from 'react';
import { api } from '../API/api';
import '../css/CharacterCreation.css';
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

function CharacterCreation() {
    const user = useSelector(state => state.user.user);
    const [characterData, setCharacterData] = useState({
        id: '',
        name: '',
        description: '',
        characteristics: {
            Strength: 0,
            Dexterity: 0,
            Constitution: 0,
            Intelligence: 0,
            Wisdom: 0,
            Charisma: 0,
        },
        stats: {
            Health: 0,
            'Armor Class': 0,
            Experience: 0,
        },
        characterArt: null,
        isPublic: false,
    });
    const [coverImage, setCoverImage] = useState(null);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCharacterData(prevData => ({
            ...prevData,
            id: uuidv4(),
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCharacteristicsChange = (event) => {
        const { name, value } = event.target;
        setCharacterData(prevData => ({
            ...prevData,
            characteristics: {
                ...prevData.characteristics,
                [name]: parseInt(value)
            }
        }));
    };

    const handleStatsChange = (event) => {
        const { name, value } = event.target;
        setCharacterData(prevData => ({
            ...prevData,
            stats: {
                ...prevData.stats,
                [name]: parseInt(value)
            }
        }));
    };

    const handleFileChange = (event) => {
        setCoverImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify(characterData)], { type: 'application/json' }));
        formData.append('art', coverImage);

        try {
            const response = await api.character.create(formData);
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
        <div className="container">
            <div className="character-form">
                <img src="" alt="Character Art" />
                <div className="character-details">
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

                        <button className="submit-button" type="submit">Create</button>
                    </form>
                </div>
                <div className="character-stats">
                    <h4>Stats</h4>
                    {Object.keys(characterData.stats).map((key) => (
                        <div className="stat" key={key}>
                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type="number"
                                id={key}
                                name={key}
                                value={characterData.stats[key]}
                                onChange={handleStatsChange}
                            />
                        </div>
                    ))}
                    <h4>Characteristics</h4>
                    {Object.keys(characterData.characteristics).map((key) => (
                        <div className="stat" key={key}>
                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type="number"
                                id={key}
                                name={key}
                                value={characterData.characteristics[key]}
                                onChange={handleCharacteristicsChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CharacterCreation;
