const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [
        {
            question: String,
            options: [String],
            answer: String
        }
    ],
    startTime: Date,
    endTime: Date,
    duration: Number // in minutes
});

module.exports = mongoose.model('Exam', examSchema);