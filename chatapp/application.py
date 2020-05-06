import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("submit message")
def vote(data):
    # data is the JSON send with emit, {"messages":messages}
    messages = data["messages"]
    # messages variable access the JSON with the key messages.
    emit("announce messages", {"messages": messages}, broadcast=True)
