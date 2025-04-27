
from .natalie import getNataliesOpinion


def testMethod(message):
    # print("testMethod")
    # print(message)
    
    test = getNataliesOpinion(message)
    if message == '':
        test = "Natalie is not available right now. Please try again later."

    return test

