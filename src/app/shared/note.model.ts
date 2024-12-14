import { v4 as uuidv4 } from 'uuid';

export class Note {
    splice() {
      throw new Error('Method not implemented.');
    }
    findIndex() {
      throw new Error('Method not implemented.');
    }
    push() {
      throw new Error('Method not implemented.');
    }
    find() {
      throw new Error('Method not implemented.');
    }
    id: string
    title: string
    content : string

    constructor(title: string, content: string) {
        this.id = uuidv4()
        this.title = title
        this.content = content
    }
}

