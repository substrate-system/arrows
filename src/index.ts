import { WebComponent } from '@substrate-system/web-component'
import * as ssr from './ssr.js'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'substrate-back': SubstrateBack
        'substrate-next': SubstrateNext
    }
}

export class SubstrateInput extends WebComponent.create('substrate-input') {
    static observedAttributes = ['disabled']

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

    connectedCallback () {
        if (!this.innerHTML) {
            this.render()
        }
    }
}

export class SubstrateNext extends SubstrateInput {
    static NAME = ssr.SubstrateNext.NAME

    static html ({ disabled }:{ disabled:boolean }):string {
        return ssr.SubstrateNext.html({ disabled })
    }

    render () {
        this.innerHTML = SubstrateNext.html({ disabled: this.disabled })
    }
}

export class SubstrateBack extends SubstrateInput {
    static NAME = ssr.SubstrateBack.NAME

    static html ({ disabled }:{ disabled:boolean }):string {
        return ssr.SubstrateBack.html({ disabled })
    }

    render () {
        this.innerHTML = SubstrateBack.html({ disabled: this.disabled })
    }
}

SubstrateBack.define()
SubstrateNext.define()
