# Morse code dictionary for characters and numbers
morse_code_dict = {
    'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 
    'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 
    'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 
    'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 
    'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 
    'z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', 
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', 
    '8': '---..', '9': '----.'
}


def convert_to_morse(sentence):
   list1 = []
   filtered = ''.join(char.lower() for char in sentence if char in morse_code_dict.keys())
   for char in filtered:
       list1.append(morse_code_dict[char])
   return list1


print(convert_to_morse(input("Enter a sentence: ")))  

           
