from flask import Flask, jsonify
# from flask_sqlalchemy import SQLAlchemy
from models import db, Elections
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@127.0.0.1/he_voting"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# db = SQLAlchemy(app)
db.init_app(app)

ma = Marshmallow(app)

with app.app_context():
    db.create_all()

class ElectionSchema(ma.Schema):
  class Meta:
    fields = ("id", "electionName", "electionStatus")

election_schema = ElectionSchema()
elections_schema = ElectionSchema(many=True)


# -----------------------------------
@app.route("/result", methods=["GET"])
def get_results():
  # all_results = Elections.query.all()
  return jsonify({"Hello":"World"})

if __name__ == "__main__":
  app.run(debug=True)