import { words } from "@root/config/wordlist/pt-BR";

class Wordlist {
  public getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  public getWordlist() {
    return words;
  }
}

export default new Wordlist();
