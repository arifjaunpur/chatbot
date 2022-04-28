# Chatbot

## Initial Setup:

Clone repo and create a virtual environment
```
git clone https://github.com/arifjaunpur/chatbot.git
cd chatbot
python3 -m venv venv
 . venv/bin/activate
```

## Install dependencies
```
pip install Flask torch torchvision nltk sqlalchemy pyodbc
```
To install nltk package, run following command
```
python
import nltk
nltk.download('punkt')
```
Modify `intents.json` with different intents and responses for your Chatbot

Run following command to trained chatbot
```
python train.py
```
This will dump data.pth file. And then run
the following command to test it in the console.

## To run application
```
set FLASK_APP=app #Windows 
export FLASK_APP=app #Linux and Mac
flask run --host=0.0.0.0 --port=5000
```

