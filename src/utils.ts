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


export function getXbyX(num: number) : boolean[][] {
    const array = [];
    
    for (let i = 0; i < num; i++) {
        const row = [];
        for (let j = 0; j < num; j++) {
            row.push(false);
        }
        array.push(row);
    }
    return array;
}

