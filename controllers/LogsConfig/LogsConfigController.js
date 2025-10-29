import LogsConfig from '../../models/LogsConfig/LogConfigModel.js'

const getLogsConfig = async (req, res) => {
     const  moduleType = req.query || {}
     const logsConfig = await LogsConfig.find(moduleType)
    
        if (logsConfig.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            });
        }
    
        return res.status(200).json({
            success: true,
            data: logsConfig
        });
}

const updateLogs = async (req, res) => {
    const { id } = req.params

    const { label, field_name, data_type, tracking_enabled } = req.body;

    if (!label) {
        return res.status(400).json({
            success: false,
            error: 'label field is required',
        });
    }

    const updatedLogs = await LogsConfig.findByIdAndUpdate(
        { _id: id },
        {
            label,
            field_name,
            data_type,
            tracking_enabled
        },
        { new: true }
    );

    if (!updatedLogs) {
        return res.status(404).json({
            success: false,
            error: 'no record found',
        });
    }


    return res.status(200).json({
        success: true,
        message: "Logs updated successfully",
        data: updatedLogs
    });
}

const getTrackingEnabledLogs = async (req, res) => {
  try {
    const moduleType = req.query || {};

    const filter = { ...moduleType, tracking_enabled: true };

    const logsConfig = await LogsConfig.find(filter);

    if (logsConfig.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No record found with tracking enabled",
      });
    }

    return res.status(200).json({
      success: true,
      data: logsConfig,
    });
  } catch (error) {
    console.error("Error fetching tracking-enabled logs:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};


export {
    getLogsConfig,
    updateLogs,
    getTrackingEnabledLogs
}