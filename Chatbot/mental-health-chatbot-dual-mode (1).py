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
use_voice_input = True   # Flag to control voice input
use_voice_output = True  # Flag to control voice output

def speak(audio):
    print(audio)
    if use_voice_output:
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
    
    speak(f"{greeting}, {user_name}. I'm Zappy. I'm your mental health companion. How are you feeling today?")

def take_command():
    '''Takes microphone input from user and returns string output'''
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        # Add ambient noise adjustment
        r.adjust_for_ambient_noise(source, duration=1)
        # Increase pause threshold
        r.pause_threshold = 1.5
        r.energy_threshold = 300  # Adjust based on your environment
        try:
            audio = r.listen(source, timeout=5)
        except sr.WaitTimeoutError:
            print("No speech detected within timeout period")
            return "None"

    try:
        print("Recognizing...")
        # Fix the language parameter
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")
        
    except sr.UnknownValueError:
        print("Sorry, I couldn't understand what you said")
        return "None"
    except sr.RequestError:
        print("Could not request results from Google Speech Recognition service")
        return "None"
    except Exception as e:
        print(f"Error: {e}")
        print("Say that again please")
        return "None"
    return query

def get_input():
    """Get input from either speech or text based on current mode"""
    if use_voice_input:
        query = take_command()
        if query == "None":
            print("Speech recognition failed. Type your message instead: ")
            query = input("You: ")
    else:
        # Text-only mode
        query = input("You: ")
    return query.lower()

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
        return
    
    # Generate response based on detected emotion
    response = random.choice(responses[emotion])
    speak(response)
    
    # If we've had multiple interactions, offer additional support
    if len(session_emotions) > 3:
        frequent_emotion = max(set(session_emotions), key=session_emotions.count)
        if frequent_emotion in ["stress", "anxiety", "depression"]:
            follow_up = "I've noticed you've been mentioning feeling this way frequently. Would you like to talk about some coping strategies or resources that might help?"
            speak(follow_up)

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

def grounding_exercise():
    '''Guide user through a 5-4-3-2-1 grounding exercise'''
    speak("Let's do a grounding exercise to help you feel more present.")
    speak("This is called the 5-4-3-2-1 technique.")
    speak("First, notice 5 things you can see around you.")
    speak("Take your time... What 5 things can you see?")
    
    # Pause to allow user to look around
    if use_voice_output:
        engine.runAndWait()
        import time
        time.sleep(5)
    
    speak("Now, notice 4 things you can touch or feel.")
    speak("This could be the texture of your clothes, the chair you're sitting on, or the temperature in the room.")
    
    if use_voice_output:
        engine.runAndWait()
        import time
        time.sleep(4)
    
    speak("Next, notice 3 things you can hear.")
    speak("Maybe it's the hum of a fan, people talking outside, or your own breathing.")
    
    if use_voice_output:
        engine.runAndWait()
        import time
        time.sleep(3)
    
    speak("Now, notice 2 things you can smell.")
    speak("If you can't smell anything, think of two scents you enjoy.")
    
    if use_voice_output:
        engine.runAndWait()
        import time
        time.sleep(2)
    
    speak("Finally, notice 1 thing you can taste.")
    speak("If you can't taste anything, think of a flavor you enjoy.")
    
    if use_voice_output:
        engine.runAndWait()
        import time
        time.sleep(1)
    
    speak("How are you feeling now? A bit more grounded?")

def display_menu():
    '''Display options menu'''
    print("\n" + "="*50)
    print("Mental Health Chatbot - Available Commands:")
    print("  'text mode' - Switch to text input mode")
    print("  'voice mode' - Switch to voice input mode")
    print("  'mute' - Turn off voice responses")
    print("  'unmute' - Turn on voice responses")
    print("  'breathing' - Start a guided breathing exercise")
    print("  'grounding' - Start a grounding exercise")
    print("  'resources' - Get mental health resources")
    print("  'my name is [your name]' - Set your name")
    print("  'menu' - Show this menu")
    print("  'clear' - Clear the console")
    print("  'exit' or 'goodbye' - End the conversation")
    print("="*50 + "\n")

def main():
    global use_voice_input, use_voice_output, user_name
    
    # Clear console and display welcome message
    os.system('cls' if os.name == 'nt' else 'clear')
    print("="*50)
    print("Welcome to Mental Health Chatbot")
    print("="*50)
    display_menu()
    
    greet_user()
    
    # Create resources file if it doesn't exist
    if not os.path.exists('mental_health_resources.json'):
        create_mental_health_resources()
    
    while True:
        query = get_input()
        
        # Mode switching commands
        if query == "text mode":
            use_voice_input = False
            speak("Switched to text input mode. I'll now accept text input only.")
            continue
            
        elif query == "voice mode":
            use_voice_input = True
            speak("Switched to voice input mode. I'll now listen for your voice.")
            continue
            
        elif query == "mute":
            use_voice_output = False
            print("Voice responses turned off. I'll respond with text only.")
            continue
            
        elif query == "unmute":
            use_voice_output = True
            speak("Voice responses turned on. I'll speak my responses again.")
            continue
            
        elif query == "menu":
            display_menu()
            continue
            
        elif query == "clear":
            os.system('cls' if os.name == 'nt' else 'clear')
            display_menu()
            continue
            
        # Exit commands
        elif 'goodbye' in query or 'bye' in query or 'exit' in query:
            speak("Thank you for talking with me today. Remember to be kind to yourself. Goodbye.")
            break
        
        # Feature commands
        elif 'breathing' in query or 'breath' in query:
            breathing_exercise()
        
        elif 'grounding' in query:
            grounding_exercise()
        
        elif 'resources' in query or ('help' in query and 'resources' in query):
            speak("I've created a file with mental health resources for you. Would you like me to open it?")
            response = get_input()
            if 'yes' in response or 'sure' in response:
                try:
                    # Try to open the file with the default application
                    if os.name == 'nt':  # Windows
                        os.system('start mental_health_resources.json')
                    elif os.name == 'posix':  # Mac/Linux
                        os.system('open mental_health_resources.json')
                except:
                    speak("I couldn't open the file automatically. Please look for 'mental_health_resources.json' on your computer.")
        
        # Name setting
        elif 'my name is' in query:
            user_name = query.split('my name is')[1].strip()
            speak(f"Thank you, {user_name}. I'll remember that.")
        
        # Process general queries
        else:
            get_response(query)

if __name__ == "__main__":
    # Ask user for preferred mode
    print("Welcome to Mental Health Chatbot!")
    print("Choose your preferred mode:")
    print("1. Full voice mode (speak and listen)")
    print("2. Text input mode (type, but hear responses)")
    print("3. Text-only mode (no voice input or output)")
    
    choice = input("Enter 1, 2, or 3: ")
    
    if choice == "2":
        use_voice_input = False
        use_voice_output = True
        print("Using text input with voice output mode.")
    elif choice == "3":
        use_voice_input = False
        use_voice_output = False
        print("Using text-only mode.")
 