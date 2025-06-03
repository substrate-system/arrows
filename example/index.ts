import { qs } from '@substrate-system/web-component'
import { SubstrateBack, SubstrateNext } from '../src/index.js'
import '@substrate-system/a11y/visually-hidden'
import {
    AnchorBack,
    AnchorNext
} from '../src/links.js'
import '../src/index.css'
import './index.css'
import Debug from '@substrate-system/debug'
const debug = Debug(import.meta.env.DEV)

SubstrateBack.define()
SubstrateNext.define()
AnchorBack.define()
AnchorNext.define()

document.body.innerHTML += `
    <h2>Buttons</h2>
    <substrate-back></substrate-back>
    <substrate-next></substrate-next>

    <h2>Links</h2>
    <anchor-back href="fooo"></anchor-back>
    <anchor-next href="barrr"></anchor-next>


    <h2>Controls</h2>
    <button id="disable">Disable them</button>
    <button id="enable">Enable them</button>
`

qs('#disable')?.addEventListener('click', ev => {
    ev.preventDefault()
    debug('disable them')
    qs('substrate-back')!.disabled = true
    qs('substrate-next')!.disabled = true
})

qs('#enable')?.addEventListener('click', ev => {
    ev.preventDefault()
    debug('enable them')
    qs('substrate-back')!.disabled = false
    qs('substrate-next')!.disabled = false
    setTimeout(() => {
        addListeners()
    }, 0)
})

function addListeners () {
    const next = qs('substrate-next')
    next?.addEventListener('click', () => {
        debug('click next')
    })

    qs('substrate-back')?.addEventListener('click', () => {
        debug('click back...')
    })
}

// @ts-expect-error dev
window.TEST = {
    back: qs('substrate-back'),
    next: qs('substrate-next'),

    disable: () => {
        qs('substrate-back')!.disabled = true
    }
}

addListeners()
