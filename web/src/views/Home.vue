<template>
	<div id="page">
		<div id="accueil">

			<!-- Nav -->
			<nav id="accueil-nav">
				<a id="accueil-logo" href="#" :aria-label="'MindMyMap'">
					<div class="logo-icon"><i class="material-icons" aria-hidden="true">hub</i></div>
					<span class="logo-text">Mind<em>My</em>Map</span>
				</a>
				<div id="accueil-langues">
					<span class="bouton" role="button"
						:tabindex="modale === '' && $parent.$parent.message === '' ? 0 : -1"
						title="Français" aria-label="Français"
						:class="{'selectionne': $parent.$parent.langue === 'fr'}"
						@click="modifierLangue('fr')" @keydown.enter.space.prevent="modifierLangue('fr')">FR</span>
					<span class="bouton" role="button"
						:tabindex="modale === '' && $parent.$parent.message === '' ? 0 : -1"
						title="Italiano" aria-label="Italiano"
						:class="{'selectionne': $parent.$parent.langue === 'it'}"
						@click="modifierLangue('it')" @keydown.enter.space.prevent="modifierLangue('it')">IT</span>
					<span class="bouton" role="button"
						:tabindex="modale === '' && $parent.$parent.message === '' ? 0 : -1"
						title="English" aria-label="English"
						:class="{'selectionne': $parent.$parent.langue === 'en'}"
						@click="modifierLangue('en')" @keydown.enter.space.prevent="modifierLangue('en')">EN</span>
				</div>
			</nav>

			<!-- Hero -->
			<section id="accueil-hero">
				<h1>{{ $t('heroTitle') }}<br><span class="highlight">{{ $t('heroTitleHighlight') }}</span></h1>
				<p v-html="$t('heroCopy')" />

				<div id="accueil-cta">
					<span class="cta-primary" role="button"
						:tabindex="modale === '' && $parent.$parent.message === '' ? 0 : -1"
						@click="ouvrirModaleCarte" @keydown.enter.space.prevent="ouvrirModaleCarte">
						{{ $t('creerCarte') }}
					</span>
					<a class="cta-secondary" href="https://github.com/mindmymap/mindmymap" target="_blank" rel="noreferrer">
						<i class="material-icons" aria-hidden="true">code</i>{{ $t('voirCode') }}
					</a>
				</div>

				<div id="accueil-badges">
					<span class="badge"><i class="material-icons">lock_open</i>{{ $t('badge100Free') }}</span>
					<span class="badge"><i class="material-icons">block</i>{{ $t('badgeNoAds') }}</span>
					<span class="badge"><i class="material-icons">code</i>{{ $t('badgeOpenSource') }}</span>
					<span class="badge"><i class="material-icons">person_off</i>{{ $t('badgeNoAccount') }}</span>
				</div>
			</section>

			<!-- Features -->
			<div id="accueil-features">
				<div class="feature-card" v-for="(f, i) in features" :key="i">
					<div class="fc-icon"><i class="material-icons" aria-hidden="true">{{ f.icon }}</i></div>
					<h3>{{ $t(f.titleKey) }}</h3>
					<p>{{ $t(f.descKey) }}</p>
				</div>
			</div>

			<!-- Footer -->
			<footer id="accueil-footer">
				<p>
					{{ new Date().getFullYear() }} — MindMyMap
					<span class="sep">·</span>
					<a href="https://github.com/mindmymap/mindmymap" target="_blank" rel="noreferrer">{{ $t('codeSource') }}</a>
					<span class="sep">·</span>
					{{ $t('basedOn') }} <a href="https://ladigitale.dev/digimindmap/" target="_blank" rel="noreferrer">Digimindmap by La Digitale</a>
					<span class="sep">·</span>
					{{ $t('inspiredBy') }} <a href="https://gitmind.com" target="_blank" rel="noreferrer">GitMind</a>
					<span class="sep">·</span>
					<a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noreferrer">AGPL-3.0</a>
					<span class="sep">·</span>
					v{{ version }}
				</p>
			</footer>

		</div>

		<!-- Create map modal -->
		<div class="conteneur-modale" v-if="modale === 'carte'">
			<div class="modale" role="dialog" aria-modal="true">
				<header>
					<span class="titre">{{ $t('nouvelleCarte') }}</span>
					<span class="fermer" role="button" tabindex="0" :title="$t('fermer')" :aria-label="$t('fermer')"
						@click="fermerModaleCarte" @keydown.enter.space.prevent="fermerModaleCarte">
						<i class="material-icons" aria-hidden="true">close</i>
					</span>
				</header>
				<div class="conteneur">
					<div class="contenu" role="form" :aria-label="$t('nouvelleCarte')">
						<label for="nom-carte">{{ $t('nomCarte') }}</label>
						<input id="nom-carte" type="text" :value="nom" @input="nom = $event.target.value" @keydown.enter="creerCarte" :placeholder="$t('ideePrincipale')" />

						<label for="question-secrete">{{ $t('questionSecrete') }}</label>
						<select id="question-secrete" :value="question" @change="question = $event.target.value">
							<option value="" selected>—</option>
							<option v-for="(item, index) in questions" :value="item" :key="'option_' + index">{{ $t(item) }}</option>
						</select>

						<label for="reponse-secrete">{{ $t('reponseSecreteEdition') }}</label>
						<div id="conteneur-reponse-secrete">
							<input id="reponse-secrete" :type="reponseVisible ? 'text' : 'password'"
								:value="reponse" @input="reponse = $event.target.value" @keydown.enter="creerCarte" />
							<span class="icone" role="button" tabindex="0"
								:title="reponseVisible ? $t('masquer') : $t('afficher')"
								:aria-label="reponseVisible ? $t('masquer') : $t('afficher')"
								@click="modifierReponseVisible(!reponseVisible)"
								@keydown.enter.space.prevent="modifierReponseVisible(!reponseVisible)">
								<i class="material-icons" aria-hidden="true">{{ reponseVisible ? 'visibility_off' : 'visibility' }}</i>
							</span>
						</div>

						<div class="actions">
							<span class="bouton secondary" role="button" tabindex="0" @click="fermerModaleCarte" @keydown.enter.space.prevent="fermerModaleCarte">{{ $t('annuler') }}</span>
							<span class="bouton" role="button" tabindex="0" @click="creerCarte" @keydown.enter.space.prevent="creerCarte">
								<i class="material-icons" aria-hidden="true">add</i>{{ $t('creer') }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
let MM = window.MM

export default {
	name: 'Home',
	data () {
		return {
			modale: '',
			nom: '',
			question: '',
			questions: ['motPrefere', 'filmPrefere', 'chansonPreferee', 'prenomMere', 'prenomPere', 'nomRue', 'nomEmployeur', 'nomAnimal'],
			reponse: '',
			reponseVisible: false,
			elementPrecedent: null,
			version: app_version,
			features: [
				{ icon: 'all_out', titleKey: 'feat1Title', descKey: 'feat1Desc' },
				{ icon: 'share', titleKey: 'feat2Title', descKey: 'feat2Desc' },
				{ icon: 'image', titleKey: 'feat3Title', descKey: 'feat3Desc' },
				{ icon: 'keyboard', titleKey: 'feat4Title', descKey: 'feat4Desc' },
				{ icon: 'lock', titleKey: 'feat5Title', descKey: 'feat5Desc' },
				{ icon: 'devices', titleKey: 'feat6Title', descKey: 'feat6Desc' },
			]
		}
	},
	created () {
		const langueNav = navigator.language.substring(0, 2)
		const langueParam = this.$route.query.lang
		if (langueParam && langueParam !== '' && this.$parent.$parent.langues.includes(langueParam)) {
			this.$parent.$parent.langue = langueParam
			localStorage.setItem('mindmymap_lang', langueParam)
		} else if (!langueParam && langueNav !== '' && this.$parent.$parent.langues.includes(langueNav)) {
			this.$parent.$parent.langue = langueNav
		}
		if (localStorage.getItem('mindmymap_lang')) {
			this.$parent.$parent.langue = localStorage.getItem('mindmymap_lang')
		}
	},
	mounted () {
		this.$root.$i18n.locale = this.$parent.$parent.langue
		document.getElementsByTagName('html')[0].setAttribute('lang', this.$parent.$parent.langue)
		document.title = 'MindMyMap — Free Mind Mapping'
		setTimeout(function () {
			this.$parent.$parent.chargement = false
		}.bind(this), 300)
		document.addEventListener('keydown', this.gererClavier, false)
	},
	beforeUnmount () {
		document.removeEventListener('keydown', this.gererClavier, false)
	},
	methods: {
		modifierLangue (langue) {
			this.$root.$i18n.locale = langue
			this.$parent.$parent.langue = langue
			document.getElementsByTagName('html')[0].setAttribute('lang', langue)
			MM.App.setLanguage(langue)
			this.$parent.$parent.notification = this.$t('langueModifiee')
			localStorage.setItem('mindmymap_lang', langue)
		},
		modifierReponseVisible (valeur) {
			this.reponseVisible = valeur
			this.$nextTick(function () {
				const el = document.querySelector('#conteneur-reponse-secrete .icone')
				if (el) el.focus()
			})
		},
		ouvrirModaleCarte () {
			this.elementPrecedent = (document.activeElement || document.body)
			this.modale = 'carte'
			this.$nextTick(function () {
				const el = document.querySelector('.modale input')
				if (el) el.focus()
			})
		},
		fermerModaleCarte () {
			this.modale = ''
			this.nom = ''
			this.question = ''
			this.reponse = ''
			this.reponseVisible = false
			this.gererFocus()
		},
		creerCarte () {
			if (this.nom === '') {
				this.$parent.$parent.message = this.$t('remplirTitre')
				return
			}
			if (this.question === '') {
				this.$parent.$parent.message = this.$t('selectionnerQuestionSecrete')
				return
			}
			if (this.reponse === '') {
				this.$parent.$parent.message = this.$t('remplirReponseSecrete')
				return
			}
			this.$parent.$parent.chargement = true
			const xhr = new XMLHttpRequest()
			xhr.onload = function () {
				if (xhr.readyState === xhr.DONE && xhr.status === 200) {
					this.$parent.$parent.chargement = false
					this.fermerModaleCarte()
					if (xhr.responseText !== 'erreur') {
						this.$router.push('/m/' + xhr.responseText)
					} else {
						this.$parent.$parent.message = this.$t('erreurServeur')
					}
				} else {
					this.$parent.$parent.chargement = false
					this.fermerModaleCarte()
					this.$parent.$parent.message = this.$t('erreurServeur')
				}
			}.bind(this)
			xhr.open('POST', this.$parent.$parent.hote + 'inc/creer_carte.php', true)
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
			xhr.send('nom=' + encodeURIComponent(this.nom) + '&question=' + encodeURIComponent(this.$t(this.question)) + '&reponse=' + encodeURIComponent(this.reponse))
		},
		gererFocus () {
			this.$nextTick(function () {
				if (this.elementPrecedent) {
					this.elementPrecedent.focus()
					this.elementPrecedent = null
				}
			})
		},
		gererClavier (event) {
			if (event.key === 'Escape' && this.modale !== '') {
				this.fermerModaleCarte()
			}
		}
	}
}
</script>
