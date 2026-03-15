from flask import Flask, request, jsonify
from flask_cors import CORS
from bot_manager import get_response, BOT_CONFIGS
import os
import json
import uuid
from datetime import datetime

app = Flask(__name__)
# Allow all origins to support both local server (8000) and direct file opening (null origin)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/chat", methods=["POST"])
def chat():
    print("Received chat request...")
    try:
        data = request.get_json()
        bot_name = data.get("bot", "").strip().lower()
        history = data.get("history", [])

        if not bot_name or not history:
            return jsonify({"error": "Missing bot name or conversation history"}), 400

        reply = get_response(bot_name, history)
        return jsonify({"reply": reply})
    except Exception as e:
        print(f"Error in chat: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/bots", methods=["GET"])
def get_bots():
    return jsonify({k: {"welcome": v["welcome"]} for k, v in BOT_CONFIGS.items()})

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

STORIES_FILE = "stories.json"

def load_stories():
    try:
        if not os.path.exists(STORIES_FILE):
            return []
        with open(STORIES_FILE, "r") as f: 
            return json.load(f)
    except: 
        return []

def save_stories(stories):
    with open(STORIES_FILE, "w") as f: 
        json.dump(stories, f, indent=2)

@app.route("/api/stories", methods=["GET"])
def get_stories():
    return jsonify(load_stories())

@app.route("/api/stories", methods=["POST"])
def post_story():
    try:
        data = request.get_json()
        required = ["title", "body", "tags"]
        if not all(k in data for k in required):
            return jsonify({"error": "Missing fields"}), 400
            
        story = {
            "id": str(uuid.uuid4()),
            "title": data["title"][:80],
            "body": data["body"][:800],
            "tags": data.get("tags", [])[:5],
            "bot": data.get("bot", None),
            "anonymous": data.get("anonymous", True),
            "author": "A Bridges member" if data.get("anonymous", True) else data.get("author", "Anonymous").strip(),
            "helpful": 0,
            "created_at": datetime.utcnow().isoformat()
        }
        stories = load_stories()
        stories.insert(0, story)
        save_stories(stories)
        return jsonify(story), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/stories/<story_id>/helpful", methods=["POST"])
def upvote_story(story_id):
    stories = load_stories()
    for s in stories:
        if s["id"] == story_id:
            s["helpful"] = int(s.get("helpful", 0)) + 1
            save_stories(stories)
            return jsonify({"helpful": s["helpful"]})
    return jsonify({"error": "Not found"}), 404

if __name__ == "__main__":
    app.run(port=5000, debug=True)