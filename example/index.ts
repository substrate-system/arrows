import { qs } from '@substrate-system/web-component'
import { SubstrateBack, SubstrateNext } from '../src/index.js'
import '@substrate-system/a11y/visually-hidden'
import '../src/index.css'
import './index.css'
import Debug from '@substrate-system/debug'
const debug = Debug(import.meta.env.DEV)

SubstrateBack.define()
SubstrateNext.define()

document.body.innerHTML += `
    <substrate-back></substrate-back>
    <substrate-next></substrate-next>
`

const next = qs('substrate-next')
next?.addEventListener('click', () => {
    debug('click next')
})

qs('substrate-back')?.addEventListener('click', () => {
    debug('click back...')
})

// @ts-expect-error dev
window.TEST = {
    back: qs('substrate-back'),
    next: qs('substrate-next'),

    disable: () => {
        qs('substrate-back')!.disabled = true
    }
}
