import EJSBlueprint from "./ejs-blueprint";
import * as Streamline from "../utils/streamline";

class EJSHtmlBuilder {

    // Properties
    rawData; // JSON Data
    blueprint = new EJSBlueprint(); // Object Structure
    target; // HTML Element

    // Construct from a JSON object
    constructor(str, element) {
        this.rawData = str;
        if (Streamline.isJSON(str)) {
            this.blueprint = JSON.parse(str);
        }
        this.target = element;
    }

    /**
     * Convert a JSON string to an HTML string
     * in order to display it as pure HTML
     * 
     * @param data JSON object
     * @returns string HTML code
     */
    static JSONtoHTMLstring(data) {
        
        let blueprint = EJSBlueprint();
        if (!isJSON(data)) {
            return data;
        }
        blueprint = JSON.parse(data);
        let htmlstring = `<div class="codex-editor"> <div class="codex-editor__redactor" style="padding-bottom:300px;">`;
        let markup = "";
        blueprint.blocks.forEach( (block, index) => {
            switch (block.type) {
              case 'paragraph':
                markup = `<p>${block.data.text}</p>`
                break;
              case 'header':
                markup =`<h${block.data.level}>${block.data.text}</h${block.data.level}>`
                break;
              case 'list':
                let type = block.data.style == "ordered" ? 'ol' : 'ul';
                markup = `<${type}>`;
                block.data.items.forEach( item => {
                  let li = `<li>${item}</li>`;
                  markup += li;
                });
                markup = `</${type}>`;
                break;
              case 'image':
                markup = `<img src="${block.data.file.url}" alt="${block.data.alt}" />`;
                markup += `<span class="editor-image-caption">${block.data.caption}</span>`;
                break;
              case 'embed':
                markup = `<iframe src="${block.data.url}" width="${block.data.width}" height="${block.data.height}" frameborder="0" allowfullscreen></iframe>`;
                break;
              case 'quote':
                markup = `<blockquote class="blockquote">"${block.data.text}"</blockquote>`;
                markup += `<span class="blockquote-caption">${block.data.caption}</span>`;
                break;
              case 'code':
                markup = `<pre><code>${block.data.code}</code></pre>`;
                break;
              case 'table': // Foreach on a two dimensional array of strings to create a table, the first array is the header, the others are the rows
                markup = `<table>`;
                block.data.content.forEach( (row, index) => {
                  // if this is the first iteration, create the header
                  if (index == 0) {
                    markup += `<thead>`;
                    row.forEach( cell => {
                      markup += `<th>${cell}</th>`;
                    });
                    markup += `</thead>`;
                  } else {
                    markup += `<tr>`;
                    row.forEach( cell => {
                      markup += `<td>${cell}</td>`;
                    });
                    markup += `</tr>`;
                  }
                });
                markup += `</table>`;
                break;
              case 'hr':
                markup = `<hr>`;
                break;
              case 'warning':
                markup = `<div class="warning-title">${block.data.title}</div>`;
                markup += `<div class="warning-message">${block.data.message}</div>`;
                break;
              case 'linkTool':
                let link = Streamline.setProtocol(block.data.link);
                let title = block.data.meta.title ? block.data.meta.title : "No Title";
                let description = block.data.meta.description ? block.data.meta.description : "No Description";
                let imageDIV = '';

                if (block.data.meta.image && block.data.meta.image.url) {
                  imageDIV = `<div class="link-tool__image"><img src="${block.data.meta.image.url}" alt="${title}" /></div>`;
                }
                markup = `<div class="link-tool">
                            <a class="link-tool__content link-tool__content--rendered" target="_blank" rel="nofollow noindex noreferrer" href="${link}">`;
                markup += imageDIV;            
                markup +=  `<div class="link-tool__title">${title}</div>
                            <p class="link-tool__description">${description}</p>
                            <span class="link-tool__anchor">${link}</span></a>
                          </div>`;
                break;
              case 'media':
                markup = `<div class="media">`;
                block.data.items.forEach( item => {
                  markup += `<div class="media-body">${item}</div>`;
                });
                markup = `</div>`;
                break;
              case 'attaches':
                let url = block.data.file.url;
                let filename = block.data.title;
                markup =
                      `<a class="file-link" href="${url}" target="_blank" rel="nofollow noindex noreferrer">
                      <div class="file-block">
                        
                        
                        <span class="fiv-cla fiv-icon-ppt fiv-size-lg"></span>&nbsp;
                        <span class="file-name">${filename}</span>
                        
                      </div></a>`;
                break;
              default:
                markup = `<p>The block ${block.type} could not be created.</p>`;
                break;
            }
            htmlstring += markup;
            
          });
          htmlstring += `</div></div>`;
          return htmlstring;
    }




}
