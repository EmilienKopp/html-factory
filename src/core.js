import { EditorType } from './types/editor-type';

export class HtmlFactory {

    // Properties
    rawData; // JSON Data
    blueprint; // Object Structure
    target; // HTML Element
    editor = () => { return this.factory.baseEditor; }
    editorType; // Type of the editor. Currently EditorJS only is supported in v. 0.0.1
    factory; // Factory object depends on the editor type
    _module;

    constructor(type) {
        this.editorType = type;
        switch (type) {
            case EditorType.EJS:
            default:
                const module = (await import('./ejs/ejs-factory')).then(mod => mod.default);
                this._module = module;
                this.factory = new EJS();
                break;
        }
    }

    /**
     * Sets the raw data to be converted to HTML
     * @param {string} str string representing the raw data
     */
    from(str) {
        this.rawData = str;
    }

    /**
     * Render the raw data to HTML
     * @param {string} data string representing the raw data
     * @returns {string} string representing the HTML
     */
    render(data = this.rawData) {
        return this.factory.renderHTML(data);
    }

    /**
     * Access the factory object
     * @returns {object} factory object based on given editor
     */
    get factory() {
        return this.factory;
    }

    /**
     * Access the editor object
     * @returns {object} editor object based on given editor
     */
    get editor() {
        return this.editor;
    }
    
}

