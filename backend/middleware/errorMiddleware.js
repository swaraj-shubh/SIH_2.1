// export const errorHandler = (err, req, res, next) => {
//     console.error("Unhandled error:", err);
//     res.status(500).json({ 
//         error: "Internal server error",
//         message: err.message 
//     });
// };
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.response) {
        // API error
        return res.status(err.response.status).json({
            success: false,
            message: err.response.data?.message || 'API Error',
            data: null
        });
    }

    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        data: null
    });
};