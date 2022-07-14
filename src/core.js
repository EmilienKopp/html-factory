/**
* @file Core.js - The core of the HtmlFactory package.
* @author Emilien Kopp <emilien.kopp@gmail.com>
* @version 0.0.1
*/

import EditorType from './types/editor-type.js';
import { EJSFactory, DefaultEditorConfig } from './ejs/ejs-factory.js';

/**
* HTML Factory Class - serves as a wrapper for WYSIWYG editors and facilitates rendering into HTML.
*/
export default class HtmlFactory {

    /**--------------------------------------------
        Properties
    --------------------------------------------**/

    /**
     * RawData property - string of data representing the clean data gotten from the editor
     * @type {string}
     * @memberof HtmlFactory
     */
    rawData;

    /**
     * HTML property - string storing the latest HTML data
     * @type {string}
     * @memberof HtmlFactory
     */
     HTML;

     /**
     * OutputData property - Object return by the editor (if any).
     * @type {object}
     * @memberof HtmlFactory
     */
    outputData;

    /**
     * editorType property - the type of editor to use
     * @type {EditorType} enum-like class of editor types recognized by the factory
     * @memberof HtmlFactory
     */
    editorType;

    /**
     * factory property - the underlying factory object, built based on the editor type
     * @type {object}
     * @memberof HtmlFactory
     */
    factory; 

    /**
     * _module property - the module object, containing the imported editor class
     * @type {object}
     * @memberof HtmlFactory
     */
    _module;

    /**
     * container property - the HTML element ID to render the editor and/or the HTML in.
     * References the HtmlFactory property container.
     * @type {string}
     * @memberof HtmlFactory
     */
    container = this.factory.holder;

    /**
     * editor property - the underlying editor object
     * @type {object}
     * @memberof HtmlFactory
     */
    editor = this.factory.baseEditor;

    /**
     * tools property - an arry of tools to be used by the editor (if any).
     * References the tools property of the factory object
     * @type {string[]}
     * @memberof HtmlFactory
     */
    tools = this.factory.tools;

    /**
     * config property - the config object user by the editor (if any).
     * References the config property of the factory object
     * @type {object}
     * @memberof HtmlFactory
     */
    config = this.factory.config;

    constructor(type = '', container = '', tools = [], config = {}) {
        this.editorType = type;
        this.container = container;
        switch (type) {
            case EditorType.EJS:
            default:
                const module = (import('./ejs/ejs-factory'));
                this._module = module;
                this.factory = new EJSFactory(container, tools, config);
                break;
        }
    }


    /**--------------------------------------------
        Methods
    --------------------------------------------**/

    /**
     * Sets the raw data to be converted to HTML.
     * @param {string} str string representing the raw data
     * @returns {this} HtmlFactory object instance, so that the method can be chained
     */
    from(str) {
        this.rawData = str;
        return this;
    }

    /**
     * Render the raw data to HTML into the container element defined by the HtmlFactory property container
     * or a different element passable as a parameter, then store the HTML in the HtmlFactory property HTML.
     * @param {string} data string representing the raw data. If not passed, the raw data is taken from the HtmlFactory property rawData.
     * @param {string} container string representing the HTML element ID to render the HTML in. If not passed, the HTML is rendered in the HtmlFactory property container.
     * @returns {this} HTML string
     */
    html(data = this.rawData, container = null) {
        this.HTML = this.factory.renderHTML(data);
        var targetElement = container || this.container;
        document.getElementById(targetElement).innerHTML = this.HTML;
        return this.HTML;
    }

    /**
     * Render the editor in editable mode.
     * @param {object} data object representing the editor data. If not passed, the data is taken from the HtmlFactory property outputData.
     * @param {string} container string representing the HTML element ID to render the editor in. If not passed, the editor is rendered in the HtmlFactory property container.
     */
    renderEditor(editorData = this.outputData, container = null) {
        this.container = container || this.container;
        this.factory.renderEditor(editorData);
    }

    /**
     * Save the content of the editor into the HtmlFactory property rawData.
     * @returns {Promise<object>} Promise object containing the output data of the editor.
     * @memberof EJSFactory
     */
    save() {
        this.factory.saveEditorData().then(data => { this.outputData = data; });
        return this.factory.saveEditorData();
    }


     /**--------------------------------------------
        Getters / Setters
    --------------------------------------------**/

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
    
    /**
     * Set the config property
     * @param {object} config object containing the config properties
     */
    set config(config) {
        this.config = config;
    }

    /**
     * Get the config property
     * @returns {object} config object containing the config properties
     * @memberof EJSFactory
     */
    get config() {
        return this.config;
    }



}

