import { SubstrateInput } from './index.js'
import { SubstrateLink } from './links.js'

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
