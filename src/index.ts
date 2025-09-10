import * as ssr from './html.js'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'substrate-back':SubstrateBack
        'substrate-next':SubstrateNext
    }
}

export class SubstrateInput extends HTMLElement {
    static observedAttributes = ['disabled']
    static TAG: string

    static define () {
        if (!customElements.get(this.TAG)) {
            customElements.define(this.TAG, this as any)
        }
    }

    connectedCallback () {
        if (!this.innerHTML) {
            this.render()
        }
    }

    qs<K extends keyof HTMLElementTagNameMap>(
        selector:K
    ):HTMLElementTagNameMap[K]|null

    qs<E extends Element = Element>(selector:string):E|null
    qs (selector:string):Element|null {
        return this.querySelector(selector)
    }

    get disabled ():boolean {
        return !!(this.hasAttribute('disabled'))
    }

    set disabled (value:boolean) {
        const btn = this.qs('button')
        if (value) {
            // disable
            btn?.setAttribute('disabled', '')
            if (this.hasAttribute('disabled')) return
            this.setAttribute('disabled', '')
        } else {
            // enable
            if (!this.hasAttribute('disabled')) return
            btn?.removeAttribute('disabled')
            if (!this.hasAttribute('disabled')) return
            this.removeAttribute('disabled')
        }
    }

    /**
     * Handle 'disabled' attribute changes
     * @see {@link https://gomakethings.com/how-to-detect-when-attributes-change-on-a-web-component/#organizing-your-code Go Make Things article}
     */
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

export class SubstrateNext extends SubstrateInput {
    static TAG = 'substrate-next'

    static html (attrs:Record<string, any> = {}):string {
        return ssr.SubstrateNext.html(attrs)
    }

    render () {
        if (!this.innerHTML) {
            this.innerHTML = SubstrateNext.html({ disabled: this.disabled })
        }
    }
}

export class SubstrateBack extends SubstrateInput {
    static TAG = 'substrate-back'

    static html (attrs:Record<string, any> = {}):string {
        return ssr.SubstrateBack.html(attrs)
    }

    render () {
        if (!this.innerHTML) {
            this.innerHTML = SubstrateBack.html({ disabled: this.disabled })
        }
    }
}

SubstrateBack.define()
SubstrateNext.define()
