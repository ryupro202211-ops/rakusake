import { initialEvents, DATA_VERSION } from "./seedData.js";

const STORAGE_KEY_PREFIX = 'rakusake_events_';
const STORAGE_KEY = `${STORAGE_KEY_PREFIX}${DATA_VERSION}`;

// Helper to clear old versions to free up space
const clearOldVersions = () => {
    try {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(STORAGE_KEY_PREFIX) && key !== STORAGE_KEY) {
                console.log(`Removing old data: ${key}`);
                localStorage.removeItem(key);
            }
        });
    } catch (e) {
        console.warn('Failed to clear old versions', e);
    }
};

export const getEvents = () => {
    try {
        const events = localStorage.getItem(STORAGE_KEY);
        return events ? JSON.parse(events) : [];
    } catch (e) {
        console.error("Failed to parse events from localStorage", e);
        return [];
    }
};

export const getEventById = (id) => {
    const events = getEvents();
    return events.find(event => event.id === id);
};

// Helper to trigger update for listeners within the same window
const triggerUpdate = () => {
    window.dispatchEvent(new Event('storage-update'));
};

const safeSetItem = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.code === 22) {
            console.warn('LocalStorage quota exceeded. Attempting to clear old data...');
            clearOldVersions();
            try {
                localStorage.setItem(key, value);
            } catch (retryError) {
                console.error('LocalStorage is full and cannot save new data.', retryError);
                // Fallback: Don't crash, but maybe alert user preferably (not possible here easily)
            }
        } else {
            console.error('Error saving to localStorage', e);
        }
    }
};

export const saveEvent = (event) => {
    const events = getEvents();
    const newEvent = { ...event, id: Date.now().toString() };
    events.push(newEvent);
    safeSetItem(STORAGE_KEY, JSON.stringify(events));
    triggerUpdate();
    return newEvent;
};

export const updateEvent = (updatedEvent) => {
    const events = getEvents();
    const index = events.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
        events[index] = { ...events[index], ...updatedEvent };
        safeSetItem(STORAGE_KEY, JSON.stringify(events));
        triggerUpdate();
    }
};

export const deleteEvent = (id) => {
    const events = getEvents();
    const filteredEvents = events.filter(event => event.id !== id);
    safeSetItem(STORAGE_KEY, JSON.stringify(filteredEvents));
    triggerUpdate();
};

// Seed initial data if empty
export const seedInitialData = () => {
    try {
        // First, try to clear old versions to ensure we have space
        clearOldVersions();

        const events = getEvents();
        if (events.length === 0) {
            safeSetItem(STORAGE_KEY, JSON.stringify(initialEvents));
            triggerUpdate();
        }
    } catch (e) {
        console.error("Failed to seed initial data", e);
    }
};

// Auto-seed on module load to ensure data presence after HMR or version change
seedInitialData();
