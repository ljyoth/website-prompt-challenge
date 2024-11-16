from .ai.openrouter import LlamaPrompter
from os import getenv


def main():
    api_key = getenv("OPENROUTER_API_KEY")
    prompter = LlamaPrompter(api_key)
    print(prompter.prompt("https://apple.com"))
