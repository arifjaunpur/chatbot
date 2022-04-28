from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

from chat import get_response


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://hybris:nimda@localhost:1433/ecomlocal?driver=SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


@app.get("/")
def index_get():
    return render_template("base.html")


@app.post("/predict")
def predict():
    jsonData = request.get_json()
    print(jsonData)
    text = jsonData.get("message")
    username = jsonData.get("username")
    # TODO: error handling after demo
    response = get_response(text, username,db)

    message = {"answer": response}


    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)