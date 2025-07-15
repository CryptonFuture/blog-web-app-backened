import EndPoint from '../../models/Dashboard/endPointModel.js'

const getEndPointRoutes = async (req, res) => {
    const EndPointRoutes = await EndPoint.find()
    
        const formattedData = EndPointRoutes.map(item => ({
            _id: item._id,
            ePGetEndPointName: item.ePGetEndPointName,
            status: item.status,
            is_deleted: item.is_deleted
        }));

        return res.status(200).json({
            success: true,
            data: formattedData
        });
}
 
export {
    getEndPointRoutes
}