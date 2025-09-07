import { SubstrateInput } from './index.js'
import { SubstrateLink } from './links.js'

/**
 * This file would be used in conjunction with server-side rendering.
 * There is no logic to speak of in the elements, just style + SVGs, so
 * this is an empty file.
 */

export class AnchorNext extends SubstrateLink {
    static NAME = 'anchor-next'

    render () {
        // noop
    }
}

export class AnchorBack extends SubstrateLink {
    static NAME = 'anchor-back'

    render () {
        // noop
    }
}

export class SubstrateBack extends SubstrateInput {
    static NAME = 'substrate-back'

    render () {
        // noop
    }
}

export class SubstrateNext extends SubstrateInput {
    static NAME = 'substrate-next'

    render () {
        // noop
    }
}
