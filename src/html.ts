import { back, next } from './svg.js'

export const SubstrateBack = {
    TAG: 'substrate-back',
    outerHTML ({ disabled }:{ disabled:boolean }):string {
        return `<substrate-back>
            ${this.html({ disabled })}
        </substrate-back>`
    },
    html ({ disabled }:{ disabled:boolean }):string {
        return `<button${disabled ? ' disabled' : ''}>
            ${back}
            <span class="visually-hidden">Back</span>
        </button>`
    }
}

export const SubstrateNext = {
    TAG: 'substrate-next',
    outerHTML ({ disabled }:{ disabled:boolean }):string {
        return `<substrate-next>
            ${this.html({ disabled })}
        </substrate-next>`
    },
    html ({ disabled }:{ disabled:boolean }):string {
        return `<button${disabled ? ' disabled' : ''}>
            ${next}
            <span class="visually-hidden">Next</span>
        </button>`
    }
}

export const AnchorBack = {
    TAG: 'anchor-back',
    outerHTML ({ href }:{ href?:string }):string {
        return `<anchor-back>
            ${this.html({ href })}
        </anchor-back>`
    },
    html ({ href }:{ href?:string|null }):string {
        return `<a${href ? ' href="' + href + '"' : ''}>
            ${back}
            <span class="visually-hidden">Back</span>
        </a>`
    }
}

export const AnchorNext = {
    TAG: 'anchor-next',
    outerHTML ({ href }:{ href?:string }):string {
        return `<anchor-next>
            ${this.html({ href })}
        </anchor-next>`
    },
    html ({ href }:{ href?:string|null }):string {
        return `<a${href ? ' href="' + href + '"' : ''}>
            ${next}
            <span class="visually-hidden">Next</span>
        </a>`
    }
}
