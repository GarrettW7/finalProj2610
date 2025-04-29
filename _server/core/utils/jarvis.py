# Import the required module for text 
# to speech conversion
from gtts import gTTS

# This module is imported so that we can 
# play the converted audio
import os
import subprocess

from groq import Groq
import os

def speechToText(inputText):
    language = 'en'
    myobj = gTTS(text=inputText, tld= 'co.uk', lang=language, slow=False)
    myobj.save("response.mp3")
    subprocess.run(["ffplay", "-nodisp", "-autoexit", "response.mp3"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)



client = Groq(api_key=os.environ.get('GROQ_API_KEY'))


def getJarvisOpinion(message):

    chat_completion = client.chat.completions.create(
        #
        # Required parameters
        #
        messages=[
            # Set an optional system message. This sets the behavior of the
            # assistant and can be used to provide specific instructions for
            # how it should behave throughout the conversation.
            {
                "role": "system",

                "content": 
                """
                Your name is jarvis. You are iron mans sidekick but are here to help us normal people.
                You often reference your time with iron man and the lessons you learned from him.
                You also keep your responses short and to the point, no more than a few sentences.
                """

            },
            # {
            #     "role": "system",
            #     "content": "The chat history so far is: " + history
            # },
            # Set a user message for the assistant to respond to.
            {
                "role": "user",
                "content": f"{message}"
            }
        ],

        # The language model which will generate the completion.
        model="llama-3.3-70b-versatile",

        #
        # Optional parameters
        #

        # Controls randomness: lowering results in less random completions.
        # As the temperature approaches zero, the model will become deterministic
        # and repetitive.
        temperature=.9,

        # The maximum number of tokens to generate. Requests can use up to
        # 32,768 tokens shared between prompt and completion.
        max_completion_tokens=1024,

        # Controls diversity via nucleus sampling: 0.5 means half of all
        # likelihood-weighted options are considered.
        top_p=1,

        # A stop sequence is a predefined or user-specified text string that
        # signals an AI to stop generating content, ensuring its responses
        # remain focused and concise. Examples include punctuation marks and
        # markers like "[end]".
        stop=None,

        # If set, partial message deltas will be sent.
        stream=False,
    )

    # Print the completion returned by the LLM.
    jarvisesResponse = chat_completion.choices[0].message.content
    speechToText(jarvisesResponse)
    print(jarvisesResponse)
    # print(chat_completion.choices[0].message.content)
    return f"system:{jarvisesResponse}"

