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
    t.ok(backButton.includes('<substrate-back disabled>'),
        'should include opening tag')
    t.ok(backButton.includes('</substrate-back>'), 'should include closing tag')
    t.ok(backButton.includes('disabled'), 'should include disabled prop')

    const nextButton = SubstrateNext.outerHTML({ disabled: false })
    t.ok(nextButton.includes('<substrate-next>'), 'should include opening tag')
    t.ok(nextButton.includes('</substrate-next>'), 'should include closing tag')
    t.ok(!nextButton.includes('disabled'),
        'should not include disabled when false')

    const backLink = AnchorBack.outerHTML({ href: '/back' })
    t.ok(backLink.includes('<anchor-back href="/back">'),
        'should include opening tag')
    t.ok(backLink.includes('</anchor-back>'), 'should include closing tag')
    t.ok(backLink.includes('href="/back"'), 'should include href')

    const nextLink = AnchorNext.outerHTML({ href: '/next' })
    t.ok(nextLink.includes('<anchor-next href="/next">'),
        'should include opening tag')
    t.ok(nextLink.includes('</anchor-next>'), 'should include closing tag')
    t.ok(nextLink.includes('href="/next"'), 'should include href')
})

test('should accept multiple attributes (new API)', async t => {
    // Test button elements with multiple attributes
    const backButton = SubstrateBack.html({
        disabled: true,
        class: 'my-button',
        'data-test': 'back-btn',
        id: 'back-id'
    })
    t.ok(backButton.includes('disabled'), 'should include disabled')
    t.ok(backButton.includes('class="my-button"'), 'should include class')
    t.ok(backButton.includes('data-test="back-btn"'), 'should include data attr')
    t.ok(backButton.includes('id="back-id"'), 'should include id')

    const nextButton = SubstrateNext.html({
        type: 'submit',
        class: 'submit-btn',
        'aria-label': 'Next page'
    })
    t.ok(nextButton.includes('type="submit"'), 'should include type')
    t.ok(nextButton.includes('class="submit-btn"'), 'should include class')
    t.ok(nextButton.includes('aria-label="Next page"'),
        'should include aria-label')

    // Test anchor elements with multiple attributes
    const anchorAttrs = {
        href: '/previous',
        target: '_blank',
        class: 'nav-link',
        rel: 'noopener'
    }
    const backLink = AnchorBack.html(anchorAttrs)
    t.ok(backLink.includes('href="/previous"'), 'should include href')
    t.ok(backLink.includes('target="_blank"'), 'should include target')
    t.ok(backLink.includes('class="nav-link"'), 'should include class')
    t.ok(backLink.includes('rel="noopener"'), 'should include rel')

    const backOuter = AnchorBack.outerHTML(anchorAttrs)
    t.ok(backOuter.includes('target="_blank"'), 'should include target on <a>')
    t.ok(backOuter.includes('class="nav-link"'), 'should include class on <a>')
    t.ok(backOuter.includes('rel="noopener"'), 'should include rel on <a>')

    const nextAttrs = {
        href: '/next-page',
        download: 'file.pdf',
        'data-analytics': 'next-click'
    }
    const nextLink = AnchorNext.html(nextAttrs)
    t.ok(nextLink.includes('href="/next-page"'), 'should include href')
    t.ok(nextLink.includes('download="file.pdf"'), 'should include download')
    t.ok(nextLink.includes('data-analytics="next-click"'),
        'should include data analytics')

    const nextOuter = AnchorNext.outerHTML(nextAttrs)
    t.ok(nextOuter.includes('download="file.pdf"'),
        'should include download on <a>')
    t.ok(nextOuter.includes('data-analytics="next-click"'),
        'should include data analytics on <a>')
})

test('outerHTML should accept attributes on custom elements', async t => {
    // Test that attributes are applied to the custom elements themselves
    const backButton = SubstrateBack.outerHTML({
        class: 'wrapper-class',
        'data-component': 'back-button',
        id: 'back-wrapper'
    })
    t.ok((backButton.includes('<substrate-back class="wrapper-class"') ||
         backButton.includes('<substrate-back data-component="back-button"') ||
         backButton.includes('<substrate-back id="back-wrapper"')),
    'should include attributes on custom element')

    const nextLink = AnchorNext.outerHTML({
        slot: 'navigation',
        'data-testid': 'next-anchor'
    })
    t.ok(nextLink.includes('slot="navigation"') ||
         nextLink.includes('data-testid="next-anchor"'),
    'should include attributes on anchor-next element')
})

test('should work with no attributes (backward compatibility)', async t => {
    // Test that the new API still works when no attributes are provided
    const backButton = SubstrateBack.html()
    t.ok(backButton.includes('<button>'), 'should render button without attrs')
    t.ok(backButton.includes('visually-hidden'), 'should include hidden text')

    const nextLink = AnchorNext.html()
    t.ok(nextLink.includes('<a>'), 'should render anchor without attrs')
    t.ok(nextLink.includes('visually-hidden'), 'should include hidden text')

    const backOuter = SubstrateBack.outerHTML()
    t.ok(backOuter.includes('<substrate-back>'),
        'should render custom element without attrs')

    const nextOuter = AnchorNext.outerHTML()
    t.ok(nextOuter.includes('<anchor-next>'),
        'should render custom element without attrs')
})

test('Anchor tags static HTML disables href when disabled: true', async t => {
    function getAnchorTag (html) {
        const match = html.match(/<a[^>]*>(.|\n)*?<\/a>/)
        return match ? match[0] : ''
    }

    const backHtml = AnchorBack.html({ href: '/abc', disabled: true })
    const backA = getAnchorTag(backHtml)
    t.ok(backA.includes('<a'), 'should still render an <a> tag')
    t.ok(!backA.includes('href="/abc"'),
        'AnchorBack.html <a> should not include href when disabled')

    const nextHtml = AnchorNext.html({ href: '/def', disabled: true })
    const nextA = getAnchorTag(nextHtml)
    t.ok(nextA.includes('<a'), 'should still render an <a> tag')
    t.ok(!nextA.includes('href="/def"'),
        'AnchorNext.html <a> should not include href when disabled')

    const backOuter = AnchorBack.outerHTML({ href: '/abc', disabled: true })
    const backOuterA = getAnchorTag(backOuter)
    t.ok(backOuterA.includes('<a'), 'should still render an <a> tag')
    t.ok(!backOuterA.includes('href="/abc"'),
        'AnchorBack.outerHTML <a> should not include href when disabled')

    const nextOuter = AnchorNext.outerHTML({ href: '/def', disabled: true })
    const nextOuterA = getAnchorTag(nextOuter)
    t.ok(nextOuterA.includes('<a'), 'should still render an <a> tag')
    t.ok(!nextOuterA.includes('href="/def"'),
        'AnchorNext.outerHTML <a> should not include href when disabled')
})
