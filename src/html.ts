import { toAttributes } from '@substrate-system/web-component/attributes'
import { back, next } from './svg.js'

export const SubstrateBack = {
    TAG: 'substrate-back',
    outerHTML (attrs:Record<string, any> = {}):string {
        const customElementAttrs = { role: 'button', ...attrs }
        const attrStr = toAttributes(customElementAttrs)
        return `<substrate-back${attrStr ? ' ' + attrStr : ''}>
            ${this.html(attrs)}
        </substrate-back>`
    },
    html (attrs:Record<string, any> = {}):string {
        const extraAttrs: Record<string, any> = { ...attrs }
        if (attrs.disabled) {
            extraAttrs['aria-label'] = attrs['aria-label'] || 'Back'
            extraAttrs['aria-disabled'] = 'true'
        } else {
            extraAttrs['aria-label'] = attrs['aria-label'] || 'Back'
        }
        const attrStr = toAttributes(extraAttrs)
        const svg = back.replace('<svg', '<svg role="img" aria-hidden="true"')
        return `<button${attrStr ? ' ' + attrStr : ''}>
            ${svg}
            <span class="visually-hidden">Back</span>
        </button>`
    }
}

export const SubstrateNext = {
    TAG: 'substrate-next',
    outerHTML (attrs:Record<string, any> = {}):string {
        const customElementAttrs = { role: 'button', ...attrs }
        const attrStr = toAttributes(customElementAttrs)
        return `<substrate-next${attrStr ? ' ' + attrStr : ''}>
            ${this.html(attrs)}
        </substrate-next>`
    },
    html (attrs:Record<string, any> = {}):string {
        const extraAttrs: Record<string, any> = { ...attrs }
        if (attrs.disabled) {
            extraAttrs['aria-label'] = attrs['aria-label'] || 'Next'
            extraAttrs['aria-disabled'] = 'true'
        } else {
            extraAttrs['aria-label'] = attrs['aria-label'] || 'Next'
        }
        const attrStr = toAttributes(extraAttrs)
        const svg = next.replace('<svg', '<svg role="img" aria-hidden="true"')
        return `<button${attrStr ? ' ' + attrStr : ''}>
            ${svg}
            <span class="visually-hidden">Next</span>
        </button>`
    }
}

export const AnchorBack = {
    TAG: 'anchor-back',
    outerHTML (attrs:Record<string, any> = {}):string {
        // Remove href from custom element if disabled
        const attrsCopy = { ...attrs }
        if (attrsCopy.disabled) {
            delete attrsCopy.href
        }
        const customElementAttrs = { role: 'navigation', ...attrsCopy }
        const attrStr = toAttributes(customElementAttrs)
        return `<anchor-back${attrStr ? ' ' + attrStr : ''}>
            ${this.html(attrs)}
        </anchor-back>`
    },
    html (attrs:Record<string, any> = {}):string {
        // Only pass valid <a> attributes
        const validAttrs = ['href', 'target', 'rel', 'download', 'class',
            'id', 'aria-label', 'data-analytics']
        const anchorAttrs: Record<string, string> = {}
        for (const key of validAttrs) {
            if (attrs[key]) anchorAttrs[key] = attrs[key]
        }
        if (attrs.disabled) {
            delete anchorAttrs.href
            anchorAttrs['aria-label'] = attrs['aria-label'] || 'Back'
            anchorAttrs['aria-disabled'] = 'true'
        } else {
            anchorAttrs['aria-label'] = attrs['aria-label'] || 'Back'
        }
        const attrStr = Object.entries(anchorAttrs)
            .map(([k, v]) => ` ${k}="${v}"`).join('')
        const svg = back.replace('<svg', '<svg role="img" aria-hidden="true"')
        return `<a${attrStr}>
            ${svg}
            <span class="visually-hidden">Back</span>
        </a>`
    }
}

export const AnchorNext = {
    TAG: 'anchor-next',
    outerHTML (attrs:Record<string, any> = {}):string {
        // Remove href from custom element if disabled
        const attrsCopy = { ...attrs }
        if (attrsCopy.disabled) {
            delete attrsCopy.href
        }
        const customElementAttrs = { role: 'navigation', ...attrsCopy }
        const attrStr = toAttributes(customElementAttrs)
        return `<anchor-next${attrStr ? ' ' + attrStr : ''}>
            ${this.html(attrs)}
        </anchor-next>`
    },
    html (attrs:Record<string, any> = {}):string {
        // Only pass valid <a> attributes
        const validAttrs = ['href', 'target', 'rel', 'download', 'class',
            'id', 'aria-label', 'data-analytics']
        const anchorAttrs: Record<string, any> = {}
        for (const key of validAttrs) {
            if (attrs[key]) anchorAttrs[key] = attrs[key]
        }
        if (attrs.disabled) {
            delete anchorAttrs.href
            anchorAttrs['aria-label'] = attrs['aria-label'] || 'Next'
            anchorAttrs['aria-disabled'] = 'true'
        } else {
            anchorAttrs['aria-label'] = attrs['aria-label'] || 'Next'
        }
        const attrStr = Object.entries(anchorAttrs)
            .map(([k, v]) => ` ${k}="${v}"`).join('')
        const svg = next.replace('<svg', '<svg role="img" aria-hidden="true"')
        return `<a${attrStr}>
            ${svg}
            <span class="visually-hidden">Next</span>
        </a>`
    }
}
