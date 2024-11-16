import json

from openai import OpenAI
from .types import MultipleChoiceQuestion


class LlamaPrompter:
    def __init__(self, api_key) -> None:
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
        )

    def prompt(self, url: str) -> MultipleChoiceQuestion:
        schema = json.dumps(MultipleChoiceQuestion.model_json_schema())
        completion = self.client.chat.completions.create(
            model="meta-llama/llama-3.2-90b-vision-instruct:free",
            messages=[
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": f"You are a website navigation assitant that when prompted a website, generates a multiple choice question that help categorize users visiting the site. The response should be in JSON following the schema: {schema}",
                        }
                    ],
                },
                # {"role": "assistant", "content": []},
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": f"Create a multiple choice question that narrows content for {url}.",
                        },
                    ],
                },
            ],
        )
        data = completion.choices[0].message.content
        if data is None:
            data = ""
        question = MultipleChoiceQuestion.model_validate_json(data)
        return question
