import * as ssr from './html.js'

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
    href:string

    constructor () {
        super()
        const href = this.getAttribute('href')
        if (!href) throw new Error('not href')
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
            this.qs('a')?.removeAttribute('href')
            this.classList.add('disabled')
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
                this.qs('a')?.setAttribute('href', this.href)
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
        if (value) {
            // disable
            this.classList.add('disabled')
            this.setAttribute('disabled', '')
            const a = this.qs('a')
            a?.removeAttribute('href')
        } else {
            // enable
            const h = this.href
            this.classList.remove('disabled')
            if (this.hasAttribute('disabled')) this.removeAttribute('disabled')
            setTimeout(() => {
                const a = this.qs('a')
                a?.setAttribute('href', h)
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

        const isDisabled = this.hasAttribute('disabled')
        if (isDisabled) {
            this.qs('a')?.removeAttribute('href')
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
        const isDisabled = this.hasAttribute('disabled')
        if (isDisabled) {
            this.qs('a')?.removeAttribute('href')
        }
    }
}
