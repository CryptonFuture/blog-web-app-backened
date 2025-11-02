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

const multipleUpdateLogs = async (req, res) => {
  try {
    const logsToUpdate = req.body.logs;

    if (!Array.isArray(logsToUpdate) || logsToUpdate.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'logs must be a non-empty array',
      });
    }

    const bulkOps = logsToUpdate.map((log) => {
      const { _id, label, field_name, data_type, tracking_enabled } = log;

      if (!_id) {
        throw new Error('Each log must contain _id');
      }

      return {
        updateOne: {
          filter: { _id },
          update: {
            $set: {
              label,
              field_name,
              data_type,
              tracking_enabled,
            },
          },
        },
      };
    });

    const result = await LogsConfig.bulkWrite(bulkOps);

    return res.status(200).json({
      success: true,
      message: 'Logs updated successfully',
      result,
    });
  } catch (error) {
    console.error('Error updating logs:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error',
    });
  }
};


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
    getTrackingEnabledLogs,
    multipleUpdateLogs
}