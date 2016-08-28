function HTMLtoString(HTMLcode) {
    var html = HTMLcode.firstChild;
    var node = HTMLcode.firstChild;
        
    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                html += node.outerHTML;
                break;
            case Node.TEXT_NODE:
                html += node.nodeValue;
                break;
            case Node.COMMENT_NODE:
                html += "<!--" + node.nodeValue + "-->";
                break;
            case Node.DOCUMENT_TYPE_NODE:
                html += "<!DOCTYPE " + node.nodeName + ">"
        }
        node = node.nextSibling;
    }
    return escapeChars(html);
}

function escapeChars(codeEscaped) {
    codeEscaped = codeEscaped.replace("<", "&lt;");
    codeEscaped = codeEscaped.replace(">", "&gt;");
    return codeEscaped;

}


chrome.runtime.sendMessage(HTMLtoString(document));