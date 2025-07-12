import EndPoint from '../../models/Dashboard/endPointModel.js'

const getEndPointRoutes = async (req, res) => {
    const EndPointRoutes = await EndPoint.find()

    return res.status(200).json({
        success: true,
        data: EndPointRoutes
    })  
}
 
export {
    getEndPointRoutes
}