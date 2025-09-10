import { test } from '@substrate-system/tapzero'
import {
    AnchorBack,
    AnchorNext,
    SubstrateBack,
    SubstrateNext
} from '../src/html.js'

const buttons = [SubstrateBack, SubstrateNext]
const links = [AnchorBack, AnchorNext]

test('Render the elements in node', async t => {
    buttons.forEach(el => {
        const html = el.html({ disabled: true })

        t.ok(html.includes('disabled'), 'should use the "disabled" prop')
    })

    links.forEach(el => {
        const html = el.html({ href: '/abc' })

        t.ok(html.includes('href="/abc"'),
            'should include the href in the HTML')
    })
})

test('TAG property should return correct tag names', async t => {
    t.equal(SubstrateBack.TAG, 'substrate-back',
        'SubstrateBack should have correct TAG')
    t.equal(SubstrateNext.TAG, 'substrate-next',
        'SubstrateNext should have correct TAG')
    t.equal(AnchorBack.TAG, 'anchor-back', 'AnchorBack should have correct TAG')
    t.equal(AnchorNext.TAG, 'anchor-next', 'AnchorNext should have correct TAG')
})

test('outerHTML should render complete elements', async t => {
    const backButton = SubstrateBack.outerHTML({ disabled: true })
    t.ok(backButton.includes('<substrate-back>'), 'should include opening tag')
    t.ok(backButton.includes('</substrate-back>'), 'should include closing tag')
    t.ok(backButton.includes('disabled'), 'should include disabled prop')

    const nextButton = SubstrateNext.outerHTML({ disabled: false })
    t.ok(nextButton.includes('<substrate-next>'), 'should include opening tag')
    t.ok(nextButton.includes('</substrate-next>'), 'should include closing tag')
    t.ok(!nextButton.includes('disabled'),
        'should not include disabled when false')

    const backLink = AnchorBack.outerHTML({ href: '/back' })
    t.ok(backLink.includes('<anchor-back>'), 'should include opening tag')
    t.ok(backLink.includes('</anchor-back>'), 'should include closing tag')
    t.ok(backLink.includes('href="/back"'), 'should include href')

    const nextLink = AnchorNext.outerHTML({ href: '/next' })
    t.ok(nextLink.includes('<anchor-next>'), 'should include opening tag')
    t.ok(nextLink.includes('</anchor-next>'), 'should include closing tag')
    t.ok(nextLink.includes('href="/next"'), 'should include href')
})
