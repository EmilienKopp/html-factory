/*
 * EJSBlueprint - Object Template
 * Blueprint to parse the JSON object savec by editorjs into HTML
 *   
 */
export default class EJSBlueprint {
    time;
    blocks = {
        type,
        data : {
            text,
            level,
            anchor,
            style,
            items,
            url,
            withBorder,
            withBackground,
            stretched,
            file : {
                url,
                size,
                name,
                extension,
                originalName,
                id,
                blockId,
                title,
            },
            alt,
            caption,
            content,
            withHeadings,
            service,
            source,
            embed,
            width,
            height,
            alignment,
            code,
            language,
            link,
            meta : {
                title,
                site_name,
                description,
                image : {
                    url
                }
            },
            message
        }
    };
    version;
}