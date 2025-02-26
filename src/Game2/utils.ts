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
      return `2game${dim}-${index}`;
  }
  
  export const questions = [
      "Come up with a statement for this prompt",
      "Come up with three points, and riff off of the first one",
      "Find a synonym for this word by thinking about the qualities. Can be a combination of words",
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