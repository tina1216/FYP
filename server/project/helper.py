from server.project.app import Elections

class ElectionsHelper:
  def add_dummy_election_data(seed_data):
    for data in seed_data: 
      election_obj = Elections(*data) 
      election_obj.create() 
    print("Successfully Added to Elections")

  def print_all_data():
    election_list = Elections.print_all_elections() 
    for election in election_list:
        print(f"Election Name : {election.electionName} ,  Address : {election.electionStatus}") 
    if len(election_list) == 0: 
        print("No Record Found")