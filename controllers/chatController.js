

module.exports = {
    chatRequest: async (req, res, next) => {
        try{
            //Forward request to OpenAI chat completion API and return response
            
        }
        catch(err){
            return next(error);
        }
    },
}