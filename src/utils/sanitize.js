const ALLOWED_TAGS = new Set([
    'br', 'b', 'strong', 'em', 'i', 'a', 'p', 'ul', 'ol', 'li', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
]);

const ALLOWED_ATTRS = {
    a: new Set(['href', 'target', 'rel']),
};

/**
 * Simple HTML sanitizer that only allows safe tags and attributes.
 * Removes script tags, event handlers, and dangerous attributes.
 */
export function sanitizeHTML(html) {
    if (!html) return '';

    const doc = new DOMParser().parseFromString(html, 'text/html');
    sanitizeNode(doc.body);
    return doc.body.innerHTML;
}

function sanitizeNode(node) {
    const children = Array.from(node.childNodes);

    for (const child of children) {
        if (child.nodeType === Node.TEXT_NODE) {
            continue;
        }

        if (child.nodeType === Node.ELEMENT_NODE) {
            const tagName = child.tagName.toLowerCase();

            if (!ALLOWED_TAGS.has(tagName)) {
                // Replace disallowed tag with its text content
                const text = document.createTextNode(child.textContent);
                node.replaceChild(text, child);
                continue;
            }

            // Remove all attributes except allowed ones
            const allowedAttrs = ALLOWED_ATTRS[tagName] || new Set();
            const attrs = Array.from(child.attributes);
            for (const attr of attrs) {
                if (!allowedAttrs.has(attr.name)) {
                    child.removeAttribute(attr.name);
                }
            }

            // For <a> tags, force safe target/rel and validate href
            if (tagName === 'a') {
                const href = child.getAttribute('href') || '';
                if (href.startsWith('javascript:') || href.startsWith('data:')) {
                    child.removeAttribute('href');
                }
                child.setAttribute('rel', 'noopener noreferrer');
            }

            sanitizeNode(child);
        }
    }
}
