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

export class SubstrateNext extends SubstrateLink {
    static NAME = 'next-anchor'

    render () {
        this.innerHTML = `<button>
            ${next}
            <span class="visually-hidden">Next</span>
        </button>`
    }
}

export class SubstrateBack extends SubstrateLink {
    static NAME = 'back-anchor'

    render () {
        this.innerHTML = `<button${this.disabled ? ' disabled' : ''}>
            ${back}
            <span class="visually-hidden">Back</span>
        </button$>`
    }
}
