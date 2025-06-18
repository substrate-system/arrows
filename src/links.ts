import { WebComponent } from '@substrate-system/web-component'
import * as ssr from './ssr.js'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'anchor-back': AnchorBack
        'anchor-next': AnchorNext
    }
}

export class SubstrateLink extends WebComponent.create('substrate-input') {
    static observedAttributes = ['disabled', 'href']

    get disabled ():boolean {
        return !!(this.hasAttribute('href'))
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

    connectedCallback () {
        if (!this.innerHTML) {
            this.render()
        }
    }

    handleChange_href (_, newValue:string) {
        if (!newValue) {
            this.qs('a')?.removeAttribute('href')
        }

        this.qs('a')?.setAttribute('href', newValue)
    }

    handleChange_disabled (_oldValue:string, newValue:string) {
        if (newValue === null) {
            // was removed
            this.disabled = false
        } else {
            this.disabled = true
        }
    }
}

export class AnchorNext extends SubstrateLink {
    static NAME = 'anchor-next'

    static html ({ href }:{ href?:string|null }):string {
        return ssr.AnchorNext.html({ href })
    }

    render () {
        const h = this.getAttribute('href')
        this.innerHTML = AnchorNext.html({ href: h })
    }
}

export class AnchorBack extends SubstrateLink {
    static NAME = 'anchor-back'

    static html ({ href }:{ href?:string|null }):string {
        return ssr.AnchorBack.html({ href })
    }

    render () {
        const h = this.getAttribute('href')
        this.innerHTML = AnchorBack.html({ href: h })
    }
}
