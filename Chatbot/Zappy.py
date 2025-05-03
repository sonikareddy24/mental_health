import pyttsx3
import datetime
import speech_recognition as sr
import wikipedia
import webbrowser
import os


engine = pyttsx3.init('sapi5')
voices= engine.getProperty('voices') 
engine.setProperty('voice', voices[0].id)
#print(voices[0].id)

def speak(audio):
    pass

def speak(audio):
    engine.say(audio) 
    engine.runAndWait() 

def whishMe():
    hour = int(datetime.datetime.now().hour)
    if hour >=0 and hour<12:
        speak("Good Morning")
    elif hour>=12 and hour<18:
        speak("Good Afternoon")
    else:
        speak("Good Evening")
    speak("Hello I am Zappy. How can I help you?")



def takeCommand():
    ''' It takes microphone input from user
    and return s strign output '''
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1#seconds of non speaking duration before a pharase is considered complete
        audio = r.listen(source)

    try:
        print("Recognizing....")
        query = r.recognize_google(audio,language='en=in')
        print(f"User said: {query}\n")
        
    except Exception as e:
        #print(e)
        print("Say that again please")
        return "None"
    return query


if __name__=="__main__" :
    whishMe()
    while True:
        query = takeCommand().lower()
        #Logic for executing tasks based on query

        if 'wikipedia' in query:
            speak('Searching Wikipedia....')
            query = query.replace("Wikipedia"," ")
            results = wikipedia.summary(query,sentences=2)
            speak("According to Wikipedia")
            speak(results)
            print(results)

        elif 'open youtube' in query:
            webbrowser.open("youtube.com")

        elif 'open google' in query:
            webbrowser.open("google.com")
        
        elif 'open stackoverflow' in query:
            webbrowser.open("stackoverflow.com")

        elif 'the time' in query:
            strTime = datetime.datetime.now().strftime("%H:%M:%S")    
            speak(f"The time is {strTime}")
