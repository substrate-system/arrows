import { WebComponent } from '@substrate-system/web-component'
import { back, next } from './svg.js'
// import Debug from '@substrate-system/debug'
// const debug = Debug()

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'anchor-back': AnchorBack
        'anchor-next': AnchorNext
    }
}

class SubstrateLink extends WebComponent.create('substrate-input') {
    static observedAttributes = ['disabled', 'href']

    get disabled ():boolean {
        return !!(this.qs('a')?.hasAttribute('href'))
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

    hanldeChange_href (_, newValue:string) {
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

    render () {
        const h = this.getAttribute('href')
        this.innerHTML = `<a${h ? ' href=' + h : ''}>
            ${next}
            <span class="visually-hidden">Next</span>
        </a$>`
    }
}

export class AnchorBack extends SubstrateLink {
    static NAME = 'anchor-back'

    render () {
        const h = this.getAttribute('href')
        this.innerHTML = `<a${h ? ' href=' + h : ''}>
            ${back}
            <span class="visually-hidden">Back</span>
        </a$>`
    }
}
