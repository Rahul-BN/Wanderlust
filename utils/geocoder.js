const axios = require('axios');

// Geocoding function to convert location string to coordinates
// const geocodeLocation = async (location) => {
//     try {
//         const response = await axios.get(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`
//         );
        
//         if (response.data && response.data.length > 0) {
//             const { lat, lon, display_name } = response.data[0];
//             return {
//                 coordinates: [parseFloat(lon), parseFloat(lat)],
//                 formattedAddress: display_name
//             };
//         }
//         return null;
//     } catch (error) {
//         console.error('Geocoding error:', error);
//         return null;
//     }
// };

// In utils/geocoder.js - improve error handling
const geocodeLocation = async (location) => {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`,
            {
                timeout: 10000, // 10 second timeout
                headers: {
                    'User-Agent': 'wanderlust-app (rahulnavi1432@gmail.com)' // Add user agent for Nominatim
                }
            }
        );
        
        if (response.data && response.data.length > 0) {
            const { lat, lon, display_name } = response.data[0];
            
            // Validate coordinates
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lon);
            
            if (!isNaN(latitude) && !isNaN(longitude) && 
                latitude >= -90 && latitude <= 90 && 
                longitude >= -180 && longitude <= 180) {
                
                return {
                    coordinates: [longitude, latitude],
                    formattedAddress: display_name
                };
            }
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error.message);
        return null;
    }
};

module.exports = { geocodeLocation };