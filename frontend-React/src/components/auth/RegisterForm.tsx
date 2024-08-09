import React, { useState } from 'react';
import { registerUser } from '../../services/api';

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert('User registered successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to register user.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} />
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" name="lastName" onChange={handleChange} />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
