from pydantic import BaseModel


class MultipleChoiceQuestion(BaseModel):
    question: str
    answers: list[str]
