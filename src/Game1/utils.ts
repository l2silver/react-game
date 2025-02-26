export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}   

export function getRandomIndex<T>(arr: T[]): number {
    return Math.floor(Math.random() * arr.length)
  }

export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
  }

export function getXbyX<T>(num: number, valGen: ()=>T) : {[key: string]: T} {
    const doubleDic : {[key: string]: T} = {};
    
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            doubleDic[`${i}-${j}`] = valGen();
        }
    }
    return doubleDic;
}

export function genGameKey(dim: number, index: number) {
    return `${dim}-${index}`;
}

export const questions = [
    "What is an absurd explanation for this?",
    "What is a problem (and potential solution) with this?",
    "What are the amplifiers here?",
    "What are the verb techniques here?",
    "What are the noun techniques here?",
    "What is the intention -> why -> counter point techniques here?",
    "What are the adjective techniques here?",
    "What is the like/hate/twist question here?",
    "What is the therefor train here?",
    "What is the social awareness question here?",
    "What is the intention -> why -> counter point techniques here?",
]

export const initiators = [
  "conversation agree/disagree",
  "conversation clarify",
  "conversation third thought degree",
  "PIE",
]

export const qualities = [
  "Who/What",
  "image/location/time",
]

export const treaks = [
  "Blur",
  "Word generalize",
]

export const rhetorical = [
  "irony:contrast",
  "ridiculousness:misinterpret",
  "ridiculousness:min/max",
  "unseen:sarcasm",
  "exagerate",
  "distance",
  "metaphor",
]

export const ambiguousTechnique = [
  "negative-negative",
  "negative-positive",
  "negtive-quantity",
  "association",
  "negative-association",
  "modifier:amount"
]