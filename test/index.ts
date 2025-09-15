import { test } from '@substrate-system/tapzero'
import { waitFor } from '@substrate-system/dom'
import { SubstrateBack, SubstrateNext } from '../src/index.js'
import { AnchorBack, AnchorNext } from '../src/links.js'
import {
    AnchorBack as AnchorBackClient,
    AnchorNext as AnchorNextClient
} from '../src/client.js'

try {
    SubstrateBack.define()
} catch (error) {
    console.error('SubstrateBack.define() failed:', error)
    throw error
}

try {
    SubstrateNext.define()
} catch (error) {
    console.error('SubstrateNext.define() failed:', error)
    throw error
}

try {
    AnchorBack.define()
} catch (error) {
    console.error('AnchorBack.define() failed:', error)
    throw error
}

try {
    AnchorNext.define()
} catch (error) {
    console.error('AnchorNext.define() failed:', error)
    throw error
}

test('Disabled getter & setter', async t => {
    document.body.innerHTML += `
        <substrate-back class="test"></substrate-back>
        <substrate-next class="test"></substrate-next>
    `

    const el = await waitFor('substrate-back') as SubstrateBack
    t.ok(el, 'should find an element')
    t.ok(await waitFor('substrate-back button'),
        'should render the component')

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

    t.ok(await waitFor('anchor-back a', { timeout: 3000 }),
        'should find an anchor back element')
    t.ok(await waitFor('anchor-next a'), 'should find an anchor next element')
})

test('anchor href', async t => {
    const el = await waitFor('anchor-back a')
    console.log('all atttrrr', el?.getAttributeNames().join(' '))
    t.equal(el?.getAttribute('href'), '/back', 'should start with href')
})

test('disable the links', async t => {
    t.plan(2)
    const el = await waitFor('anchor-back') as AnchorBack
    el.disabled = true

    const a = await waitFor('anchor-back a')
    t.ok(!a?.hasAttribute('href'),
        'should remove the href when it is disabled')

    el.disabled = false
    t.equal((await waitFor('anchor-back a'))?.getAttribute('href'),
        '/back',
        'should go back to the previous href when it is enabled')
})

test('define client-side anchor back and anchor next', t => {
    AnchorBackClient.define()
    AnchorNextClient.define()
    t.ok(true, "didn't throw")
})

test('href should not become string "null" when enabling with null href', async t => {
    t.plan(7)

    // Create pre-rendered HTML as would come from server-side rendering
    // This simulates the scenario where the server renders without href
    document.body.innerHTML += `
        <anchor-back class="test-null-fix">
            <a>
                <svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                </svg>
                <span class="visually-hidden">Back</span>
            </a>
        </anchor-back>
    `

    const el = document.querySelector('anchor-back.test-null-fix') as AnchorBackClient
    t.ok(el, 'should find the anchor element')

    const a = el.querySelector('a')
    t.ok(a, 'should find the nested anchor element')

    // Manually set href to null to simulate the problematic state
    el.href = null
    t.equal(el.href, null, 'element href property should be null')
    t.ok(!a.hasAttribute('href'), 'anchor should not have href attribute initially')

    // Trigger the code path that previously caused href="null"
    el.disabled = false

    // Verify fix: href should remain null, not become string "null"
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            const href = a.getAttribute('href')
            if (href === 'null') {
                t.fail('Bug: href became the string "null" instead of staying null')
            } else if (href === null) {
                t.ok(true, 'href correctly remains null when original href was null')
            } else {
                t.fail('unexpected href value: ' + href)
            }

            // Check that element href property is still null
            t.equal(el.href, null, 'element href property should remain null')
            resolve()
        }, 50)
    })
})

test('all done', () => {
    // @ts-expect-error testing
    window.testsFinished = true
})
