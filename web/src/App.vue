<template>
  <main>
    <!-- Global loading overlay -->
    <div
      v-if="chargement || chargementTransparent"
      id="conteneur-chargement"
      :class="{'transparent': chargementTransparent}"
    >
      <div id="chargement">
        <div class="spinner">
          <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
        </div>
      </div>
    </div>

    <!-- Global error modal -->
    <div
      v-if="message !== ''"
      id="conteneur-message"
      class="conteneur-modale"
    >
      <div
        id="message"
        class="modale"
        role="dialog"
        aria-modal="true"
        aria-live="assertive"
      >
        <div class="conteneur">
          <div class="contenu">
            <div
              class="message"
              v-html="message"
            />
            <div class="actions">
              <span
                class="bouton"
                role="button"
                tabindex="0"
                @click="fermerMessage"
                @keydown.enter.space.prevent="fermerMessage"
              >{{ $t('fermer') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast notifications -->
    <div
      id="notification"
      aria-live="polite"
      aria-atomic="false"
    />

    <router-view />
  </main>
</template>

<script>
export default {
	name: 'App',
	data () {
		return {
			// hote: base URL for API calls. On InfinityFree this resolves to
			// https://yourname.infinityfreeapp.com/ — always relative, never hard-coded.
			hote: '',
			chargement: true,
			chargementTransparent: false,
			message: '',
			notification: '',
			langues: ['fr', 'it', 'en'],
			langue: 'en',
			elementPrecedent: null
		}
	},
	watch: {
		message (message) {
			if (message !== '') {
				this.elementPrecedent = (document.activeElement || document.body)
				this.$nextTick(() => {
					const btn = document.querySelector('#message .bouton')
					if (btn) btn.focus()
				})
			}
		},
		notification (notification) {
			if (notification !== '') {
				const el = document.createElement('div')
				el.id = 'notification_' + Date.now().toString(36) + Math.random().toString(36).slice(2)
				el.textContent = notification
				el.classList.add('notification')
				document.querySelector('#notification').appendChild(el)
				this.notification = ''
				setTimeout(() => { el.parentNode?.removeChild(el) }, 2500)
			}
		}
	},
	created () {
		// Derive base URL relative to wherever the app is hosted.
		// Works for InfinityFree subdomains, custom domains, and localhost alike.
		this.hote = window.location.href.split('#')[0].replace(/\/?$/, '/')
	},
	methods: {
		fermerMessage () {
			this.message = ''
			if (this.elementPrecedent) {
				this.elementPrecedent.focus()
				this.elementPrecedent = null
			}
		}
	}
}
</script>

<style src="destyle.css/destyle.css"></style>
<style src="@/assets/css/style.css"></style>
