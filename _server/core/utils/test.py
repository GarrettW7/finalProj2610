
from .natalie import getNataliesOpinion


def testMethod(message):
    # print("testMethod")
    
    test = getNataliesOpinion(message)
    if message == '':
        test = "Natalie is not available right now. Please try again later."
        return 'Please enter something'

    return test

