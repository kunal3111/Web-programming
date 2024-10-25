import json

# Load the data from the JSON fileexit
def load_data(json_file):
    with open(json_file, 'r') as file:
        return json.load(file)

# Extract and sanitize street names
def sanitize_street_names(data):
    list_intersections = [el['properties']['INTERSECTION'] for el in data['features']]
    lst_street_names = set(name.strip().lower() for intersection in list_intersections for name in intersection.replace('&', '/').replace('@', '/').split('/'))
    lst_to_sanitize = {name for name in lst_street_names if '/' in name}
    sanitized = set(name.strip() for name in '/'.join(lst_to_sanitize).split('/'))
    return sorted(lst_street_names - lst_to_sanitize | sanitized)

# Main execution
def main():
    json_file = 'Red_Light_Camera_Violations_2023.geojson'
    data = load_data(json_file)
    listOfStreets = sanitize_street_names(data)
    print(listOfStreets)

if __name__ == "__main__":
    main()
