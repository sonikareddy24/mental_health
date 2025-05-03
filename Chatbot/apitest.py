import pyttsx3
import datetime
import speech_recognition as sr
import os
import google.generativeai as genai

# Initialize text-to-speech engine
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

# Configure Gemini API
# Replace with your actual API key
genai.configure(api_key="AIzaSyC9Y22Y0mWaX6QHstBUMqlzDxvY_5Injls")

def speak(audio):
    print(audio)
    engine.say(audio)
    engine.runAndWait()

def take_command():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.adjust_for_ambient_noise(source, duration=1)
        r.pause_threshold = 1.5
        try:
            audio = r.listen(source, timeout=5)
        except sr.WaitTimeoutError:
            print("No speech detected within timeout period")
            return "None"
        
        try:
            print("Recognizing...")
            query = r.recognize_google(audio, language='en-in')
            print(f"User said: {query}\n")
        except sr.UnknownValueError:
            print("Sorry, I couldn't understand.")
            return "None"
        except sr.RequestError:
            print("Speech recognition service error.")
            return "None"
        return query.lower()

def get_text_input():
    return input("You: ").strip().lower()
def get_gemini_response(prompt):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")  # Corrected model name
        response = model.generate_content(prompt)  # Removed unnecessary list brackets
        return response.text
    except Exception as e:
        print(f"Error: {e}")
        return "I'm sorry, I couldn't process your request at the moment. Try again later."

def chat():
    speak("Hello! How was your day?")
    
    while True:
        print("Choose input mode: 1 for Voice, 2 for Text")
        mode = input("Enter 1 or 2: ").strip()
        
        if mode == "1":
            query = take_command()
        elif mode == "2":
            query = get_text_input()  # Fixed: was incorrectly calling get_gemini_response
        else:
            print("Invalid choice. Please enter 1 or 2.")
            continue
        
        if not query or query == "None":
            continue
        
        if "exit" in query or "bye" in query:
            speak("Take care! I'm here whenever you need me.")
            break
        
        response = get_gemini_response(query)
        speak(response)

if __name__ == "__main__":
    chat()