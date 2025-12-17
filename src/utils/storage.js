import { initialEvents, DATA_VERSION } from "./seedData.js";

const STORAGE_KEY = `rakusake_events_${DATA_VERSION}`;

export const getEvents = () => {
    const events = localStorage.getItem(STORAGE_KEY);
    return events ? JSON.parse(events) : [];
};

export const getEventById = (id) => {
    const events = getEvents();
    return events.find(event => event.id === id);
};

// Helper to trigger update for listeners within the same window
const triggerUpdate = () => {
    window.dispatchEvent(new Event('storage-update'));
};

export const saveEvent = (event) => {
    const events = getEvents();
    const newEvent = { ...event, id: Date.now().toString() };
    events.push(newEvent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    triggerUpdate();
    return newEvent;
};

export const updateEvent = (updatedEvent) => {
    const events = getEvents();
    const index = events.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
        events[index] = { ...events[index], ...updatedEvent };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        triggerUpdate();
    }
};

export const deleteEvent = (id) => {
    const events = getEvents();
    const filteredEvents = events.filter(event => event.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEvents));
    triggerUpdate();
};

// Seed initial data if empty
export const seedInitialData = () => {
    const events = getEvents();
    if (events.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEvents));
        triggerUpdate();
    }
};

// Auto-seed on module load to ensure data presence after HMR or version change
seedInitialData();
