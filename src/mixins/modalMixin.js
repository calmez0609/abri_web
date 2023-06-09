import Modal from 'bootstrap/js/dist/modal.js'

export default {
    methods: {
        hideModal () {
          this.modal.hide()
        },
        showModal () {
          this.modal.show()
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
    }
}