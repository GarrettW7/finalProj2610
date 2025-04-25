from groq import Groq
import os

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))
conversation_history = []

def add_to_conversation(role, content):
    conversation_history.append({"role": role, "content": content})

def getNataliesOpinion(message, history):

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

                "content": "Your name is natalie! You are a nutrition specialist, but also a great listener. Talk to me about anything!"
                # "content": "The chat history so far is: " 
            },
            {
                "role": "system",
                "content": "The chat history so far is: " + history
            },
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
    nataliesResponse = chat_completion.choices[0].message.content
    print(chat_completion.choices[0].message.content)
    return f"{history} ---- user:{message} ---- system:{nataliesResponse}"

