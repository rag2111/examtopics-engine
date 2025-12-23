const fs = require('fs');
const path = require('path');
const { parseMarkdown } = require('./parser');

const activeExamPath = path.resolve(__dirname, '../../Exams/ogea-101_enhanced.md');

try {
    const content = fs.readFileSync(activeExamPath, 'utf-8');
    const questions = parseMarkdown(content);
    console.log(`Parsed ${questions.length} questions.`);
    if (questions.length > 0) {
        console.log("First question example:");
        console.log(JSON.stringify(questions[0], null, 2));
    } else {
        console.log("No questions parsed!");
    }
} catch (err) {
    console.error(err);
}
