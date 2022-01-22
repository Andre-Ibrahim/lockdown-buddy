from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from flask import Flask, request

chatbot = ChatBot('Ron Obvious')

# Create a new trainer for the chatbot
trainer = ChatterBotCorpusTrainer(chatbot)

# Train the chatbot based on the english corpus
trainer.train("chatterbot.corpus.english")

app = Flask("lockdown-buddy-predict")


@app.route("/predict")
def predict():
    input = request.args.get('message')
    prediction = chatbot.get_response("test")
    print(input, prediction)
    return str(prediction)
