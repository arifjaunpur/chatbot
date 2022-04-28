# Chatbot

## How to use

```
<script src="http://127.0.0.1:5050/static/app.js" defer></script>
<script>
	setTimeout(() => {
		const event = new CustomEvent('chatbot.userInfo', {
			detail: {
				name:  '${firstName}'
			}
		});
		document.dispatchEvent(event);
	}, 100);
</script>
```

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
pip install Flask flask_cors torch torchvision nltk sqlalchemy flask_sqlalchemy pyodbc
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

