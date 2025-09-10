import * as ssr from './html.js'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'anchor-back': AnchorBack
        'anchor-next': AnchorNext
    }
}

export class SubstrateLink extends HTMLElement {
    static observedAttributes = ['disabled', 'href']
    static TAG:string

    static define () {
        if (!customElements.get(this.TAG)) {
            customElements.define(this.TAG, this)
        }
    }

    connectedCallback () {
        this.render()
    }

    qs<K extends keyof HTMLElementTagNameMap>(
        selector: K
    ):HTMLElementTagNameMap[K] | null

    qs<E extends Element = Element>(selector: string):E|null
    qs (selector:string):Element|null {
        return this.querySelector(selector)
    }

    get disabled ():boolean {
        return !!(this.hasAttribute('disabled'))
    }

    set disabled (value:boolean) {
        if (value) {
            // disable
            this.classList.add('disabled')
            setTimeout(() => {
                const a = this.qs('a')
                a?.removeAttribute('href')
            }, 0)
        } else {
            // enable
            const h = this.getAttribute('href')
            if (!h) throw new Error('not href')
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
        const h = this.getAttribute('href')
        const html = AnchorNext.html({ href: h })
        this.innerHTML = html
    }
}

export class AnchorBack extends SubstrateLink {
    static TAG = 'anchor-back'

    static html (attrs:Record<string, any> = {}):string {
        return ssr.AnchorBack.html(attrs)
    }

    render () {
        const h = this.getAttribute('href')
        const html = AnchorBack.html({ href: h })
        this.innerHTML = html
    }
}
