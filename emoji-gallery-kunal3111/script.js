const $emojiGallery = document.getElementById('emoji_gallery');

function createEmojiItem(emoji) {
    const $emoji_item = document.createElement('div');
    $emoji_item.classList.add('emoji-item');

    const emojiCharacter = document.createElement('div');
    emojiCharacter.classList.add('char');
    emojiCharacter.textContent = emoji.char;

    const emojiName = document.createElement('div');
    emojiName.classList.add('nameofEmoji');
    emojiName.textContent = emoji.name;

    $emoji_item.appendChild(emojiCharacter);
    $emoji_item.appendChild(emojiName);

    return $emoji_item;
}

for (let i = 0; i < emoji.length; i++) {
    
    const emoji_objects = emoji[i];
    const emoji_Item = createEmojiItem(emoji_objects);
    $emojiGallery.appendChild(emoji_Item);
   
}