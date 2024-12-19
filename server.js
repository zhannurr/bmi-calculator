 // Import required modules
 const express = require('express'); // Express framework for creating the server
 const bodyParser = require('body-parser'); // Middleware for parsing form data
 
 // Initialize the app
 const app = express();
 
 // Middleware setup
 app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data
 app.use(express.static('public')); // Serve static files (like CSS) from the 'public' folder
 
 // Route for the home page
 app.get('/', (req, res) => {
     // Serve the index.html file when the user accesses the root URL
     res.sendFile(__dirname + '/views/index.html');
 });


app.post('/calculate', (req, res) => {
    const age = parseInt(req.body.age); 
    const height = parseFloat(req.body.height); 
    const weight = parseFloat(req.body.weight); 
    const gender = req.body.radio; 

    const bmi = weight / ((height / 100) ** 2);
    let result = '';
    let advice = '';

    if (bmi < 18.5) {
        result = 'Underweight';
        if (gender === "female") {
            if (age < 18) {
                advice = "Ensure you are eating enough nutritious meals, including protein, fruits, and vegetables. Consult a healthcare professional for further advice.";
            } else {
                advice = "Increase your calorie intake with nutrient-dense foods and consider strength-training exercises to build muscle mass.";
            }
        } else if (gender === "male") {
            if (age < 18) {
                advice = "Focus on eating more protein-rich foods and staying active to promote healthy weight gain.";
            } else {
                advice = "Incorporate more calories into your diet, and consider working with a dietitian or trainer to build muscle.";
            }
        }
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        result = 'Healthy';
        if (gender === "female") {
            if (age < 18) {
                advice = "You're maintaining a healthy weight! Continue eating balanced meals with plenty of fruits and vegetables. Focus on staying active, and remember that your body is still growing.";
            } else {
                advice = "Keep up the great work! Make sure to maintain a balanced diet, stay active, and get enough rest to keep your body in top shape.";
            }
        } else if (gender === "male") {
            if (age < 18) {
                advice = "You're doing well! Keep up with balanced meals and regular physical activity to support your growth. Consider doing strength training to build muscle.";
            } else {
                advice = "Continue with your healthy lifestyle! Keep exercising regularly and eating a well-rounded diet to maintain your weight.";
            }
        }
    } else if (bmi >= 25 && bmi <= 29.9) {
        result = 'Overweight';
        if (gender === "female") {
            if (age < 18) {
                advice = "It’s important to focus on balanced meals and staying active. Try incorporating more fruits and vegetables, and aim for at least 30 minutes of exercise every day.";
            } else {
                advice = "Consider reducing your calorie intake with a focus on whole foods like fruits, vegetables, and lean proteins. Regular physical activity is essential for maintaining a healthy weight.";
            }
        } else if (gender === "male") {
            if (age < 18) {
                advice = "Focus on staying active and eating nutrient-dense foods. Avoid sugary snacks and focus on healthy meals to support your growth.";
            } else {
                advice = "Incorporate more vegetables and lean proteins into your diet. Regular exercise, including both cardio and strength training, can help you maintain a healthy weight.";
            }
        }
    } else if (bmi >= 30) {
        result = 'Obese';
        if (gender === "female") {
            if (age < 18) {
                advice = "Focus on a balanced diet with fewer processed foods and more fruits and vegetables. Regular physical activity is important, so try activities you enjoy, like swimming or cycling.";
            } else {
                advice = "Consider working with a healthcare professional to create a plan that fits your needs. Start with manageable exercises and focus on nutrient-dense meals.";
            }
        } else if (gender === "male") {
            if (age < 18) {
                advice = "Focus on regular physical activity, especially activities you enjoy, and avoid processed foods. Make sure to get plenty of sleep to support your body’s growth.";
            } else {
                advice = "A balanced approach to eating and exercise is important. Consider consulting a healthcare professional to get personalized guidance. Start with low-impact exercises like walking or swimming.";
            }
        }
    }
    
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your BMI Result</title>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

         </head>
        <body>
            <div class="result">
                <h1>BMI Result</h1>
                <p>Your BMI is <span id="bmi-result">${bmi.toFixed(2)}</span></p>
                <p>You are ${result}</p>
                <p>Personal advice based on your gender and age: ${advice}</p>
            </div>
            <a href="/" class="back-button">Back to Calculator</a>
            <style>
                body {
                font-family: 'Montserrat', sans-serif;
                background: #a9e2ee;
                text-align: center;
                font-size: 28px;
                font-weight: 600;
            }

            .result p {
                font-family: 'Montserrat', sans-serif;
                font-weight: 600;
                font-size: 22px;
                color: #000;
                margin-bottom: 15px;
            }

            #bmi-result {
                font-size: 36px;
                font-weight: 900;
                color: #056578;
                background-color: #eaeaea;
                display: inline-block;
                padding: 7px 20px;
                border-radius: 55px;
                margin-bottom: 25px;
            }

           

            .back-button {
                display: inline-block;
                text-decoration: none;
                color: #fff;
                background-color: #056578;
                padding: 10px 20px;
                border-radius: 15px;
                margin-top: 20px;
                font-size: 18px;
            }

            </style>
        </body>
        </html>
    `);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
