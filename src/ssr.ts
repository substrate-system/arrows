import { back, next } from './svg.js'

export const SubstrateBack = {
    html ({ disabled }:{ disabled:boolean }):string {
        return `<button${disabled ? ' disabled' : ''}>
            ${back}
            <span class="visually-hidden">Next</span>
        </button>`
    }
}

export const SubstrateNext = {
    html ({ disabled }:{ disabled:boolean }):string {
        return `<button${disabled ? ' disabled' : ''}>
            ${next}
            <span class="visually-hidden">Next</span>
        </button>`
    }
}

export const AnchorBack = {
    html ({ href }:{ href?:string|null }):string {
        return `<a${href ? ' href="' + href + '"' : ''}>
            ${back}
            <span class="visually-hidden">Back</span>
        </a>`
    }
}

export const AnchorNext = {
    html ({ href }:{ href?:string|null }):string {
        return `<a${href ? ' href="' + href + '"' : ''}>
            ${next}
            <span class="visually-hidden">Next</span>
        </a>`
    }
}
