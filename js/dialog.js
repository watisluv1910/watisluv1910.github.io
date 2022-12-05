export default class Dialog {
    constructor(settings = {}) {
        this.settings = Object.assign(
            {
                accept: 'OK',
                bodyClass: 'dialog-open',
                cancel: 'Cancel',
                dialogClass: '',
                message: '',
                template: ''
            },
            settings
        )
        this.init()
    };

    // Adding a helper function for detecting support 
    // for the HTML dialog element in browsers and setting 
    // up the basic HTML

    init () {
        // Testing for <dialog> support
        this.dialogSupported = typeof HTMLDialogElement === 'function'
        this.dialog = document.createElement('dialog')
        this.dialog.dataset.component = this.dialogSupported ? 'dialog' : 'no-dialog'
        this.dialog.role = 'dialog'

        // HTML template
        this.dialog.innerHTML = `
        <form method="dialog" data-ref="form">
            <div class="__info" data-ref="info">
                <div class="author-photo" data-ref="photo"></div>
                <div class="__meta">
                    <p class="name" data-ref="name" id="${(Math.round(Date.now())).toString(36)}></p>
                    <p class="job" data-ref="job"></p>
                </div>
            </div>
            <div class="__content" data-ref="content">HELLO</div>
        </form>
        `

        document.body.appendChild(this.dialog);

        this.elements = {}
        this.dialog.querySelectorAll('[data-ref]').forEach(el => this.elements[el.dataset.ref] = el)

        this.dialog.setAttiibute('aria-labelledby', this.elements.name.id)
    }
}