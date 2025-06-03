import { WebComponent } from '@substrate-system/web-component'
import { back, next } from './svg.js'

class SubstrateLink extends WebComponent.create('substrate-input') {
    static observedAttributes = ['disabled']

    get disabled ():boolean {
        return !!(this.qs('a')?.hasAttribute('href'))
    }

    set disabled (value:boolean) {
        const a = this.qs('a')
        if (value) {
            // disable
            a?.removeAttribute('href')
            this.classList.add('disabled')
        } else {
            // enable
            const h = this.getAttribute('href')
            if (!h) throw new Error('not href')
            a?.setAttribute('href', h)
            this.classList.remove('disabled')
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
