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
    "What is absurd about this?",
    "What is a problem (and potential solution) with this?",
    "What are the amplifiers here?",
    "What are the verb techniques here?",
    "What are the noun techniques here?",
    "What are the intent techniques here?",
    "What is the like/twist question here?",
]