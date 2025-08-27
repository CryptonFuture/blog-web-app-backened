import Request from '../../models/Request/requestModel.js'

const addRequest = async (req, res) => {
    const { username, email, phone, reqInfo, addInfo } = req.body

    if (!username || !email) {
        return res.status(400).json({
            success: false,
            error: 'please fill out all fields'
        })
    }

    const request = new Request({
        username,
        email,
        phone,
        reqInfo,
        addInfo
    })

    const requestData = await request.save()

    if (requestData) {
        return res.status(200).json({
            success: true,
            message: "request create successfully",
            data: requestData
        })
    } else {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

export {
   addRequest
}