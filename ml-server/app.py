from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot import comparisons, response_selection
from flask import Flask, request

# chatbot = ChatBot('Lockdown-buddy')

chatbot = ChatBot(
    "Lockdown-buddy",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            "statement_comparison_function": comparisons.LevenshteinDistance,
            "response_selection_method": response_selection.get_first_response
        },
        'chatterbot.logic.BestMatch',
        'chatterbot.logic.MathematicalEvaluation'
    ],
)

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
