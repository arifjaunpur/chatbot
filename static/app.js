class Chatbox {
    constructor() {
        this.state = false;
        this.messages = [];
        this.apiUrl = 'http://127.0.0.1:5050/';
    }

    setup() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }
        this.name = '';
        document.addEventListener('chatbot.userInfo', (e) => { 
            this.name = e.detail.name;
        }, false);
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;
        const link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', `${this.apiUrl}static/style.css`);
		document.body.appendChild(link);

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                }
        }
        return "";
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch(`${this.apiUrl}predict`, {
            method: 'POST',
            body: JSON.stringify({ message: text1, username: this.name }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item) {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }

    appendHtml() {
        const containerDiv = document.createElement('div');
        const html =  `<div class="chatbox">
                        <div class="chatbox__support">
                            <div class="chatbox__header">
                                <div class="chatbox__image--header">
                                    <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image">
                                </div>
                                <div class="chatbox__content--header">
                                    <h4 class="chatbox__heading--header">Chat support</h4>
                                    <p class="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
                                </div>
                            </div>
                            <div class="chatbox__messages">
                                <div></div>
                            </div>
                            <div class="chatbox__footer">
                                <input type="text" placeholder="Write a message...">
                                <button class="chatbox__send--footer send__button">Send</button>
                            </div>
                        </div>
                        <div class="chatbox__button">
                            <button><img src="${this.apiUrl}static/images/chatbox-icon.svg" /></button>
                        </div>
                    </div>`;
            containerDiv.setAttribute('class', 'container');
            containerDiv.innerHTML = html;
            document.body.appendChild(containerDiv);
    }
}


const chatbox = new Chatbox();
chatbox.appendHtml();
chatbox.setup();
chatbox.display();
window.Chatbot = {};
console.log(document.cookie);