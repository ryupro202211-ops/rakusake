import React, { useState, useEffect } from 'react';
import { saveEvent, getEvents, deleteEvent, updateEvent } from '../utils/storage';
import ConfirmationModal from '../components/ConfirmationModal';
import '../styles/admin.css';

const ADMIN_PASSWORD = 'rakusake2024';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        summary: '',
        description: '',
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const auth = sessionStorage.getItem('rakusake_admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            setEvents(getEvents().sort((a, b) => new Date(b.date) - new Date(a.date)));
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('rakusake_admin_auth', 'true');
            setAuthError('');
        } else {
            setAuthError('パスワードが違います');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-auth">
                <form onSubmit={handleLogin} className="admin-auth__form">
                    <h2 className="admin-auth__title">Admin Login</h2>
                    {authError && <p className="admin-auth__error">{authError}</p>}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="パスワードを入力"
                        className="admin-auth__input"
                        autoFocus
                    />
                    <button type="submit" className="btn-primary">ログイン</button>
                </form>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) {
                alert("File size is too big! Please select an image under 5MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);

                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    setFormData(prev => ({ ...prev, image: dataUrl }));
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const saveToSource = async (currentEvents) => {
        if (!import.meta.env.DEV) return;

        try {
            const response = await fetch('/rakusake/__api/save-events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ events: currentEvents }),
            });

            if (response.ok) {
                console.log('Auto-saved to seedData.js');
            } else {
                console.error('Failed to auto-save to source');
            }
        } catch (err) {
            console.error('Auto-save failed:', err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.date || !formData.summary || !formData.description) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            if (editingId) {
                updateEvent({ ...formData, id: editingId });
                alert('Event updated successfully!');
            } else {
                saveEvent(formData);
                alert('Event added successfully!');
            }
            resetForm();
            const updatedEvents = getEvents().sort((a, b) => new Date(b.date) - new Date(a.date));
            setEvents(updatedEvents);
            saveToSource(updatedEvents);
        } catch (err) {
            alert('Failed to save event. Image might be too large for browser storage.');
            console.error(err);
        }
    };

    const handleEdit = (event) => {
        setEditingId(event.id);
        setFormData({
            title: event.title,
            date: event.date,
            summary: event.summary || '',
            description: event.description || '',
            image: event.image
        });
        setPreview(event.image);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        setDeletingId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deletingId) {
            deleteEvent(deletingId);
            const updatedEvents = getEvents().sort((a, b) => new Date(b.date) - new Date(a.date));
            setEvents(updatedEvents);
            if (editingId === deletingId) {
                resetForm();
            }
            saveToSource(updatedEvents);
        }
        setShowDeleteModal(false);
        setDeletingId(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeletingId(null);
    };

    const resetForm = () => {
        setFormData({ title: '', date: '', summary: '', description: '', image: null });
        setPreview(null);
        setEditingId(null);
    };

    return (
        <div className="container section-padding admin">
            <h2>Event Management</h2>

            <form onSubmit={handleSubmit} className="admin__form">
                <div className="admin__form-header">
                    <h3>{editingId ? 'Edit Event' : 'Add New Event'}</h3>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="admin__cancel-btn">Cancel</button>
                    )}
                </div>

                <div className="admin__field">
                    <label className="admin__label">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="admin__input"
                        required
                    />
                </div>

                <div className="admin__field">
                    <label className="admin__label">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="admin__input"
                        required
                    />
                </div>

                <div className="admin__field">
                    <label className="admin__label">Image Upload</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="admin__input"
                    />
                    {preview && (
                        <div className="admin__preview-wrapper">
                            <img src={preview} alt="Preview" className="admin__preview-image" />
                            {formData.image && (
                                <div className="admin__preview-status">Image loaded</div>
                            )}
                        </div>
                    )}
                </div>

                <div className="admin__field">
                    <label className="admin__label">Summary (For List View)</label>
                    <textarea
                        name="summary"
                        placeholder="Short description for the home page..."
                        value={formData.summary}
                        onChange={handleChange}
                        className="admin__textarea"
                        required
                    />
                </div>

                <div className="admin__field">
                    <label className="admin__label">Description (For Detail Page - HTML Supported)</label>
                    <textarea
                        name="description"
                        placeholder="Full detailed description... (You can use HTML tags like <br>, <b>, <a href>...)"
                        value={formData.description}
                        onChange={handleChange}
                        className="admin__textarea admin__textarea--large"
                        required
                    />
                </div>

                <button type="submit" className="btn-primary">
                    {editingId ? 'Update Event' : 'Add Event'}
                </button>
            </form>

            <div className="admin__list-section">
                <h3>Current Events List</h3>
                <ul className="admin__list">
                    {events.map(event => (
                        <li key={event.id} className="admin__list-item">
                            <div className="admin__list-content">
                                {event.image && (
                                    <img src={event.image} alt="" className="admin__list-thumb" />
                                )}
                                <div>
                                    <strong>{event.date}</strong> - {event.title}
                                </div>
                            </div>
                            <div>
                                <button onClick={() => handleEdit(event)} className="admin__edit-btn">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(event.id)} className="admin__delete-btn">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="admin__status-section">
                <h3>Local CMS Status</h3>
                {import.meta.env.DEV ? (
                    <div className="admin__status--connected">
                        <span>Connected to Local Source! Changes are auto-saved to seedData.js.</span>
                    </div>
                ) : (
                    <div className="admin__status--production">
                        <span>Production Mode: Changes are temporary and will NOT be saved to code.</span>
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this event?"
            />
        </div>
    );
};

export default Admin;
