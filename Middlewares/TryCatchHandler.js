// 
const Trycatchmiddleware = (Trycatchhandler) => {
    return async (req, res, next) => {
        try {
            await Trycatchhandler(req, res, next);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failure",
                message: "Error",
                error_message: error.message
            });
        }
    };
};

module.exports = Trycatchmiddleware;
