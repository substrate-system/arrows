import { test } from '@substrate-system/tapzero'
import {
    AnchorBack,
    AnchorNext,
    SubstrateBack,
    SubstrateNext
} from '../src/ssr.js'

const buttons = [SubstrateBack, SubstrateNext]
const links = [AnchorBack, AnchorNext]

test('Render the elements in node', async t => {
    buttons.forEach(el => {
        const html = el.html({ disabled: true })

        t.ok(html.includes('disabled'), 'should use the "disabled" prop')
    })

    links.forEach(el => {
        const html = el.html({ href: '/abc' })

        t.ok(html.includes('href="/abc"'), 'should include the href in the HTML')
    })
})
