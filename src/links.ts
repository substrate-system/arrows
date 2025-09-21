import * as ssr from './html.js'
import {
    AnchorBack as ClientAnchorBack,
} from './client.js'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'anchor-back':AnchorBack
        'anchor-next':AnchorNext
    }
}

export class SubstrateLink extends HTMLElement {
    static observedAttributes = ['disabled', 'href']
    static TAG:string
    href:string|null

    constructor () {
        super()
        const href = this.getAttribute('href')
        this.href = href
    }

    static define () {
        if (!customElements.get(this.TAG)) {
            customElements.define(this.TAG, this)
        }
    }

    connectedCallback () {
        this.render()
        if (this.hasAttribute('disabled')) {
            setTimeout(() => {
                this.qs('a')?.removeAttribute('href')
                this.classList.add('disabled')
            }, 0)
        }
    }

    attributeChangedCallback (name:string, _oldValue:string, newValue:string) {
        if (name === 'href') {
            if (!newValue) {
                this.qs('a')?.removeAttribute('href')
            } else {
                this.href = newValue
                this.qs('a')?.setAttribute('href', newValue)
            }

            this.href = newValue
        }

        if (name === 'disabled') {
            if (newValue !== null) {
                // is disabled
                this.qs('a')?.removeAttribute('href')
            } else {
                // not disabled
                if (this.href) {
                    this.qs('a')?.setAttribute('href', this.href)
                } else {
                    this.qs('a')?.removeAttribute('href')
                }
            }
        }
    }

    qs<K extends keyof HTMLElementTagNameMap> (
        selector: K
    ):HTMLElementTagNameMap[K]|null {
        return this.querySelector(selector)
    }

    get disabled ():boolean {
        return !!(this.hasAttribute('disabled'))
    }

    set disabled (value:boolean) {
        const a = this.qs('a')
        if (value) {
            // disable
            this.classList.add('disabled')
            this.setAttribute('disabled', '')
            a?.removeAttribute('href')
            a?.setAttribute('aria-disabled', 'true')
            a?.setAttribute('aria-label',
                (
                    this instanceof AnchorBack ||
                    this instanceof ClientAnchorBack
                ) ? 'Back' : 'Next')
        } else {
            // enable
            const h = this.href
            this.classList.remove('disabled')
            if (this.hasAttribute('disabled')) this.removeAttribute('disabled')
            setTimeout(() => {
                if (h) {
                    a?.setAttribute('href', h)
                } else {
                    a?.removeAttribute('href')
                }
                a?.removeAttribute('aria-disabled')
                a?.setAttribute('aria-label',
                    (
                        this instanceof AnchorBack ||
                        this instanceof ClientAnchorBack
                    ) ? 'Back' : 'Next')
            }, 0)
        }
    }

    handleChange_href (_, newValue:string) {
        if (!newValue) {
            this.qs('a')?.removeAttribute('href')
        } else {
            this.qs('a')?.setAttribute('href', newValue)
        }
    }

    handleChange_disabled (_oldValue:string, newValue:string) {
        if (newValue === null) {
            // was removed
            this.disabled = false
        } else {
            this.disabled = true
        }
    }

    render () {
        throw new Error('Should be implemented by children')
    }
}

export class AnchorNext extends SubstrateLink {
    static TAG = 'anchor-next'

    static html (attrs:Record<string, any> = {}):string {
        return ssr.AnchorNext.html(attrs)
    }

    render () {
        const h = this.href
        const html = AnchorNext.html({ href: h })
        this.innerHTML = html
        const a = this.qs('a')
        const isDisabled = this.hasAttribute('disabled')
        if (isDisabled) {
            a?.removeAttribute('href')
            a?.setAttribute('aria-disabled', 'true')
            a?.setAttribute('aria-label', 'Next')
        } else {
            a?.setAttribute('aria-label', 'Next')
            a?.removeAttribute('aria-disabled')
        }
    }
}

export class AnchorBack extends SubstrateLink {
    static TAG = 'anchor-back'

    static html (attrs:Record<string, any> = {}):string {
        return ssr.AnchorBack.html(attrs)
    }

    render () {
        const href = this.href
        const html = AnchorBack.html({ href })
        this.innerHTML = html
        const a = this.qs('a')
        const isDisabled = this.hasAttribute('disabled')
        if (isDisabled) {
            a?.removeAttribute('href')
            a?.setAttribute('aria-disabled', 'true')
            a?.setAttribute('aria-label', 'Back')
        } else {
            a?.setAttribute('aria-label', 'Back')
            a?.removeAttribute('aria-disabled')
        }
    }
}
