from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

# from models import db, Elections


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@localhost/he_voting"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Elections(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  electionName = db.Column(db.String(100), nullable=False)
  electionStatus = db.Column(db.String(20), nullable=False)

  def __init__(self, electionName, electionStatus):
    self.electionName = electionName
    self.electionStatus = electionStatus

with app.app_context():
  db.create_all()

@app.route("/result", methods=["GET"])
def get_results():
  all_results = Elections.query.all()
  return jsonify({"Hello": "World"})

if __name__ == "__main__":
  app.run(debug=True)