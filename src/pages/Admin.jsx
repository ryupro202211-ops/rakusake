import React, { useState, useEffect } from 'react';
import { saveEvent, getEvents, deleteEvent, updateEvent } from '../utils/storage';
import ConfirmationModal from '../components/ConfirmationModal';
import '../styles/App.css';

const Admin = () => {
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
        setEvents(getEvents().reverse());
    }, []);

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

            // Preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);

                // Resize logic to save space in localStorage
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

                    // Helper to get base64
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Compress quality 0.7
                    setFormData(prev => ({ ...prev, image: dataUrl }));
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const saveToSource = async (currentEvents) => {
        console.log('Attempting to save to source...', { isDev: import.meta.env.DEV });
        // Only works in dev mode
        if (!import.meta.env.DEV) {
            console.log('Not in DEV mode, aborting save.');
            return;
        }

        try {
            console.log('Sending POST request to /rakusake/__api/save-events');
            const response = await fetch('/rakusake/__api/save-events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ events: currentEvents }),
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                console.log('Auto-saved to seedData.js');
                // Optional: Show a toast or small indicator
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
            const updatedEvents = getEvents().reverse();
            setEvents(updatedEvents);

            // Auto-save if connected
            // Auto-save to source
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
        // Scroll to top to see form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        setDeletingId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deletingId) {
            deleteEvent(deletingId);
            const updatedEvents = getEvents().reverse();
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

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '600px',
        margin: '0 auto',
        gap: '1rem',
        background: '#fff',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    };

    const inputStyle = {
        padding: '0.8rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '1rem'
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '0.2rem',
        fontSize: '0.9rem',
        color: '#555'
    };

    return (
        <div className="container section-padding" style={{ marginTop: '100px' }}>
            <h2>Event Management</h2>

            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{editingId ? 'Edit Event' : 'Add New Event'}</h3>
                    {editingId && (
                        <button type="button" onClick={resetForm} style={{ background: 'transparent', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Image Upload</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={inputStyle}
                    />
                    {preview && (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img src={preview} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px', borderRadius: '8px' }} />
                            {formData.image && (
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>Image loaded</div>
                            )}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Summary (For List View)</label>
                    <textarea
                        name="summary"
                        placeholder="Short description for the home page..."
                        value={formData.summary}
                        onChange={handleChange}
                        style={{ ...inputStyle, minHeight: '60px' }}
                        required
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Description (For Detail Page - HTML Supported)</label>
                    <textarea
                        name="description"
                        placeholder="Full detailed description... (You can use HTML tags like <br>, <b>, <a href>...)"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ ...inputStyle, minHeight: '150px', fontFamily: 'monospace' }}
                        required
                    />
                </div>

                <button type="submit" className="btn-primary">
                    {editingId ? 'Update Event' : 'Add Event'}
                </button>
            </form>

            <div style={{ marginTop: '4rem' }}>
                <h3>Current Events List</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {events.map(event => (
                        <li key={event.id} style={{
                            background: '#fff',
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {event.image && (
                                    <img src={event.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                )}
                                <div>
                                    <strong>{event.date}</strong> - {event.title}
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(event)}
                                    style={{
                                        background: 'var(--color-primary)',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        marginRight: '10px'
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    style={{
                                        background: '#ff4757',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                <h3>🛠️ Local CMS Status</h3>
                {import.meta.env.DEV ? (
                    <div style={{
                        padding: '1rem',
                        background: '#e8f8f5',
                        border: '1px solid #2ecc71',
                        borderRadius: '8px',
                        color: '#27ae60',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <span>✅ Connected to Local Source! Changes are auto-saved to seedData.js.</span>
                    </div>
                ) : (
                    <div style={{
                        padding: '1rem',
                        background: '#fff3cd',
                        border: '1px solid #ffeeba',
                        borderRadius: '8px',
                        color: '#856404',
                        fontWeight: 'bold'
                    }}>
                        <span>⚠️ Production Mode: Changes are temporary and will NOT be saved to code.</span>
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
