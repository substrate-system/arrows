import { toAttributes } from '@substrate-system/web-component/attributes'
import { back, next } from './svg.js'

export const SubstrateBack = {
    TAG: 'substrate-back',
    outerHTML (attrs:Record<string, any> = {}):string {
        const attrStr = toAttributes(attrs)
        return `<substrate-back${attrStr ? ' ' + attrStr : ''}>
            ${this.html(attrs)}
        </substrate-back>`
    },
    html (attrs:Record<string, any> = {}):string {
        const attrStr = toAttributes(attrs)
        return `<button${attrStr ? ' ' + attrStr : ''}>
            ${back}
            <span class="visually-hidden">Back</span>
        </button>`
    }
}

export const SubstrateNext = {
    TAG: 'substrate-next',
    outerHTML (attrs:Record<string, any> = {}):string {
        const attrStr = toAttributes(attrs)
        return `<substrate-next${attrStr ? ' ' + attrStr : ''}>
            ${this.html(attrs)}
        </substrate-next>`
    },
    html (attrs:Record<string, any> = {}):string {
        const attrStr = toAttributes(attrs)
        return `<button${attrStr ? ' ' + attrStr : ''}>
            ${next}
            <span class="visually-hidden">Next</span>
        </button>`
    }
}

export const AnchorBack = {
    TAG: 'anchor-back',
    outerHTML (attrs:Record<string, any> = {}):string {
        const attrStr = toAttributes(attrs)
        return `<anchor-back${attrStr ? ' ' + attrStr : ''}>
            ${this.html(attrs)}
        </anchor-back>`
    },
    html (attrs:Record<string, any> = {}):string {
        // Only pass valid <a> attributes
        const validAttrs = ['href', 'target', 'rel', 'download', 'class', 'id',
            'aria-label', 'data-analytics']
        const anchorAttrs:Record<string, string> = {}
        for (const key of validAttrs) {
            if (attrs[key]) anchorAttrs[key] = attrs[key]
        }
        const attrStr = Object.entries(anchorAttrs)
            .map(([k, v]) => ` ${k}="${v}"`).join('')
        return `<a${attrStr}>
            ${back}
            <span class="visually-hidden">Back</span>
        </a>`
    }
}

export const AnchorNext = {
    TAG: 'anchor-next',
    outerHTML (attrs:Record<string, any> = {}):string {
        const attrStr = toAttributes(attrs)
        return `<anchor-next${attrStr ? ' ' + attrStr : ''}>
            ${this.html(attrs)}
        </anchor-next>`
    },
    html (attrs:Record<string, any> = {}):string {
        // Only pass valid <a> attributes
        const validAttrs = ['href', 'target', 'rel', 'download', 'class', 'id', 'aria-label', 'data-analytics']
        const anchorAttrs: Record<string, any> = {}
        for (const key of validAttrs) {
            if (attrs[key]) anchorAttrs[key] = attrs[key]
        }
        const attrStr = Object.entries(anchorAttrs)
            .map(([k, v]) => ` ${k}="${v}"`).join('')
        return `<a${attrStr}>
            ${next}
            <span class="visually-hidden">Next</span>
        </a>`
    }
}
