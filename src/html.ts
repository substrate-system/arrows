import { back, next } from './svg.js'

export const SubstrateBack = {
    NAME: 'substrate-back',
    html ({ disabled }:{ disabled:boolean }):string {
        return `<button${disabled ? ' disabled' : ''}>
            ${back}
            <span class="visually-hidden">Next</span>
        </button>`
    }
}

export const SubstrateNext = {
    NAME: 'substrate-next',
    html ({ disabled }:{ disabled:boolean }):string {
        return `<button${disabled ? ' disabled' : ''}>
            ${next}
            <span class="visually-hidden">Next</span>
        </button>`
    }
}

export const AnchorBack = {
    NAME: 'anchor-back',
    html ({ href }:{ href?:string|null }):string {
        return `<a${href ? ' href="' + href + '"' : ''}>
            ${back}
            <span class="visually-hidden">Back</span>
        </a>`
    }
}

export const AnchorNext = {
    NAME: 'anchor-next',
    html ({ href }:{ href?:string|null }):string {
        return `<a${href ? ' href="' + href + '"' : ''}>
            ${next}
            <span class="visually-hidden">Next</span>
        </a>`
    }
}
