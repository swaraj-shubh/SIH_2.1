import axios from 'axios';
import { LENS_API_URL, LENS_API_KEY } from '../config/index.js';

/**
 * @desc    Fetch a specific batch of patents from Lens.org
 * @route   GET /api/patents/:batch
 * @access  Public
 */
export const getPatentsByBatch = async (req, res, next) => {
    try {
        const batch = parseInt(req.params.batch, 10);
        const size = 100; // The API limit per request

        // Validate that the batch number is a positive multiple of 100
        if (isNaN(batch) || batch <= 0 || batch % size !== 0) {
            return res.status(400).json({
                message: "Invalid batch number. It must be a multiple of 100 (e.g., 100, 200, 300)."
            });
        }

        // Calculate the 'from' parameter for the Lens.org API.
        const from = batch - size;

        const requestBody = {
            "query": {
                "match_all": {}
            },
            "from": from,
            "size": size,
            "sort": [
                {
                    "date_published": "desc"
                }
            ]
        };
        
        // --- FIX STARTS HERE ---
        // Robustly construct the final API endpoint URL to avoid path duplication.
        // This takes the base URL from your .env and ensures the path is correctly set.
        const apiUrl = new URL(LENS_API_URL);
        apiUrl.pathname = '/patent/search';
        // --- FIX ENDS HERE ---

        console.log(`Fetching patents from Lens.org URL: ${apiUrl.toString()}`);
        console.log(`Request params: size=${size}, from=${from}`);

        const config = {
            headers: {
                'Authorization': `Bearer ${LENS_API_KEY}`,
                'Content-Type': 'application/json'
            }
        };

        // Make the POST request to the correctly constructed URL
        const { data } = await axios.post(apiUrl.toString(), requestBody, config);

        // Send the results from Lens.org back to the client
        res.status(200).json(data);

    } catch (error) {
        // Pass any errors to the error handling middleware
        console.error("Error fetching patents from Lens.org API:", error.response ? error.response.data : error.message);
        next(error);
    }
};

