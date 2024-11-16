from os import getenv
from flask import Flask, session
from flask_pydantic import validate
from pydantic import BaseModel

from .ai.openrouter import LlamaPrompter


def main():
    app = Flask(__name__)

    app.secret_key = getenv("SECRET_KEY")

    api_key = getenv("OPENROUTER_API_KEY")
    prompter = LlamaPrompter(api_key)

    class QuestionPostBody(BaseModel):
        url: str

    @app.post("/question")
    @validate()
    def question_post(body: QuestionPostBody):
        question = prompter.prompt(body.url)
        return question

    class AnswerPostBody(BaseModel):
        answers: list[str]

    @app.post("/answer")
    @validate()
    def answer_post(body: AnswerPostBody):
        # In production usage, this should be replaced by a call to a database
        interests = session.get("interests", default=[])
        interests.extend(body.answers)
        session["interests"] = interests
        return ""

    @app.get("/interests")
    def answer_get():
        return {"interests": session.get("interests", default=[])}

    app.run(host="localhost", port=8000)
