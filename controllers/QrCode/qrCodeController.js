import QrCodePost from '../../models/QrCode/qrCodeModel.js'
import QrCode from 'qrcode'

const addQrCodePost = async (req, res) => {
    const { title, description } = req.body

    if (!title) {
        return res.status(400).json({
            success: false,
            error: 'title field is required'
        })
    }

    const post = new QrCodePost({
        title,
        description,
    })

    const encodedValue = `${req.protocol}://${req.get('host')}/open-item/${post._id}`

    const qrDataUrl = await QrCode.toDataURL(encodedValue)

    post.qrCode = qrDataUrl

    await post.save()

    if (qrDataUrl) {
        return res.status(200).json({
            success: true,
            message: "post create successfully",
            data: post
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    }
}

const getQrCodePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const QrCodePost = await QrCodePost.findById(id);
    if (!QrCodePost) return res.status(404).json({ success: false, error: 'Item not found' });
    return res.json({ success: true, QrCodePost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}

const getQrCodePostId = async (req, res) => {
  try {
    const { id } = req.params;
    const QrCode = await QrCodePost.findById(id);
    
    if (!QrCode) return res.status(404).json({ success: false, error: 'Item not found' });
    return res.json({ success: true, QrCode });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}

const getQrCodePost = async (req, res) => {
  try {
    const QrCode = await QrCodePost.find();
    if (!QrCode) return res.status(404).json({ success: false, error: 'Item not found' });
    return res.json({ success: true, data: QrCode });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}

const updateQrCodePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const QrCodePost = await QrCodePost.findByIdAndUpdate(id, updates, { new: true });
    if (!QrCodePost) return res.status(404).json({ success: false, error: 'Item not found' });
    return res.json({ success: true, QrCodePost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

const deleteQrCodePost = async (req, res) => {
  try {
    const { id } = req.params;
    const QrCodePost = await QrCodePost.findByIdAndDelete(id);
    if (!QrCodePost) return res.status(404).json({ success: false, error: 'Item not found' });
    return res.json({ success: true, message: 'Deleted', QrCodePost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export {
    addQrCodePost,
    getQrCodePost,
    updateQrCodePost,
    deleteQrCodePost,
    getQrCodePostById,
    getQrCodePostId
}