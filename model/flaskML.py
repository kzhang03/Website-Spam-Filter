print("Starting Flask app...")
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS # remove if unable to run
print("Imported Flask and other required modules.")
import pickle
import os

app = Flask(__name__)
CORS(app) # remove if unable to run

# get directory of a file
dir_path = os.path.dirname(os.path.realpath(__file__))

# get directory of vectorizer and open it
with open(os.path.join(dir_path, 'vectorizer.pkl'), "rb") as f:
    count_vector = pickle.load(f)

# get directory of model and open it
with open(os.path.join(dir_path, 'model2.pkl'), "rb") as f:
    model = pickle.load(f)

# Delete this if unable to run
@app.route('/predict', methods=['OPTIONS'])
def handle_options():
    response = app.response_class()
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

# Predict on received data and return decision
@app.route('/predict', methods=['POST'])
def predict():

    data = request.json
    review_vector = count_vector.transform(data['reviews'])
    prediction = model.predict(review_vector)

    return jsonify({"predictions": [prediction[0]]})

app.run(host='0.0.0.0', port=54)