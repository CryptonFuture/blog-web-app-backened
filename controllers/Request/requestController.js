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
        addInfo,
        status: true
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

const getActiveRequest = async (req, res) => {
   
    const request = await Request.find({status: true})

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

const getInActiveRequest = async (req, res) => {

     const requests = await Request.find({
      status: false,
    });
    

    if (!requests.length > 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: requests,
    })
}

const approvedByRequest = async (req, res) => {

  const { id } = req.params
  
       const approved = await Request.findById(id);
  
      if (!approved) {
          return res.status(404).json({
              success: false,
              error: "No approved Id found"
          })
      } 
  
      const approve = await Request.findByIdAndUpdate({ _id: id }, { approvedBy: 1})
  
      return res.status(200).json({
          success: true,
          message: 'Approved Request Successfully',
          data: approve
      });
};

const approvedAtRequest = async (req, res) => {

  const { id } = req.params
  
       const approved = await Request.findById(id);
  
      if (!approved) {
          return res.status(404).json({
              success: false,
              error: "No approved Id found"
          })
      } 
  
      const approve = await Request.findByIdAndUpdate({ _id: id }, { approvedAt: 1, status: false })
  
      return res.status(200).json({
          success: true,
          message: 'Approved Request Successfully',
          data: approve
      });
};


const rejectByRequest = async (req, res) => {
    const { id } = req.params

    const reject = await Request.findByIdAndUpdate({ _id: id }, { rejectedBy: true })

    if (reject.reject === true) {
      return res.status(400).json({
        success: false,
        error: "This request has already been reject"
      });
    }

    if (!reject) {
        return res.status(404).json({
            success: false,
            error: "No reject Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Reject Request Successfully'
        })
    }
}

const rejectAtRequest = async (req, res) => {
    const { id } = req.params

    const reject = await Request.findByIdAndUpdate({ _id: id }, { rejectedAt: true, status: false })

    if (reject.reject === true) {
      return res.status(400).json({
        success: false,
        error: "This request has already been reject"
      });
    }

    if (!reject) {
        return res.status(404).json({
            success: false,
            error: "No reject Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Reject Request Successfully'
        })
    }
}

const getRequestById = async (req, res) => {
    const { id } = req.params
    const request = await Request.find({ _id: id })

    if (!request) {
        return res.status(404).json({
            success: false,
            error: "No request Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: request
    })
}


const countActiveRequest = async (req, res) => {
    const countRequest = await Request.countDocuments({status: true})
    return res.status(200).json({
        success: true,
        count: countRequest
    })
}

const countInActiveRequest = async (req, res) => {

    const countRequest = await Request.countDocuments({status: false})
    return res.status(200).json({
        success: true,
        count: countRequest,
    })
}


export {
   addRequest,
   getActiveRequest,
   getInActiveRequest,
   approvedByRequest,
   approvedAtRequest,
   countActiveRequest,
   countInActiveRequest,
   rejectByRequest,
   rejectAtRequest,
   getRequestById
}