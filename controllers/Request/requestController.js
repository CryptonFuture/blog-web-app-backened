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

const getRequest = async (req, res) => {
   
    const request = await Request.find()

    if (!request.length > 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: request,
    })
}

const approvedRequest = async (req, res) => {
    const { id } = req.params

    const approved = await Request.findByIdAndUpdate({ _id: id }, { approved: true })

    if (approved.approved === true) {
      return res.status(400).json({
        success: false,
        error: "This request has already been approved"
      });
    }

    if (!approved) {
        return res.status(404).json({
            success: false,
            error: "No approved Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Approved Request Successfully'
        })
    }
}


export {
   addRequest,
   getRequest,
   approvedRequest
}