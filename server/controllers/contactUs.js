import Feedback from "../models/Feedback.js";

export const getFeedbacks = async (req, res) => { 
    const feedbacks = await Feedback.find().sort('-createdAt');

    res.status(200).json(feedbacks);
}

export const postFeedbacks = async (req, res) => {
    const { name, email, phone, feedback } = req.body;

    await Feedback.create({
        name,
        email,
        phone,
        feedback
    });

    res.status(200).json('Feedback Added');
}