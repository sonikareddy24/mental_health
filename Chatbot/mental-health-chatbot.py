import pyttsx3
import datetime
import speech_recognition as sr
import webbrowser
import os
import random
import json

# Initialize text-to-speech engine
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

# Load mental health responses from JSON file
def load_responses():
    try:
        with open('mental_health_responses.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        # Create default responses if file doesn't exist
        default_responses = {
            "greetings": [
                "Hello, I'm here to support you. How are you feeling today?",
                "Hi there. I'm your mental health companion. How can I help you today?",
                "Welcome back. How has your day been so far?"
            ],
            "stress": [
                "I understand you're feeling stressed. Have you tried taking a few deep breaths?",
                "Stress can be overwhelming. Would you like to try a quick relaxation exercise?",
                "When you're stressed, it can help to focus on what you can control. Let's talk about that."
            ],
            "anxiety": [
                "Anxiety is challenging. Let's work through these feelings together.",
                "When you're feeling anxious, grounding exercises can help. Would you like to try one?",
                "I'm here to listen about your anxiety. Sometimes talking it out helps."
            ],
            "depression": [
                "Depression can make everything feel harder. Remember that you're not alone in this.",
                "Small steps can help with depression. What's one tiny positive thing you could do today?",
                "I'm here to support you through these feelings. Do you want to talk about what's happening?"
            ],
            "gratitude": [
                "Focusing on gratitude can be helpful. What's something you're grateful for today?",
                "Even in difficult times, finding small moments of gratitude can help shift perspective.",
                "Would you like to try a quick gratitude exercise together?"
            ],
            "self_care": [
                "Self-care is important. Have you taken some time for yourself today?",
                "What's one small thing you could do for self-care in the next hour?",
                "Remember that taking care of yourself isn't selfish, it's necessary."
            ],
            "resources": [
                "Would you like me to provide some mental health resources?",
                "There are professionals who can help. Would you like information about finding support?",
                "Sometimes talking to a professional can be very helpful. Would you like information about that?"
            ],
            "crisis": [
                "If you're in crisis, please reach out to a crisis helpline immediately. In the US, you can text HOME to 741741 or call 988.",
                "Your safety is the priority. Please contact emergency services or a crisis line if you're in immediate danger.",
                "If you're having thoughts of harming yourself, please call a crisis line right away. Would you like me to provide the number?"
            ],
            "unknown": [
                "I'm here to listen. Could you tell me more about what you're experiencing?",
                "I want to understand better so I can support you. Can you share more about that?",
                "I'm not sure I fully understand, but I'm here for you. Could you explain a bit more?"
            ]
        }
        # Save default responses to file
        with open('mental_health_responses.json', 'w') as file:
            json.dump(default_responses, file, indent=4)
        return default_responses

# Global variables
responses = load_responses()
user_name = "friend"
session_emotions = []

def speak(audio):
    engine.say(audio)
    engine.runAndWait()

def greet_user():
    hour = int(datetime.datetime.now().hour)
    if hour >= 0 and hour < 12:
        greeting = "Good Morning"
    elif hour >= 12 and hour < 18:
        greeting = "Good Afternoon"
    else:
        greeting = "Good Evening"
    
    speak(f"{greeting}, {user_name}. I'am Zappy, I'm your mental health companion. How are you feeling today?")
    print(f"{greeting}, {user_name}. I'am Zappy, I'm your mental health companion. How are you feeling today?")

def take_command():
    ''' It takes microphone input from user
    and return s strign output '''
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1#seconds of non speaking duration before a pharase is considered complete
        audio = r.listen(source)

    try:
        print("Recognizing....")
        query = r.recognize_google(audio,language='en-in')
        print(f"User said: {query}\n")
        
    except Exception as e:
        #print(e)
        print("Say that again please")
        return "None"
    return query


def identify_emotion(query):
    '''Simple emotion detection based on keywords'''
    query = query.lower()
    
    if any(word in query for word in ["stress", "stressed", "overwhelming", "pressure"]):
        return "stress"
    elif any(word in query for word in ["anxious", "anxiety", "nervous", "worry", "panic"]):
        return "anxiety"
    elif any(word in query for word in ["sad", "depressed", "depression", "hopeless", "unmotivated"]):
        return "depression"
    elif any(word in query for word in ["thank", "grateful", "appreciate", "thankful"]):
        return "gratitude"
    elif any(word in query for word in ["self-care", "break", "rest", "relax"]):
        return "self_care"
    elif any(word in query for word in ["help", "resource", "support", "therapist"]):
        return "resources"
    elif any(word in query for word in ["crisis", "suicide", "harm", "kill", "die", "end"]):
        return "crisis"
    else: 
        return "unknown"

def get_response(query):
    '''Generate appropriate response based on user input'''
    emotion = identify_emotion(query)
    
    # Save detected emotion to session history
    if emotion != "unknown":
        session_emotions.append(emotion)
    
    # If crisis is detected, always provide crisis response
    if emotion == "crisis":
        response = random.choice(responses["crisis"])
        speak(response)
        print(response)
        return
    
    # Generate response based on detected emotion
    response = random.choice(responses[emotion])
    speak(response)
    print(response)
    
    # If we've had multiple interactions, offer additional support
    if len(session_emotions) > 3:
        frequent_emotion = max(set(session_emotions), key=session_emotions.count)
        if frequent_emotion in ["stress", "anxiety", "depression"]:
            follow_up = "I've noticed you've been mentioning feeling this way frequently. Would you like to talk about some coping strategies or resources that might help?"
            speak(follow_up)
            print(follow_up)

def create_mental_health_resources():
    '''Create a file with mental health resources'''
    resources = {
        "Crisis Lines": {
            "US National Suicide Prevention Lifeline": "988 or 1-800-273-8255",
            "Crisis Text Line": "Text HOME to 741741",
            "International Association for Suicide Prevention": "https://www.iasp.info/resources/Crisis_Centres/"
        },
        "Apps": [
            "Calm - Meditation and Sleep",
            "Headspace - Meditation and Mindfulness",
            "Woebot - AI Cognitive Behavioral Therapy",
            "Moodfit - Mood Tracking and Mental Health Tools"
        ],
        "Self-Help Techniques": [
            "Deep breathing exercises",
            "Progressive muscle relaxation",
            "5-4-3-2-1 grounding technique",
            "Journaling thoughts and feelings",
            "Physical activity and movement"
        ]
    }
    
    with open('mental_health_resources.json', 'w') as file:
        json.dump(resources, file, indent=4)
    
    print("Mental health resources file created.")

def breathing_exercise():
    '''Guide user through a simple breathing exercise'''
    speak("Let's do a quick breathing exercise together.")
    speak("Find a comfortable position and relax your body.")
    speak("We'll breathe in for 4 counts, hold for 2, then exhale for 6.")
    
    for i in range(5):
        speak("Breathe in deeply through your nose. 1... 2... 3... 4...")
        speak("Hold. 1... 2...")
        speak("Now exhale slowly through your mouth. 1... 2... 3... 4... 5... 6...")
    
    speak("How are you feeling now?")

def main():
    greet_user()
    
    # Create resources file if it doesn't exist
    if not os.path.exists('mental_health_resources.json'):
        create_mental_health_resources()
    
    while True:
        query = take_command().lower()
        
        # Exit commands
        if 'goodbye' in query or 'bye' in query or 'exit' in query:
            speak("Thank you for talking with me today. Remember to be kind to yourself. Goodbye.")
            break
        
        # Special commands
        elif 'breathing' in query or 'breath' in query:
            breathing_exercise()
        
        elif 'resources' in query or 'help' in query:
            speak("I've created a file with mental health resources for you. Would you like me to open it?")
            response = take_command().lower()
            if 'yes' in response or 'sure' in response:
                try:
                    os.system('mental_health_resources.json')
                except:
                    speak("I couldn't open the file automatically. Please look for 'mental_health_resources.json' on your computer.")
        
        # Name setting
        elif 'my name is' in query:
            global user_name
            user_name = query.split('my name is')[1].strip()
            speak(f"Thank you, {user_name}. I'll remember that.")
        
        # Process general queries
        else:
            get_response(query)

if __name__ == "__main__":
    main()
