import { test } from '@substrate-system/tapzero'
import { waitFor } from '@substrate-system/dom'
import { SubstrateBack, SubstrateNext } from '../src/index.js'

SubstrateBack.define()
SubstrateNext.define()

test('Disabled getter & setter', async t => {
    document.body.innerHTML += `
        <substrate-back class="test"></substrate-back>
        <substrate-next class="test"></substrate-next>
    `

    const el = await waitFor('substrate-back') as SubstrateBack
    t.ok(el, 'should find an element')
    t.ok(await waitFor('substrate-back button'), 'should render the component')

    el!.disabled = true

    const btn = el.qs('button')
    t.ok(btn instanceof HTMLButtonElement, 'should find the button')
    t.ok(el.qs('button')?.hasAttribute('disabled'),
        'should set the button disabled attribute')

    t.equal(el.disabled, true, 'should return booleans')
    t.equal(el.hasAttribute('disabled'), true,
        'should put the attribute on the instance')
})
