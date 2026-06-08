import Message from '../../models/Message/messageModel.js'

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

const createMessage = async (req, res) => {
  try {
    const { sender, message } = req.body;
    if (!sender || !message) {
      return res.status(400).json({ error: "Sender and message are required" });
    }

    const newMessage = new Message({ sender, message });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to create message" });
  }
};

export {
    getMessages,
    createMessage
}