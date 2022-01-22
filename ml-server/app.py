from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from flask import Flask, request

chatbot = ChatBot('Lockdown-buddy')
trainer = ChatterBotCorpusTrainer(chatbot)

trainer.train("chatterbot.corpus.english")
trainer.train("chatterbot.corpus.english.greetings")
trainer.train("chatterbot.corpus.english.conversations")

app = Flask("lockdown-buddy-predict")


@app.route("/predict")
def predict():
    input = request.args.get('message')
    prediction = chatbot.get_response(str(input))
    return str(prediction)
