const axios = require('axios');

// Geocoding function to convert location string to coordinates
const geocodeLocation = async (location) => {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`
        );
        
        if (response.data && response.data.length > 0) {
            const { lat, lon, display_name } = response.data[0];
            return {
                coordinates: [parseFloat(lon), parseFloat(lat)],
                formattedAddress: display_name
            };
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
};

module.exports = { geocodeLocation };