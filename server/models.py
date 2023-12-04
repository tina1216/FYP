from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Elections(db.Model):
  electionId = db.Column(db.Integer, primary_key=True)
  electionName = db.Column(db.String(100), nullable=False)
  electionStatus = db.Column(db.String(20), nullable=False)

  def __init__(self, electionName, electionStatus):
    self.electionName = electionName
    self.electionStatus = electionStatus


class Voters(db.Model):
  votersId = db.Column(db.Integer, primary_key=True)
  hasVoted = db.Column(db.Boolean, default=False, nullable=False)

  def __init__(self, hasVoted):
    self.hasVoted = hasVoted


class Choices(db.Model):
  choiceId = db.Column(db.Integer, primary_key=True)
  electionId = db.Column(db.Integer, db.ForeignKey('elections.electionId'), nullable=False)
  choice = db.Column(db.Integer, db.ForeignKey('items.itemId'), nullable=False)


class Choices(db.Model):
  choiceId = db.Column(db.Integer, primary_key=True)
  electionId = db.Column(db.Integer, db.ForeignKey('elections.electionId'), nullable=False)
  choiceTitle = db.Column(db.String(20), nullable=False)
  choiceSubTitle = db.Column(db.String(20), nullable=True)

class Votes(db.Model):
  voteId = db.Column(db.Integer, primary_key=True)
  electionId = db.Column(db.Integer, db.ForeignKey('elections.electionId'), nullable=False)
  encryptedVote = db.Column(db.String, nullable=False)


