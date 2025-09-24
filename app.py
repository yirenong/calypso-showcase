from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def get_data():
    print("hello")
    return jsonify({'message': 'Hello from Flask!'})

if __name__ == '__main__':
    app.run(debug=True)
