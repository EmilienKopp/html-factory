import EditorJS, { OutputData } from '@editorjs/editorjs';
import EJSConfig from "./ejs-config";
import EJSHtmlBuilder from "./ejs-html-builder";
import { Factory } from '../types/factory';

// Export the default EditorJS configuration object to be easily accessible for the user and to instatiate by default the EditorJS object
export const DefaultEditorConfig = EJSConfig.DefaultEditorConfig;

export class EJSFactory extends Factory {

    /**
     * EJSConfig object
     * @type {EJSConfig}
     * @memberof EJSFactory
     */
    EJSConfig;

    /**
     * EditorJS object 
     * @type {EditorJS}
     * @memberof EJSFactory
     */
    baseEditor;

    /**
     * ID of the HTML Element to render the editor in
     * @type {string}
     * @memberof EJSFactory
     * @default "editorjs"
     */
    holder = DefaultEditorConfig.holder;

    /**
     * Array of tools activated in the editor
     * @type {string[]}
     * @memberof EJSFactory
     */
    tools;

    /**
     * Promise that resolves when the editor is ready.
     * Accessing the EditorJS.isReady property.
     * @type {Promise<void>}
     * @memberof EJSFactory
     */
    isReady = () => { return this.baseEditor.isReady; }

    /**
     * Blocks are objects that represent the blocks of the editor.
     * Accessing the EditorJS.blocks property.
     * @type {Promise<void>}
     * @memberof EJSFactory
     */
    blocks = () => { return this.baseEditor.blocks; }
    
    /**
     * Store the JSON string representing the blocks of the editor
     * @type {string}
     * @memberof EJSFactory
     */
    JSONstring;

    /**
     * Store the static HTML string representing the blocks of the editor
     * @type {string}
     * @memberof EJSFactory
     */
    HTMLstring;

    /**
     * Root API Endpoint
     * @param {string} endpoint Endpoint of the API
     * @memberof EJSFactory
     */
    APIendpoint;

    /**
     * Constructor of the EJS class
     * @issue Might encounter a conflict between the tools[] array provided and the tools configured in the property object.
     * Which should be prioritized?
     * @param {string} holder  ID of the HTML Element to render the editor in 
     * @param {string[]} tools  Array of tools activated in the editor
     * @param {object} config  EditorJS configuration object
     * @memberof EJSFactory
     */
    constructor (holder, tools = [], config = DefaultEditorConfig) {
        super(...arg);
        this.holder = holder;
        this.tools = tools;

        // Initialize the EJSConfig object with the holder and tools list
        this.EJSConfig = new EJSConfig(holder, tools);

        // Initialize the EditorJS object with the EJSConfig object
        this.baseEditor = new EditorJS(this.EJSConfig.EditorConfig);

        // Verify whether the elements defined by the tools array match the properties of the config object
        this.EJSConfig.EJSToolList.forEach(tool => {
            if (tool.active && !config.tools[tool.configName]) {
                throw new Error(`The tool ${tool} is not defined in the config object.`);
            }
        });
    }

    /**
     * Call the checker property of the Editor's readiness, returning a Promise to work on when the Editor is ready.
     * @returns {Promise<void>} To resolve when the editor is ready
     * @memberof EJSFactory
     */
     isReady() {
        return this.isReady;
    }

    /**
     * Accessor of the blocks property of the EditorJS class.
     * @returns {object} A block object reprenting the blocks of the editor
     * @memberof EJSFactory
     */
    getBlocks() {
        return this.blocks;
    }

    /**
     * Overrides the configuration of the editor with a custom configuration object.
     * @param {object} config EditorJS configuration object
     * @memberof EJSFactory
     */
    setConfig(config) {
        this.EJSConfig.EditorConfig = config;
        this.baseEditor = new EditorJS(config);
    }

    /**
     * Call the save() method of the editor and return a Promise containing an OutputData object.
     * @returns Promise<OutputData>
     * @memberof EJSFactory
     */
    saveEditorData() {
        return this.baseEditor.save();
    }

    /**
     * Take the JSON representation of the editor and render the Editor with it.
     * @param {string} data JSON formatted string 
     * @returns method from the EditorJS class
     * @memberof EJSFactory
     */
    renderEditor(data) {
        var editorDataObject = new OutputData();
        editorDataObject = JSON.parse(data);
        this.blocks = this.baseEditor.blocks;

        return this.baseEditor.blocks.render(editorDataObject);
    }

    /**
     * Take the JSON representation of the editor and render static HTML with it.
     * @param {string} data JSON formatted string
     * @returns Static HTML content
     * @memberof EJSFactory
     */
    renderHTML(json) {
        return EJSHtmlBuilder.JSONtoHTMLstring(json);
    }
}
