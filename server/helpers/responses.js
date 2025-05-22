
const successResponse = (res, message, result) => {
    return res.json({
        status: true,
        message,
        result 
    })
}

const failerResponse = (res, message) => {
    return res.json({
        status: false,
        message
    })
}

const InternalServerErrorResponse = (res) => {
    return res.json({
        status: false,
        message: "Internal server error !!"
    })
}

module.exports = {successResponse, failerResponse, InternalServerErrorResponse}