from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Elections(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  electionName = db.Column(db.String(100), nullable=False)
  electionStatus = db.Column(db.String(20), nullable=False)
  votes = db.relationship("Votes", backref="elections")
  choices = db.relationship("Choices", backref="choices")

  def __init__(self, electionName, electionStatus):
    self.electionName = electionName
    self.electionStatus = electionStatus
  
  # def election_create(self):
  #   new_election = Elections(self.electionName, self.electionStatus)
  #   db.session.add(new_election) 
  #   db.session.commit()
  
  # def print_all_elections(): 
  #   election_data = Elections.query.all() 
  #   return election_data



class Voters(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  voterId = db.Column(db.String(20), nullable=False)
  voterPassword = db.Column(db.String(20), nullable=False)
  hasVoted = db.Column(db.Boolean, default=False, nullable=False)

  def __init__(self, voterId, voterPassword, hasVoted):
    self.voterId = voterId
    self.voterPassword = voterPassword
    self.hasVoted = hasVoted


class Choices(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  electionId = db.Column(db.Integer, db.ForeignKey('elections.id'), nullable=False)
  choiceTitle = db.Column(db.String(20), nullable=False)
  choiceSubTitle = db.Column(db.String(20), nullable=True)

  def __init__(self, choiceTitle, choiceSubTitle):
    self.choiceTitle = choiceTitle
    self.choiceSubTitle = choiceSubTitle


class Votes(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  electionId = db.Column(db.Integer, db.ForeignKey('elections.id'), nullable=False)
  encryptedVote = db.Column(db.String(120), nullable=False)

  def __init__(self, encryptedVote):
    self.encryptedVote = encryptedVote

