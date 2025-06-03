import { WebComponent } from '@substrate-system/web-component'
import { back, next } from './svg.js'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'substrate-back': SubstrateBack
        'substreate-next': SubstrateNext
    }
}

class SubstrateInput extends WebComponent.create('substrate-input') {
    static observedAttributes = ['disabled']

    connectedCallback () {
        this.render()
    }

    addEventListener<K extends keyof HTMLElementEventMap> (
        type:K,
        listener:(this:HTMLElement, ev:HTMLElementEventMap[K])=>any,
        options?:boolean|AddEventListenerOptions
    ):void {
        return this.qs('button')?.addEventListener(type, listener, options)
    }

    removeEventListener<K extends keyof HTMLElementEventMap> (
        type:K,
        listener:(this:HTMLElement, ev:HTMLElementEventMap[K])=>any,
        options?:boolean|AddEventListenerOptions
    ):void {
        return this.qs('button')?.removeEventListener(type, listener, options)
    }
}

export class SubstrateNext extends SubstrateInput {
    static NAME = 'substrate-next'

    connectedCallback () {
        this.render()
    }

    addEventListener<K extends keyof HTMLElementEventMap> (
        type:K,
        listener:(this:HTMLElement, ev:HTMLElementEventMap[K])=>any,
        options?:boolean|AddEventListenerOptions
    ):void {
        return this.qs('button')?.addEventListener(type, listener, options)
    }

    removeEventListener<K extends keyof HTMLElementEventMap> (
        type:K,
        listener:(this:HTMLElement, ev:HTMLElementEventMap[K])=>any,
        options?:boolean|AddEventListenerOptions
    ):void {
        return this.qs('button')?.removeEventListener(type, listener, options)
    }

    render () {
        this.innerHTML = `<button>
            ${next}
            <span class="visually-hidden">Next</span>
        </button>`
    }
}

export class SubstrateBack extends SubstrateInput {
    static NAME = 'substrate-back'

    /**
     * Handle 'disabled' attribute changes
     * @see {@link https://gomakethings.com/how-to-detect-when-attributes-change-on-a-web-component/#organizing-your-code Go Make Things article}
     */
    handleChange_disabled (oldValue:string, newValue:string) {
        if (newValue === null) {
            // was removed
            this.disabled = false
        } else {
            this.disabled = true
        }
    }

    get disabled ():boolean {
        return !!(this.qs('button')?.hasAttribute('disabled'))
    }

    set disabled (value:boolean) {
        const btn = this.qs('button')
        if (value) {
            // disable
            btn?.setAttribute('disabled', '' + true)
            if (this.hasAttribute('disabled')) return
            this.setAttribute('disabled', '')
        } else {
            // enable
            if (!this.hasAttribute('disabled')) return
            this.removeAttribute('disabled')
            btn?.removeAttribute('disabled')
        }
    }

    connectedCallback () {
        this.render()
    }

    render () {
        this.innerHTML = `<button${this.disabled ? ' disabled' : ''}>
            ${back}
            <span class="visually-hidden">Back</span>
        </button$>`
    }
}

if ('customElements' in window) {
    SubstrateBack.define()
    SubstrateNext.define()
}
