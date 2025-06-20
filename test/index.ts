import { test } from '@substrate-system/tapzero'
import { waitFor } from '@substrate-system/dom'
import { SubstrateBack, SubstrateNext } from '../src/index.js'
import { AnchorBack, AnchorNext } from '../src/links.js'

SubstrateBack.define()
SubstrateNext.define()
AnchorBack.define()
AnchorNext.define()

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

test('anchor elements', async t => {
    document.body.innerHTML += `
        <anchor-back class="test" href="/back"></anchor-back>
        <anchor-next class="test" href="/next"></anchor-next>
    `

    t.ok(await waitFor('anchor-back a'), 'should find an anchor element')
    t.ok(await waitFor('anchor-next a'), 'should find an anchor element')
})

test('anchor href', async t => {
    const el = await waitFor('anchor-back a')
    t.equal(el?.getAttribute('href'), '/back', 'should start with href')
})

test('disable the links', async t => {
    t.plan(2)
    const el = await waitFor('anchor-back') as AnchorBack
    el.disabled = true

    const a = await waitFor('anchor-back a')
    t.ok(!a?.hasAttribute('href'), 'should remove the href when it is disabled')

    el.disabled = false
    t.equal((await waitFor('anchor-back a'))?.getAttribute('href'), '/back',
        'should go back to the previous href when it is enabled')
})
