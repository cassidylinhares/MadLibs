export const fillStory = (story, blanks) => {
    let words = story.split(' ');
    let blanksTemp = [...blanks];

    for(let i=0; i < words.length; i++){
        if(words[i].includes('_')) {
            let filled = words[i].replace('_', blanksTemp.shift());
            words[i] = filled;
        }
    }

    return words.join(' ');
}