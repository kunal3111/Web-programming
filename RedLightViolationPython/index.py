import json

def prepare_street_name(name):
    """Prepare the street name with the first character in uppercase and the rest in lowercase."""
    return name.capitalize()

def find_street_violations(street_name, data):
    """Simulate finding the street violations in the data."""
    simulated_violations = {
        'Montreal': {'January': 26, 'February': 56, 'March': 23, 'April': 45, 'May': 67, 'June': 54, 'July': 38, 'August': 49, 'September': 51, 'October': 60, 'November': 42, 'December': 'TBD'}
    }
    
    if street_name in simulated_violations:
        return simulated_violations[street_name]
    else:
        return None

def main():
    ListOfStreets = ['135m s of hazeldean', '155m w of bank', '195m w of iroquois', 'Albert', 'Albion', 'Anand', 'Arlington', 'Aviation parkway', 'Bank', 'Baseline', 'Bay', 'Bay st', 'Belfast', 'Berrigan', 'Besserer', 'Blair', 'Booth', 'Brittany', 'Bronson', 'Cahill', 'Campeau', 'Carling', 'Carp', 'Catherine', "Catherine & o'connor", 'Cedarview', 'Champlain', 'Charlemagne', 'Coldrey', 'Commissioner', 'Conroy', 'Cope', 'Coventry', 'Cyrville', 'Don ried', 'Downpartick', 'Duford', 'Eagleson', 'Elgin', 'Elgin st', 'Fairlawn', 'Fallowfield', 'Fisher', 'Fortune', 'Gladstone', 'Glebe', 'Glenhaven', 'Greenbank', 'Haig', 'Hawthorne', 'Hazeldean', 'Heron', 'Hogs back', 'Holland & island park', 'Holly acres', 'Hunt club', 'Hwy 417 wb', 'Hwy 417 wb on ramp', 'Innes', 'Iroquois', 'Island park', "Jeanne d'arc", 'Jefferson', 'Jockvale', 'Johnston', 'Kent', 'King edward', 'Kirkwood', 'Leitrim', 'Lorry greenberg', 'Lyon', 'March', 'Mccarty', 'Meadowlands', 'Merivale', 'Montreal', 'Murray', 'Navan', 'Ncc driveway', "O'connor st", 'Ogilvie', 'Old tenth line', 'Orleans', "Place d'orleans", 'Powell', 'Presland', 'Pretoria bridge', 'Prince of wales', 'Queen elizabeth', 'Regional rd 174 w.', 'Renaud', 'Richardson side', 'Richmond', 'Rideau', 'Riverside', 'Riverside n', 'Riverside n. (rr19)', 'Riverside s.', 'Robertson', 'Rochester', 'Russell', 'Ryder', 'Saunderson', 'Slater', 'Slater st', 'Smyth', 'St joseph', 'St laurent', 'St-laurent', 'St. andrew', 'St. joseph', 'St. laurent', 'St. patrick', 'Strandherd', 'Sussex', 'Tenth line', 'Terry fox', 'Tompkins', 'Vanguard', 'Vanier parkway', 'Vineyards', 'Walkey', 'Walkley', 'Wellington (rr40)', 'Wellington st', 'Wessex']
    
    while True:
        street_name_input = input("Name of the street (x to exit)? ")
        if street_name_input.lower() == 'x':
            break
        
        street_name = prepare_street_name(street_name_input)
        if street_name not in ListOfStreets:
            print("Street not found")
            continue
        
        violations = find_street_violations(street_name, None)  # None is passed as we're simulating data retrieval
        if violations:
            print(f"\nAll Red light violations on {street_name} street/road:")
            for month, count in violations.items():
                print(f"{month}: {count}")
            print("Total violations:", sum([count for month, count in violations.items() if month != 'December']))
        else:
            print("No data available for this street.")
        
main()


