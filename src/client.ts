import { SubstrateInput } from './index.js'
import { SubstrateLink } from './links.js'

/**
 * This file would be used in conjunction with server-side rendering.
 * There is no logic to speak of in the elements, just style + SVGs, so
 * this is an empty file.
 */

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'substrate-back':SubstrateBack
        'substrate-next':SubstrateNext
    }
}

export class AnchorNext extends SubstrateLink {
    static TAG = 'anchor-next'

    render () {
        // noop
    }
}

export class AnchorBack extends SubstrateLink {
    static TAG = 'anchor-back'

    render () {
        // noop
    }
}

export class SubstrateBack extends SubstrateInput {
    static TAG = 'substrate-back'

    render () {
        // noop
    }
}

export class SubstrateNext extends SubstrateInput {
    static TAG = 'substrate-next'

    render () {
        // noop
    }
}
