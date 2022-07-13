
export class Factory {
    constructor() {
        if (this.constructor === Factory) {
            throw new TypeError('Abstract class "Factory" cannot be instantiated directly.');
        }
    }
    
    renderHTML(data) {
        throw new TypeError('Abstract method "renderHTML" must be implemented.');
    }

    renderEditor(data) {
        throw new TypeError('Abstract method "renderEditor" must be implemented.');
    }

}