from flask import Flask, jsonify, request
from models import db, Elections
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@127.0.0.1/he_voting"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)

ma = Marshmallow(app)

with app.app_context():
  db.create_all()


# Schema -----------------------------------
class ElectionSchema(ma.Schema):
  class Meta:
    fields = ("id", "electionName", "electionStatus")

election_schema = ElectionSchema()
elections_schema = ElectionSchema(many=True)


class VoterSchema(ma.Schema):
  class Meta:
    fields = ("id", "voterId", "voterPassword", "hasVoted")

voter_schema = VoterSchema()
voters_schema = VoterSchema(many=True)


class ChoiceSchema(ma.Schema):
  class Meta:
    fields = ("id", "electionId", "choiceTitle", "choiceSubTitle")

choice_schema = ChoiceSchema()
choices_schema = ChoiceSchema(many=True)


class VoteSchema(ma.Schema):
  class Meta:
    fields = ("id", "electionId", "encryptedVote")

vote_schema = VoteSchema()
votes_schema = VoteSchema(many=True)


# Route -----------------------------------
@app.route("/result", methods=["GET"])
def get_results():
  all_votes = Elections.query.all()
  results = elections_schema.dump(all_votes)
  return jsonify(results)


@app.route("/submit", methods=["POST"])
def submit_votes():
  electionName = request.json["electionName"]
  electionStatus = request.json["electionStatus"]

  election = Elections(electionName, electionStatus)
  print(election)
  db.session.add(election)
  db.session.commit()
  return election_schema.jsonify(election)


# -----------------------------------
if __name__ == "__main__":
  app.run(debug=True)