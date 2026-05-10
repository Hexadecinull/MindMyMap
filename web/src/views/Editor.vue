<template>
  <div id="page">
    <div
      id="carte"
      :class="{'iframe': integration}"
    >
      <!-- ── TOP BAR ── -->
      <header
        v-if="!integration"
        id="header"
      >
        <a
          id="conteneur-logo"
          :href="definirRacine()"
          :title="$t('accueil')"
          :aria-label="$t('accueil')"
        >
          <div class="logo-mark"><i
            class="material-icons"
            aria-hidden="true"
          >hub</i></div>
          <span class="logo-wordmark">Mind<em>My</em>Map</span>
        </a>
        <div
          id="topbar-sep"
          aria-hidden="true"
        />
        <span id="titre">{{ nom }}</span>
        <div id="topbar-actions">
          <!-- Save -->
          <span
            v-if="admin"
            class="topbar-btn primary"
            role="button"
            :tabindex="definirTabIndex()"
            :title="$t('enregistrer')"
            :aria-label="$t('enregistrer')"
            @click="enregistrer"
            @keydown.enter.space.prevent="enregistrer"
          >
            <i
              class="material-icons"
              aria-hidden="true"
            >save</i>{{ $t('enregistrer') }}
          </span>
          <!-- Share -->
          <span
            id="conteneur-partage"
            class="topbar-btn"
            role="button"
            :tabindex="definirTabIndex()"
            :title="$t('partager')"
            :aria-label="$t('partager')"
            :aria-haspopup="true"
            :aria-expanded="menu"
            @click="afficherMenuPartager"
            @keydown.enter.space.prevent="afficherMenuPartager"
          >
            <i
              class="material-icons"
              aria-hidden="true"
            >share</i>{{ $t('partager') }}
          </span>
          <!-- Settings (admin) / Login -->
          <span
            v-if="admin"
            class="topbar-btn"
            role="button"
            :tabindex="definirTabIndex()"
            :title="$t('parametres')"
            :aria-label="$t('parametres')"
            @click="ouvrirModaleCarte"
            @keydown.enter.space.prevent="ouvrirModaleCarte"
          >
            <i
              class="material-icons"
              aria-hidden="true"
            >settings</i>
          </span>
          <span
            v-else
            class="topbar-btn"
            role="button"
            :tabindex="definirTabIndex()"
            :title="$t('seConnecter')"
            :aria-label="$t('seConnecter')"
            @click="ouvrirModaleConnexion"
            @keydown.enter.space.prevent="ouvrirModaleConnexion"
          >
            <i
              class="material-icons"
              aria-hidden="true"
            >lock_open</i>
          </span>
        </div>
      </header>

      <!-- ── LEFT SIDEBAR (tools) ── -->
      <div
        v-if="!integration"
        id="outils"
      >
        <div id="conteneur-outils">
          <!-- History -->
          <div
            v-if="admin"
            class="outils communs"
          >
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('defaire')"
              :aria-label="$t('defaire')"
              @click="executer('Undo')"
              @keydown.enter.space.prevent="executer('Undo')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >undo</i></span>
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('refaire')"
              :aria-label="$t('refaire')"
              @click="executer('Redo')"
              @keydown.enter.space.prevent="executer('Redo')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >redo</i></span>
          </div>

          <!-- View -->
          <div class="outils view">
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('zoomer')"
              @click="executer('ZoomIn')"
              @keydown.enter.space.prevent="executer('ZoomIn')"
            ><i class="material-icons">zoom_in</i></span>
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('dezoomer')"
              @click="executer('ZoomOut')"
              @keydown.enter.space.prevent="executer('ZoomOut')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >zoom_out</i></span>
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('centrer')"
              @click="executer('Center')"
              @keydown.enter.space.prevent="executer('Center')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >center_focus_strong</i></span>
          </div>

          <!-- Node editing -->
          <div
            v-if="admin"
            class="outils noeud"
          >
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('ajouterNoeud')"
              @click="executer('InsertChild')"
              @keydown.enter.space.prevent="executer('InsertChild')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >add_circle_outline</i></span>
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('modifierItem')"
              @click="modifierItem"
              @keydown.enter.space.prevent="modifierItem"
            ><i
              class="material-icons"
              aria-hidden="true"
            >edit</i></span>
            <span
              v-if="niveau > 0"
              class="outil supprimer"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('supprimerNoeud')"
              @click="executer('Delete')"
              @keydown.enter.space.prevent="executer('Delete')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >delete</i></span>
          </div>

          <!-- Format -->
          <div
            v-if="admin"
            class="outils format"
          >
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('mettreGras')"
              @click="modifierStyle('Bold')"
              @keydown.enter.space.prevent="modifierStyle('Bold')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >format_bold</i></span>
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('mettreItalique')"
              @click="modifierStyle('Italic')"
              @keydown.enter.space.prevent="modifierStyle('Italic')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >format_italic</i></span>
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('souligner')"
              @click="modifierStyle('Underline')"
              @keydown.enter.space.prevent="modifierStyle('Underline')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >format_underlined</i></span>
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('barrer')"
              @click="modifierStyle('Strikethrough')"
              @keydown.enter.space.prevent="modifierStyle('Strikethrough')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >format_strikethrough</i></span>
            <label
              for="couleur"
              class="couleur outil"
              :tabindex="definirTabIndex()"
              :title="$t('modifierCouleur')"
              :aria-label="$t('modifierCouleur')"
              @keydown.enter.space.prevent="activerInput('couleur')"
            >
              <i class="material-icons">colorize</i>
              <input
                id="couleur"
                type="color"
                :value="couleur"
                @change="modifierCouleur($event.target.value)"
              >
            </label>
            <select
              :title="$t('ellipse')"
              @change="modifierForme($event.target.value)"
            >
              <option
                value="Ellipse"
                :selected="forme === 'Ellipse'"
              >
                ⬭
              </option>
              <option
                value="Box"
                :selected="forme === 'Box'"
              >
                ▭
              </option>
              <option
                v-if="niveau > 1"
                value="Underline"
                :selected="forme === 'Underline'"
              >
                -
              </option>
            </select>
          </div>

          <!-- Emoji & Link -->
          <div
            v-if="admin"
            class="outils emojis"
          >
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('ajouterEmoji')"
              @click="afficherEmojis"
              @keydown.enter.space.prevent="afficherEmojis"
            ><i
              class="material-icons"
              aria-hidden="true"
            >insert_emoticon</i></span>
            <span
              v-if="emoji !== '' && emoji !== null"
              class="outil supprimer"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('supprimerEmoji')"
              @click="modifierEmoji('')"
              @keydown.enter.space.prevent="modifierEmoji('')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >block</i></span>
          </div>

          <div
            v-if="admin && niveau > 0"
            class="outils lien"
          >
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('ajouterLien')"
              @click="ajouterLien"
              @keydown.enter.space.prevent="ajouterLien"
            ><i
              class="material-icons"
              aria-hidden="true"
            >add_link</i></span>
            <span
              v-if="lien !== '' && lien !== null"
              class="outil supprimer"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('supprimerLien')"
              @click="supprimerLien"
              @keydown.enter.space.prevent="supprimerLien"
            ><i
              class="material-icons"
              aria-hidden="true"
            >link_off</i></span>
          </div>

          <!-- Status -->
          <div
            v-if="admin"
            class="outils statut"
          >
            <span
              v-if="statut !== 'yes'"
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('modifierStatut')"
              @click="modifierStatut('yes')"
              @keydown.enter.space.prevent="modifierStatut('yes')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >done</i></span>
            <span
              v-if="statut !== 'no'"
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('modifierStatut')"
              @click="modifierStatut('no')"
              @keydown.enter.space.prevent="modifierStatut('no')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >close</i></span>
            <span
              v-if="statut === 'yes' || statut === 'no'"
              class="outil supprimer"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('annulerStatut')"
              @click="modifierStatut('')"
              @keydown.enter.space.prevent="modifierStatut('')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >block</i></span>
          </div>

          <!-- Notes & Help -->
          <div class="outils notes">
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('afficherNotes')"
              @click="afficherNotes('icone')"
              @keydown.enter.space.prevent="afficherNotes('icone')"
            ><i
              class="material-icons"
              aria-hidden="true"
            >speaker_notes</i></span>
          </div>
          <div
            v-if="admin"
            class="outils aide"
          >
            <span
              class="outil"
              role="button"
              :tabindex="definirTabIndex()"
              :title="$t('afficherRaccourcis')"
              @click="ouvrirModaleAide"
              @keydown.enter.space.prevent="ouvrirModaleAide"
            ><i
              class="material-icons"
              aria-hidden="true"
            >help_outline</i></span>
          </div>
        </div>
      </div>

      <!-- ── CANVAS ── -->
      <div id="conteneur">
        <ul
          id="port"
          aria-live="polite"
        />
      </div>

      <!-- ── SHARE DROPDOWN ── -->
      <div
        v-if="menu"
        id="menu-partager"
        role="menu"
        aria-labelledby="conteneur-partage"
      >
        <div id="conteneur-partager">
          <label>{{ $t('lienEtCodeQR') }}</label>
          <div
            id="copier-lien"
            class="copier"
          >
            <input
              type="text"
              disabled
              :value="definirRacine() + '#/m/' + id"
            >
            <span
              class="icone lien"
              role="button"
              :tabindex="menu ? 0 : -1"
              :title="$t('copierLien')"
              :aria-label="$t('copierLien')"
              @keydown.enter.space.prevent="copierLien"
            ><i
              class="material-icons"
              aria-hidden="true"
            >content_copy</i></span>
            <span
              class="icone codeqr"
              role="button"
              :tabindex="menu ? 0 : -1"
              :title="$t('afficherCodeQR')"
              :aria-label="$t('afficherCodeQR')"
              @click="afficherCodeQR"
              @keydown.enter.space.prevent="afficherCodeQR"
            ><i
              class="material-icons"
              aria-hidden="true"
            >qr_code</i></span>
          </div>
          <label>{{ $t('codeIntegration') }}</label>
          <div
            id="copier-iframe"
            class="copier"
          >
            <input
              type="text"
              disabled
              :value="'<iframe src=&quot;' + definirRacine() + '#/m/' + id + '&quot; allowfullscreen frameborder=&quot;0&quot; width=&quot;100%&quot; height=&quot;500&quot;></iframe>'"
            >
            <span
              class="icone"
              role="button"
              :tabindex="menu ? 0 : -1"
              :title="$t('copierCode')"
              :aria-label="$t('copierCode')"
              @keydown.enter.space.prevent="copierIframe"
            ><i
              class="material-icons"
              aria-hidden="true"
            >content_copy</i></span>
          </div>
          <label>{{ $t('exporterImage') }}</label>
          <span
            class="bouton"
            role="button"
            :tabindex="menu ? 0 : -1"
            @click="exporterImage"
            @keydown.enter.space.prevent="exporterImage"
          >{{ $t('exporter') }}</span>
          <label>{{ $t('exporterTexte') }}</label>
          <span
            class="bouton"
            role="button"
            :tabindex="menu ? 0 : -1"
            @click="exporterTexte"
            @keydown.enter.space.prevent="exporterTexte"
          >{{ $t('exporter') }}</span>
          <p class="credits">
            {{ $t('creeeAvec') }}<a
              href="https://github.com/mindmymap/mindmymap"
              target="_blank"
              rel="noreferrer"
            ><u>MindMyMap</u></a>
          </p>
        </div>
      </div>

      <!-- ── NOTES PANEL ── -->
      <div
        v-if="notes"
        id="notes"
        class="menu droite"
        role="menu"
      >
        <header>
          <span class="titre">{{ $t('notesItem') }}</span>
          <span
            class="fermer"
            role="button"
            :tabindex="notes ? 0 : -1"
            :title="$t('fermer')"
            :aria-label="$t('fermer')"
            @click="fermerNotes"
            @keydown.enter.space.prevent="fermerNotes"
          ><i
            class="material-icons"
            aria-hidden="true"
          >close</i></span>
        </header>
        <div class="conteneur">
          <div
            v-if="admin"
            class="contenu"
          >
            <div id="texte" />
            <input
              id="couleur-texte"
              type="color"
              value="#000000"
              style="display:none"
            >
          </div>
          <div
            v-else
            class="contenu note"
          >
            <div id="note" />
          </div>
        </div>
      </div>
    </div>

    <!-- ── MODALS ── -->

    <!-- Keyboard shortcuts -->
    <div
      v-if="modale === 'aide'"
      class="conteneur-modale"
    >
      <div
        id="aide"
        class="modale"
        role="dialog"
      >
        <header>
          <span class="titre">{{ $t('raccourcisClavier') }}</span>
          <span
            class="fermer"
            role="button"
            :tabindex="definirTabIndexModale()"
            :title="$t('fermer')"
            :aria-label="$t('fermer')"
            @click="fermerModale"
            @keydown.enter.space.prevent="fermerModale"
          ><i
            class="material-icons"
            aria-hidden="true"
          >close</i></span>
        </header>
        <div class="conteneur">
          <div class="contenu">
            <label>{{ $t('naviguer') }}</label>
            <p v-html="$t('racDeplacerCarte')" /><p v-html="$t('racSelectionnerElement')" /><p v-html="$t('racSelectionnerRacine')" />
            <p v-html="$t('racSelectionnerParent')" /><p v-html="$t('racZoomer')" /><p v-html="$t('racPlier')" /><p v-html="$t('racNotes')" />
            <label>{{ $t('manipuler') }}</label>
            <p v-html="$t('racDefaire')" /><p v-html="$t('racInsererElementParallele')" /><p v-html="$t('racInsererEnfant')" />
            <p v-html="$t('racChangerPosition')" /><p v-html="$t('racChangerCote')" /><p v-html="$t('racSupprimerElement')" />
            <p v-html="$t('racCopierElement')" /><p v-html="$t('racCouperElement')" /><p v-html="$t('racCollerElement')" />
            <label>{{ $t('modifier') }}</label>
            <p v-html="$t('racModifierStatut')" /><p v-html="$t('racModifierTexte')" /><p v-html="$t('racInsererLigne')" />
            <p v-html="$t('racMettreGras')" /><p v-html="$t('racMettreIntalique')" /><p v-html="$t('racSouligner')" /><p v-html="$t('racBarrer')" />
          </div>
        </div>
      </div>
    </div>

    <!-- Login -->
    <div
      v-else-if="modale === 'connexion'"
      class="conteneur-modale"
    >
      <div
        class="modale"
        role="dialog"
      >
        <header>
          <span class="titre">{{ $t('connexion') }}</span>
          <span
            class="fermer"
            role="button"
            :tabindex="definirTabIndexModale()"
            :title="$t('fermer')"
            :aria-label="$t('fermer')"
            @click="fermerModaleConnexion"
            @keydown.enter.space.prevent="fermerModaleConnexion"
          ><i
            class="material-icons"
            aria-hidden="true"
          >close</i></span>
        </header>
        <div class="conteneur">
          <div
            class="contenu"
            role="form"
            :aria-label="$t('connexion')"
          >
            <label for="question-secrete">{{ $t('questionSecrete') }}</label>
            <select
              id="question-secrete"
              :value="question"
              @change="question = $event.target.value"
            >
              <option
                value=""
                selected
              >
                -
              </option>
              <option
                v-for="(item, index) in questions"
                :key="'option_' + index"
                :value="item"
              >
                {{ $t(item) }}
              </option>
            </select>
            <label for="reponse-secrete">{{ $t('reponseSecrete') }}</label>
            <div id="conteneur-reponse-secrete">
              <input
                id="reponse-secrete"
                :type="reponseVisible ? 'text' : 'password'"
                :value="reponse"
                @input="reponse = $event.target.value"
                @keydown.enter="debloquerCarte"
              >
              <span
                class="icone"
                role="button"
                :tabindex="definirTabIndexModale()"
                :title="reponseVisible ? $t('masquer') : $t('afficher')"
                :aria-label="reponseVisible ? $t('masquer') : $t('afficher')"
                @click="modifierReponseVisible(!reponseVisible)"
                @keydown.enter.space.prevent="modifierReponseVisible(!reponseVisible)"
              ><i
                class="material-icons"
                aria-hidden="true"
              >{{ reponseVisible ? 'visibility_off' : 'visibility' }}</i></span>
            </div>
            <div class="actions">
              <span
                class="bouton"
                role="button"
                :tabindex="definirTabIndexModale()"
                @click="debloquerCarte"
                @keydown.enter.space.prevent="debloquerCarte"
              >{{ $t('valider') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Settings, rename, access, import, delete -->
    <div
      v-else-if="modale === 'carte' || modale === 'modifier-nom' || modale === 'modifier-acces' || modale === 'importer' || modale === 'supprimer-carte'"
      class="conteneur-modale"
    >
      <div
        v-if="modale === 'carte'"
        id="modale-parametres"
        class="modale"
        role="dialog"
      >
        <header>
          <span class="titre">{{ $t('parametresCarte') }}</span>
          <span
            class="fermer"
            role="button"
            :tabindex="definirTabIndexModale()"
            :title="$t('fermer')"
            :aria-label="$t('fermer')"
            @click="fermerModaleCarte"
            @keydown.enter.space.prevent="fermerModaleCarte"
          ><i
            class="material-icons"
            aria-hidden="true"
          >close</i></span>
        </header>
        <div class="conteneur">
          <div class="contenu">
            <div class="langue">
              <span
                role="button"
                :tabindex="definirTabIndexModale()"
                title="Français"
                aria-label="Français"
                :class="{'selectionne': $parent.$parent.langue === 'fr'}"
                @click="modifierLangue('fr')"
                @keydown.enter.space.prevent="modifierLangue('fr')"
              >FR</span>
              <span
                role="button"
                :tabindex="definirTabIndexModale()"
                title="Italiano"
                aria-label="Italiano"
                :class="{'selectionne': $parent.$parent.langue === 'it'}"
                @click="modifierLangue('it')"
                @keydown.enter.space.prevent="modifierLangue('it')"
              >IT</span>
              <span
                role="button"
                :tabindex="definirTabIndexModale()"
                title="English"
                aria-label="English"
                :class="{'selectionne': $parent.$parent.langue === 'en'}"
                @click="modifierLangue('en')"
                @keydown.enter.space.prevent="modifierLangue('en')"
              >EN</span>
            </div>
            <span class="vues"><b>{{ $t('nombreVues') }}</b> {{ vues }}</span>
            <span
              v-if="!digidrive"
              class="bouton large"
              role="button"
              :tabindex="definirTabIndexModale()"
              @click="ouvrirModaleNomCarte"
              @keydown.enter.space.prevent="ouvrirModaleNomCarte"
            >{{ $t('modifierNomCarte') }}</span>
            <span
              v-if="!digidrive"
              class="bouton large"
              role="button"
              :tabindex="definirTabIndexModale()"
              @click="ouvrirModaleAccesCarte"
              @keydown.enter.space.prevent="ouvrirModaleAccesCarte"
            >{{ $t('modifierAccesCarte') }}</span>
            <span
              class="bouton large"
              role="button"
              :tabindex="definirTabIndexModale()"
              @click="exporterCarte"
              @keydown.enter.space.prevent="exporterCarte"
            >{{ $t('exporterCarte') }}</span>
            <span
              class="bouton large"
              role="button"
              :tabindex="definirTabIndexModale()"
              @click="ouvrirModaleImporter"
              @keydown.enter.space.prevent="ouvrirModaleImporter"
            >{{ $t('importerCarte') }}</span>
            <span
              v-if="!digidrive"
              class="bouton large rouge"
              role="button"
              :tabindex="definirTabIndexModale()"
              @click="afficherSupprimerCarte"
              @keydown.enter.space.prevent="afficherSupprimerCarte"
            >{{ $t('supprimerCarte') }}</span>
            <span
              class="bouton large secondary"
              role="button"
              :tabindex="definirTabIndexModale()"
              @click="terminerSession"
              @keydown.enter.space.prevent="terminerSession"
            >{{ $t('terminerSession') }}</span>
          </div>
        </div>
      </div>

      <div
        v-else-if="modale === 'modifier-nom'"
        class="modale"
        role="dialog"
      >
        <header>
          <span class="titre">{{ $t('modifierNomCarte') }}</span>
          <span
            class="fermer"
            role="button"
            :tabindex="definirTabIndexModale()"
            :title="$t('fermer')"
            :aria-label="$t('fermer')"
            @click="fermerModaleNomCarte"
            @keydown.enter.space.prevent="fermerModaleNomCarte"
          ><i
            class="material-icons"
            aria-hidden="true"
          >close</i></span>
        </header>
        <div class="conteneur">
          <div
            class="contenu"
            role="form"
            :aria-label="$t('modifierNomCarte')"
          >
            <label for="nouveau-nom">{{ $t('nouveauNom') }}</label>
            <input
              id="nouveau-nom"
              type="text"
              :value="nouveaunom"
              @input="nouveaunom = $event.target.value"
              @keydown.enter="modifierNomCarte"
            >
            <div class="actions">
              <span
                class="bouton"
                role="button"
                :tabindex="definirTabIndexModale()"
                @click="modifierNomCarte"
                @keydown.enter.space.prevent="modifierNomCarte"
              >{{ $t('modifier') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="modale === 'modifier-acces'"
        class="modale"
        role="dialog"
      >
        <header>
          <span class="titre">{{ $t('modifierAccesCarte') }}</span>
          <span
            class="fermer"
            role="button"
            :tabindex="definirTabIndexModale()"
            :title="$t('fermer')"
            :aria-label="$t('fermer')"
            @click="fermerModaleAccesCarte"
            @keydown.enter.space.prevent="fermerModaleAccesCarte"
          ><i
            class="material-icons"
            aria-hidden="true"
          >close</i></span>
        </header>
        <div class="conteneur">
          <div
            class="contenu"
            role="form"
            :aria-label="$t('modifierAccesCarte')"
          >
            <label for="question-secrete">{{ $t('questionSecreteActuelle') }}</label>
            <select
              id="question-secrete"
              :value="question"
              @change="question = $event.target.value"
            >
              <option
                value=""
                selected
              >
                -
              </option>
              <option
                v-for="(item, index) in questions"
                :key="'option_' + index"
                :value="item"
              >
                {{ $t(item) }}
              </option>
            </select>
            <label for="reponse-secrete">{{ $t('reponseSecreteActuelle') }}</label>
            <input
              id="reponse-secrete"
              type="text"
              autocomplete="off"
              :value="reponse"
              @input="reponse = $event.target.value"
            >
            <label for="nouvelle-question-secrete">{{ $t('nouvelleQuestionSecrete') }}</label>
            <select
              id="nouvelle-question-secrete"
              :value="nouvellequestion"
              @change="nouvellequestion = $event.target.value"
            >
              <option
                value=""
                selected
              >
                -
              </option>
              <option
                v-for="(item, index) in questions"
                :key="'option_' + index"
                :value="item"
              >
                {{ $t(item) }}
              </option>
            </select>
            <label for="nouvelle-reponse-secrete">{{ $t('nouvelleReponseSecrete') }}</label>
            <input
              id="nouvelle-reponse-secrete"
              type="text"
              autocomplete="off"
              :value="nouvellereponse"
              @input="nouvellereponse = $event.target.value"
              @keydown.enter="modifierAccesCarte"
            >
            <div class="actions">
              <span
                class="bouton"
                role="button"
                :tabindex="definirTabIndexModale()"
                @click="modifierAccesCarte"
                @keydown.enter.space.prevent="modifierAccesCarte"
              >{{ $t('modifier') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="modale === 'importer'"
        class="modale"
        role="dialog"
      >
        <header>
          <span class="titre">{{ $t('importerCarte') }}</span>
          <span
            class="fermer"
            role="button"
            :tabindex="definirTabIndexModale()"
            :title="$t('fermer')"
            :aria-label="$t('fermer')"
            @click="modale = ''"
            @keydown.enter.space.prevent="modale = ''"
          ><i
            class="material-icons"
            aria-hidden="true"
          >close</i></span>
        </header>
        <div class="conteneur">
          <div class="contenu">
            <p style="font-size:1.4rem;color:var(--gray-600);line-height:1.6">
              {{ $t('alerteImporter') }}
            </p>
            <input
              id="importer"
              type="file"
              name="importer"
              style="display:none"
              accept=".dgm"
              @change="importerCarte"
            >
            <label
              for="importer"
              class="bouton large"
              :tabindex="definirTabIndexModale()"
              @keydown.enter.space.prevent="activerInput('importer')"
            >{{ $t('selectionnerFichier') }}</label>
          </div>
        </div>
      </div>

      <div
        v-else-if="modale === 'supprimer-carte'"
        class="modale confirmation"
        role="dialog"
      >
        <div class="conteneur entier">
          <div class="contenu">
            <p v-html="$t('confirmationSupprimerCarte')" />
            <div class="actions">
              <span
                class="bouton secondary"
                role="button"
                :tabindex="definirTabIndexModale()"
                @click="fermerModale"
                @keydown.enter.space.prevent="fermerModale"
              >{{ $t('non') }}</span>
              <span
                class="bouton rouge"
                role="button"
                :tabindex="definirTabIndexModale()"
                @click="supprimerCarte"
                @keydown.enter.space.prevent="supprimerCarte"
              >{{ $t('oui') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- QR code -->
    <div
      v-else-if="modale === 'code-qr'"
      class="conteneur-modale"
    >
      <div
        id="codeqr"
        class="modale"
        role="dialog"
      >
        <header>
          <span class="titre">{{ $t('codeQR') }}</span>
          <span
            class="fermer"
            role="button"
            tabindex="0"
            :title="$t('fermer')"
            :aria-label="$t('fermer')"
            @click="fermerModale"
            @keydown.enter.space.prevent="fermerModale"
          ><i
            class="material-icons"
            aria-hidden="true"
          >close</i></span>
        </header>
        <div class="conteneur">
          <div class="contenu">
            <div id="qr" />
          </div>
        </div>
      </div>
    </div>

    <Emojis
      v-if="emojis"
      @emoji="modifierEmoji"
    />
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import pell from 'pell'
import stripTags from 'voca/strip_tags'
import linkifyHtml from 'linkify-html'
import ClipboardJS from 'clipboard'
import Emojis from '@/components/emojis.vue'

let MM = window.MM

export default {
	name: 'Editor',
	components: { Emojis },
	data () {
		return {
			modale: '', menu: false, notes: false, admin: false,
			id: '', question: '',
			questions: ['motPrefere', 'filmPrefere', 'chansonPreferee', 'prenomMere', 'prenomPere', 'nomRue', 'nomEmployeur', 'nomAnimal'],
			reponse: '', reponseVisible: false, nom: '', nouveaunom: '',
			nouvellequestion: '', nouvellereponse: '', editeur: '',
			statut: '', lien: '', emoji: '', emojis: false,
			couleur: '#000000', forme: '', niveau: 0, vues: 0,
			elementPrecedent: null, codeqr: '', position: 0,
			enregistrement: '', donnees: '', integration: false, digidrive: false
		}
	},
	watch: {
		admin (admin) {
			const json = MM.App.map.toJSON()
			if (admin === true) { MM.App.init('admin') } else {
				MM.App.init('')
				if (this.editeur !== '') { this.editeur.removeEventListener('paste', this.coller); this.editeur = '' }
			}
			MM.App.setMap(MM.Map.fromJSON(json))
		},
		modale (valeur) { if (valeur !== '') { this.menu = false } },
		notes (valeur) { if (valeur === false) { this.editeur = '' } }
	},
	async created () {
		this.id = this.$route.params.id
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
		const question = this.$route.query.q
		const reponse = this.$route.query.r
		if (question && question !== '' && reponse && reponse !== '') {
			const q = decodeURIComponent(window.atob(question))
			const r = decodeURIComponent(window.atob(reponse))
			await fetch(this.$parent.$parent.hote + 'inc/ouvrir_carte.php', {
				method: 'post',
				headers: { 'Content-type': 'application/x-www-form-urlencoded' },
				body: 'carte=' + this.id + '&question=' + q + '&reponse=' + r + '&type=api'
			})
			window.history.replaceState({}, document.title, window.location.href.split('?')[0])
		}
		const xhr = new XMLHttpRequest()
		xhr.onload = function () {
			if (xhr.readyState === xhr.DONE && xhr.status === 200) {
				if (xhr.responseText === 'contenu_inexistant' || this.verifierJSON(xhr.responseText) === false) {
					this.$router.push('/'); return false
				}
				const reponse = JSON.parse(xhr.responseText)
				if (!reponse.nom || reponse.nom === '') { this.$router.push('/'); return false }
				this.admin = reponse.admin
				this.nom = reponse.nom
				this.vues = reponse.vues
				if (reponse.donnees !== '') {
					const donnees = JSON.parse(reponse.donnees)
					MM.App.setMap(MM.Map.fromJSON(donnees))
					this.$nextTick(() => MM.Command.Center.execute())
				}
				this.digidrive = Boolean(reponse.digidrive)
				setTimeout(function () {
					document.title = this.nom + ' - MindMyMap'
					this.$parent.$parent.chargement = false
					this.donnees = MM.App.map.toJSON()
					if (this.integration === true) { this.admin = false }
					if (this.admin === true) {
						this.enregistrement = setInterval(function () { this.enregistrerAutomatiquement() }.bind(this), 20000)
					}
				}.bind(this), 300)
			} else {
				this.$parent.$parent.chargement = false
				this.$parent.$parent.message = this.$t('erreurServeur')
			}
		}.bind(this)
		xhr.open('POST', this.$parent.$parent.hote + 'inc/recuperer_carte.php', true)
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		xhr.send('id=' + this.id)
	},
	mounted () {
		MM.App.init('')
		this.$root.$i18n.locale = this.$parent.$parent.langue
		document.getElementsByTagName('html')[0].setAttribute('lang', this.$parent.$parent.langue)
		MM.App.setLanguage(this.$parent.$parent.langue)
		this.modifierLangueRacine()

		const lien = this.definirRacine() + '#/m/' + this.id
		const clipboardLien = new ClipboardJS('#copier-lien .lien', { text: () => lien })
		clipboardLien.on('success', function () {
			document.querySelector('#copier-lien .lien').focus()
			this.$parent.$parent.notification = this.$t('lienCopie')
		}.bind(this))
		const iframe = '<iframe src="' + lien + '" allowfullscreen frameborder="0" width="100%" height="500"></iframe>'
		const clipboardIframe = new ClipboardJS('#copier-iframe span', { text: () => iframe })
		clipboardIframe.on('success', function () {
			document.querySelector('#copier-iframe span').focus()
			this.$parent.$parent.notification = this.$t('codeCopie')
		}.bind(this))

		document.addEventListener('click', function (event) {
			const partager = document.querySelector('#conteneur-partage')
			const menuPartager = document.querySelector('#menu-partager')
			if (partager && menuPartager && event.target !== partager && event.target !== menuPartager && !partager.contains(event.target) && !menuPartager.contains(event.target)) {
				this.menu = false; this.gererFocus()
			}
			const boutonEmoji = document.querySelector('.outils.emojis')
			const emojis = document.querySelector('#emojis')
			if (boutonEmoji && emojis && event.target !== boutonEmoji && event.target !== emojis && !boutonEmoji.contains(event.target) && !emojis.contains(event.target)) {
				this.emojis = false; this.gererFocus()
			}
		}.bind(this), false)

		document.addEventListener('keydown', this.gererClavier, false)
		window.addEventListener('resize', function () { if (this.menu) { this.menu = false } }.bind(this), false)
		window.addEventListener('message', function (event) {
			if (event.data === 'item') { this.verifierItem() }
			else if (event.data.hasOwnProperty('type') && event.data.type === 'notes') { this.afficherNotes(event.data.source) }
		}.bind(this), false)
		window.addEventListener('beforeunload', function (event) { event.preventDefault() }, false)
		if (window !== window.parent) { this.integration = true; this.admin = false }
	},
	beforeUnmount () {
		if (this.enregistrement !== '') { clearInterval(this.enregistrement) }
		document.removeEventListener('keydown', this.gererClavier, false)
	},
	methods: {
		definirRacine () { return window.location.href.split('#')[0] },
		modifierLangue (langue) {
			this.$root.$i18n.locale = langue
			this.$parent.$parent.langue = langue
			document.getElementsByTagName('html')[0].setAttribute('lang', langue)
			MM.App.setLanguage(langue)
			this.modifierLangueRacine()
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
		modifierLangueRacine () {
			const donnees = MM.App.map.toJSON()
			const carte = MM.Map.fromJSON(donnees)
			if (carte.getName() === 'Idée principale' || carte.getName() === 'Main idea' || carte.getName() === 'Idea principale') {
				MM.Command.SelectRoot.execute()
				const action = new MM.Action.SetText(MM.App.current, this.$t('ideePrincipale'))
				MM.App.action(action)
			}
		},
		afficherMenuPartager () {
			this.elementPrecedent = (document.activeElement || document.body)
			this.menu = 'partager'
			this.$nextTick(function () {
				const firstEl = document.querySelector('#menu-partager span')
				if (firstEl) firstEl.focus()
			}.bind(this))
		},
		copierLien () { document.querySelector('#copier-lien .lien').click() },
		copierIframe () { document.querySelector('#copier-iframe span').click() },
		afficherCodeQR () {
			this.modale = 'code-qr'
			this.$nextTick(function () {
				const lien = this.definirRacine() + '#/m/' + this.id
				 
				this.codeqr = new QRCode('qr', { text: lien, width: 320, height: 320, colorDark: '#000000', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.H })
				document.querySelector('#codeqr .fermer').focus()
			}.bind(this))
		},
		activerInput (id) { document.querySelector('#' + id).click() },
		convertirRem (rem) { return rem * parseFloat(getComputedStyle(document.documentElement).fontSize) },
		definirTabIndex () { return this.modale === '' && !this.menu && !this.notes && this.$parent.$parent.message === '' ? 0 : -1 },
		definirTabIndexModale () { return this.$parent.$parent.message === '' ? 0 : -1 },
		ouvrirModaleAide () {
			this.elementPrecedent = (document.activeElement || document.body)
			this.modale = 'aide'
			this.$nextTick(function () { document.querySelector('.modale .fermer').focus() })
		},
		fermerModale () { this.modale = ''; this.gererFocus() },
		verifierItem () {
			this.$nextTick(function () {
				const item = MM.App.current
				this.statut = item.getStatus()
				this.emoji = item.getIcon()
				this.lien = item.getLink()
				this.couleur = item.getColor() || '#000'
				this.forme = item.getShape().label
				if (this.admin && this.editeur !== '' && item.getNotes() !== null) {
					this.editeur.content.innerHTML = this.formaterHTML(item.getNotes())
				} else if (!this.admin && document.querySelector('#note') && item.getNotes() !== null) {
					document.querySelector('#note').innerHTML = this.formaterHTML(item.getNotes())
				}
				if (MM.App.current._parent.hasOwnProperty('_root')) { this.niveau = 0; return false }
				if (MM.App.current._parent.hasOwnProperty('_parent') && !MM.App.current._parent._parent.hasOwnProperty('_parent')) { this.niveau = 1; return false }
				if (MM.App.current._parent.hasOwnProperty('_parent') && MM.App.current._parent._parent.hasOwnProperty('_parent')) { this.niveau = 2 }
			}.bind(this))
		},
		executer (action) {
			const commande = MM.Command[action]
			if (!commande.isValid()) { return }
			commande.execute()
		},
		coller (event) {
			event.preventDefault(); event.stopPropagation()
			let html = event.clipboardData.getData('text/html')
			if (html !== '') {
				html = stripTags(html, ['b', 'i', 'u', 'strike', 'a', 'br', 'div', 'font', 'ul', 'ol'])
				html = html.replace(/style=".*?"/mg, '').replace(/class=".*?"/mg, '')
				html = this.formaterHTML(html)
				pell.exec('insertHTML', html)
			} else { pell.exec('insertText', event.clipboardData.getData('text/plain')) }
		},
		modifierItem () { const item = MM.App.current; if (item) { MM.Command.Edit.execute() } },
		enregistrer () {
			this.$parent.$parent.chargementTransparent = true
			const donnees = MM.App.map.toJSON()
			if (this.verifierJSON(donnees) === false) {
				const xhr = new XMLHttpRequest()
				xhr.onload = function () {
					if (xhr.readyState === xhr.DONE && xhr.status === 200) {
						this.$parent.$parent.chargementTransparent = false
						if (xhr.responseText === 'contenu_inexistant') { document.title = 'MindMyMap'; this.$router.push('/') }
						else if (xhr.responseText === 'erreur') { this.$parent.$parent.message = this.$t('erreurServeur') }
						else if (xhr.responseText === 'non_autorise') { this.$parent.$parent.message = this.$t('actionNonAutorisee') }
						else if (xhr.responseText === 'carte_modifiee') {
							this.$parent.$parent.notification = this.$t('carteEnregistree')
							if (this.enregistrement !== '') { clearInterval(this.enregistrement) }
							this.enregistrement = setInterval(function () { this.enregistrerAutomatiquement() }.bind(this), 20000)
						}
					} else { this.$parent.$parent.chargementTransparent = false; this.$parent.$parent.message = this.$t('erreurServeur') }
				}.bind(this)
				xhr.open('POST', this.$parent.$parent.hote + 'inc/modifier_carte.php', true)
				xhr.setRequestHeader('Content-type', 'application/json')
				xhr.send(JSON.stringify({ carte: this.id, donnees: JSON.stringify(donnees) }))
			} else { this.$parent.$parent.message = this.$t('erreurEnregistrement') }
		},
		enregistrerAutomatiquement () {
			const donnees = MM.App.map.toJSON()
			if (this.verifierJSON(donnees) === false && JSON.stringify(donnees) !== JSON.stringify(this.donnees)) {
				const xhr = new XMLHttpRequest()
				xhr.onload = function () {
					if (xhr.readyState === xhr.DONE && xhr.status === 200 && xhr.responseText === 'carte_modifiee') {
						this.$parent.$parent.notification = this.$t('carteEnregistreeAutomatiquement')
						this.donnees = donnees
					}
				}.bind(this)
				xhr.open('POST', this.$parent.$parent.hote + 'inc/modifier_carte.php', true)
				xhr.setRequestHeader('Content-type', 'application/json')
				xhr.send(JSON.stringify({ carte: this.id, donnees: JSON.stringify(donnees) }))
			}
		},
		verifierJSON (json) { try { JSON.parse(json); return true } catch { return false } },
		modifierCouleur (couleur) { const action = new MM.Action.SetColor(MM.App.current, couleur); MM.App.action(action); this.couleur = couleur },
		modifierStyle (style) { MM.Command[style].execute() },
		modifierStatut (statut) { const action = new MM.Action.SetStatus(MM.App.current, statut); MM.App.action(action); this.statut = statut },
		modifierForme (forme) { const action = new MM.Action.SetShape(MM.App.current, MM.Shape[forme]); MM.App.action(action); this.forme = forme },
		afficherNotes (source) {
			if (this.notes === false || (this.notes === true && source === 'item')) {
				this.elementPrecedent = (document.activeElement || document.body)
				this.notes = true
				setTimeout(function () {
					if (this.admin && this.editeur === '') {
						this.$nextTick(function () {
							if (document.querySelector('#texte').innerHTML !== '') { document.querySelector('#texte').innerHTML = '' }
							this.editeur = pell.init({
								element: document.querySelector('#texte'),
								onChange: (html) => { MM.App.current.setNotes(this.formaterHTML(html)) },
								actions: [
									{ name: 'gras', title: this.$t('gras'), icon: '<i class="material-icons">format_bold</i>', result: () => pell.exec('bold') },
									{ name: 'italique', title: this.$t('italique'), icon: '<i class="material-icons">format_italic</i>', result: () => pell.exec('italic') },
									{ name: 'souligne', title: this.$t('souligne'), icon: '<i class="material-icons">format_underlined</i>', result: () => pell.exec('underline') },
									{ name: 'barre', title: this.$t('barre'), icon: '<i class="material-icons">format_strikethrough</i>', result: () => pell.exec('strikethrough') },
									{ name: 'exposant', title: this.$t('exposant'), icon: '<i class="material-icons">superscript</i>', result: () => pell.exec('superscript') },
									{ name: 'liste-ordonnee', title: this.$t('listeOrdonnee'), icon: '<i class="material-icons">format_list_numbered</i>', result: () => pell.exec('insertOrderedList') },
									{ name: 'liste', title: this.$t('liste'), icon: '<i class="material-icons">format_list_bulleted</i>', result: () => pell.exec('insertUnorderedList') },
									{ name: 'lien', title: this.$t('lien'), icon: '<i class="material-icons">link</i>', result: () => {
										let i = 0, lienActuel = '', fragment = window.getSelection().focusNode.parentNode
										while (i < 6 && lienActuel === '') { if (fragment.href) { lienActuel = fragment.href } else { fragment = fragment.parentNode }; i++ }
										if (lienActuel !== '') { const range = document.createRange(); range.selectNodeContents(fragment); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range) }
										const url = window.prompt(this.$t('adresseLien'), lienActuel)
										if (url && url !== '') { pell.exec('createLink', url) } else if (url === '') { pell.exec('unlink') }
									} }
								],
								classes: { actionbar: 'pell-actionbar', button: 'pell-button', content: 'pell-content', selected: 'pell-button-selected' }
							})
							this.editeur.addEventListener('paste', this.coller)
							const html = MM.App.current.getNotes()
							this.editeur.content.innerHTML = (html && html !== '') ? html : '<div><br></div>'
							document.querySelector('#couleur-texte').addEventListener('input', this.modifierCouleurTexte)
							document.querySelector('#couleur-texte').addEventListener('change', this.modifierCouleurTexte)
							document.querySelector('#notes .pell-content').focus()
						}.bind(this))
					} else if (!this.admin) {
						const html = MM.App.current.getNotes()
						const noteEl = document.querySelector('#note')
						if (noteEl) noteEl.innerHTML = this.formaterHTML(html)
					}
				}.bind(this), 0)
			} else { this.notes = false }
		},
		formaterHTML (html) {
			html = linkifyHtml(html, { defaultProtocol: 'https', truncate: 50, rel: 'noreferrer', target: '_blank' })
			html = DOMPurify.sanitize(html)
			html = html.replace(/(<a [^>]*)(>)/gi, '$1 target="_blank" rel="noreferrer"$2')
			return html
		},
		fermerNotes () { this.notes = false; this.gererFocus() },
		modifierCouleurTexte (event) { pell.exec('foreColor', event.target.value) },
		afficherEmojis () {
			this.elementPrecedent = (document.activeElement || document.body)
			this.emojis = !this.emojis
			if (this.emojis === true) {
				this.$nextTick(function () {
					const el = document.querySelector('#emojis span')
					if (el) el.focus()
				}.bind(this))
			} else { this.gererFocus() }
		},
		modifierEmoji (emoji) { const action = new MM.Action.SetIcon(MM.App.current, emoji); MM.App.action(action); this.emoji = emoji },
		ajouterLien () {
			if (this.lien === null) { this.lien = '' }
			const url = window.prompt(this.$t('adresseLien'), this.lien)
			if (url) { const action = new MM.Action.SetLink(MM.App.current, url); MM.App.action(action); this.lien = url }
		},
		supprimerLien () { const action = new MM.Action.SetLink(MM.App.current, ''); MM.App.action(action); this.lien = '' },
		exporterImage () {
			const port = document.querySelector('#port')
			port.style.overflow = 'auto'
			MM.Command.SelectRoot.execute()
			MM.App.map.center()
			const largeur = port.querySelector('canvas').width
			const hauteur = port.querySelector('canvas').height
			this.$nextTick(function () {
				html2canvas(port.querySelector('li'), { width: largeur, height: hauteur, useCORS: true }).then(function (canvas) {
					saveAs(canvas.toDataURL('image/png'), 'mm_' + new Date().getTime() + '.png')
					this.$parent.$parent.notification = this.$t('imageExportee')
				}.bind(this))
			}.bind(this))
		},
		exporterTexte () {
			const donnees = MM.App.map.toJSON()
			const blob = new Blob([MM.Format.Plaintext.to(donnees)], { type: 'text/plain;charset=utf-8' })
			saveAs(blob, 'mm_' + new Date().getTime() + '.txt')
			this.$parent.$parent.notification = this.$t('texteExporte')
		},
		exporterCarte () {
			let donnees = MM.App.map.toJSON()
			donnees = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(donnees))
			saveAs(donnees, 'mm_' + new Date().getTime() + '.dgm')
			this.$parent.$parent.notification = this.$t('carteExportee')
		},
		ouvrirModaleImporter () {
			this.modale = 'importer'
			this.$nextTick(function () { document.querySelector('.modale .fermer').focus() })
		},
		importerCarte (event) {
			const fichier = event.target.files[0]
			if (!fichier || fichier.length === 0) { document.querySelector('#importer').value = ''; return false }
			this.modale = ''
			this.$parent.$parent.chargement = true
			if (this.enregistrement !== '') { clearInterval(this.enregistrement) }
			const reader = new FileReader()
			reader.onload = function (e) {
				const donnees = JSON.parse(e.target.result)
				const xhr = new XMLHttpRequest()
				xhr.onload = function () {
					if (xhr.readyState === xhr.DONE && xhr.status === 200) {
						this.$parent.$parent.chargement = false
						if (xhr.responseText === 'contenu_inexistant') { document.title = 'MindMyMap'; this.$router.push('/') }
						else if (xhr.responseText === 'erreur') { this.$parent.$parent.message = this.$t('erreurServeur') }
						else if (xhr.responseText === 'non_autorise') { this.$parent.$parent.message = this.$t('actionNonAutorisee') }
						else if (xhr.responseText === 'carte_modifiee') {
							MM.App.setMap(MM.Map.fromJSON(donnees))
							setTimeout(function () {
								this.$parent.$parent.chargement = false
								this.donnees = MM.App.map.toJSON()
								this.$parent.$parent.notification = this.$t('carteImportee')
								this.enregistrement = setInterval(function () { this.enregistrerAutomatiquement() }.bind(this), 20000)
							}.bind(this), 300)
						}
					} else { this.$parent.$parent.chargement = false; this.$parent.$parent.message = this.$t('erreurServeur') }
				}.bind(this)
				xhr.open('POST', this.$parent.$parent.hote + 'inc/modifier_carte.php', true)
				xhr.setRequestHeader('Content-type', 'application/json')
				xhr.send(JSON.stringify({ carte: this.id, donnees: JSON.stringify(donnees) }))
			}.bind(this)
			reader.readAsText(fichier)
			document.querySelector('#importer').value = ''
		},
		ouvrirModaleCarte () {
			this.elementPrecedent = (document.activeElement || document.body)
			this.modale = 'carte'
			this.$nextTick(function () { document.querySelector('.modale .fermer').focus() })
		},
		fermerModaleCarte () {
			this.modale = ''; this.question = ''; this.reponse = ''
			this.nouveaunom = ''; this.nouvellequestion = ''; this.nouvellereponse = ''
			this.gererFocus()
		},
		ouvrirModaleNomCarte () {
			this.nouveaunom = this.nom; this.modale = 'modifier-nom'
			this.$nextTick(function () { document.querySelector('.modale input').focus() })
		},
		fermerModaleNomCarte () { this.modale = ''; this.nouveaunom = ''; this.gererFocus() },
		modifierNomCarte () {
			if (this.nouveaunom !== '' && this.nom !== this.nouveaunom) {
				this.$parent.$parent.chargement = true
				const xhr = new XMLHttpRequest()
				xhr.onload = function () {
					if (xhr.readyState === xhr.DONE && xhr.status === 200) {
						this.$parent.$parent.chargement = false
						if (xhr.responseText === 'contenu_inexistant') { document.title = 'MindMyMap'; this.$router.push('/') }
						else if (xhr.responseText === 'erreur') { this.fermerModaleNomCarte(); this.$parent.$parent.message = this.$t('erreurServeur') }
						else if (xhr.responseText === 'non_autorise') { this.fermerModaleNomCarte(); this.$parent.$parent.message = this.$t('actionNonAutorisee') }
						else if (xhr.responseText === 'nom_modifie') {
							this.nom = this.nouveaunom; this.$parent.$parent.notification = this.$t('nomModifie')
							document.title = this.nom + ' - MindMyMap'; this.fermerModaleNomCarte()
						}
					} else { this.$parent.$parent.chargement = false; this.fermerModaleNomCarte(); this.$parent.$parent.message = this.$t('erreurServeur') }
				}.bind(this)
				xhr.open('POST', this.$parent.$parent.hote + 'inc/modifier_nom_carte.php', true)
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
				xhr.send('carte=' + this.id + '&nouveaunom=' + this.nouveaunom)
			} else if (this.nouveaunom === '') { this.$parent.$parent.message = this.$t('remplirChampNouveauNom') }
		},
		ouvrirModaleAccesCarte () {
			this.modale = 'modifier-acces'
			this.$nextTick(function () { document.querySelector('.modale select').focus() })
		},
		fermerModaleAccesCarte () {
			this.modale = ''; this.question = ''; this.reponse = ''
			this.nouvellequestion = ''; this.nouvellereponse = ''; this.gererFocus()
		},
		modifierAccesCarte () {
			if (this.question !== '' && this.reponse !== '' && this.nouvellequestion !== '' && this.nouvellereponse !== '') {
				this.$parent.$parent.chargement = true
				const xhr = new XMLHttpRequest()
				xhr.onload = function () {
					if (xhr.readyState === xhr.DONE && xhr.status === 200) {
						this.$parent.$parent.chargement = false; this.fermerModaleAccesCarte()
						if (xhr.responseText === 'contenu_inexistant') { document.title = 'MindMyMap'; this.$router.push('/') }
						else if (xhr.responseText === 'erreur') { this.$parent.$parent.message = this.$t('erreurServeur') }
						else if (xhr.responseText === 'non_autorise') { this.$parent.$parent.message = this.$t('informationsIncorrectes') }
						else if (xhr.responseText === 'acces_modifie') { this.$parent.$parent.notification = this.$t('accesModifie') }
					} else { this.$parent.$parent.chargement = false; this.fermerModaleAccesCarte(); this.$parent.$parent.message = this.$t('erreurServeur') }
				}.bind(this)
				xhr.open('POST', this.$parent.$parent.hote + 'inc/modifier_acces_carte.php', true)
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
				xhr.send('carte=' + this.id + '&question=' + this.question + '&reponse=' + this.reponse + '&nouvellequestion=' + this.nouvellequestion + '&nouvellereponse=' + this.nouvellereponse)
			} else if (this.question === '') { this.$parent.$parent.message = this.$t('selectionnerQuestionSecreteActuelle') }
			else if (this.reponse === '') { this.$parent.$parent.message = this.$t('indiquerReponseSecreteActuelle') }
			else if (this.nouvellequestion === '') { this.$parent.$parent.message = this.$t('selectionnerNouvelleQuestionSecrete') }
			else if (this.nouvellereponse === '') { this.$parent.$parent.message = this.$t('indiquerNouvelleReponseSecrete') }
		},
		ouvrirModaleConnexion () {
			this.elementPrecedent = (document.activeElement || document.body); this.modale = 'connexion'
			this.$nextTick(function () { document.querySelector('.modale .fermer').focus() })
		},
		fermerModaleConnexion () { this.modale = ''; this.question = ''; this.reponse = ''; this.reponseVisible = false; this.gererFocus() },
		debloquerCarte () {
			if (this.question !== '' && this.reponse !== '') {
				this.$parent.$parent.chargement = true
				const xhr = new XMLHttpRequest()
				xhr.onload = function () {
					if (xhr.readyState === xhr.DONE && xhr.status === 200) {
						this.$parent.$parent.chargement = false; this.fermerModaleConnexion()
						if (xhr.responseText === 'contenu_inexistant') { document.title = 'MindMyMap'; this.$router.push('/') }
						else if (xhr.responseText === 'erreur') { this.$parent.$parent.message = this.$t('erreurServeur') }
						else if (xhr.responseText === 'non_autorise') { this.$parent.$parent.message = this.$t('informationsIncorrectes') }
						else if (xhr.responseText === 'carte_debloquee') {
							this.notes = false; this.admin = true
							this.$parent.$parent.notification = this.$t('connexionReussie')
							this.enregistrement = setInterval(function () { this.enregistrerAutomatiquement() }.bind(this), 20000)
						}
					} else { this.$parent.$parent.chargement = false; this.fermerModaleConnexion(); this.$parent.$parent.message = this.$t('erreurServeur') }
				}.bind(this)
				xhr.open('POST', this.$parent.$parent.hote + 'inc/ouvrir_carte.php', true)
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
				xhr.send('carte=' + this.id + '&question=' + this.question + '&reponse=' + this.reponse + '&type=utilisateur')
			} else if (this.question === '') { this.$parent.$parent.message = this.$t('selectionnerQuestionSecrete') }
			else if (this.reponse === '') { this.$parent.$parent.message = this.$t('remplirReponseSecrete') }
		},
		terminerSession () {
			this.$parent.$parent.chargement = true
			const xhr = new XMLHttpRequest()
			xhr.onload = function () {
				if (xhr.readyState === xhr.DONE && xhr.status === 200) {
					this.$parent.$parent.chargement = false
					if (xhr.responseText === 'session_terminee') { this.fermerModaleCarte(); this.admin = false; this.notes = false; this.$parent.$parent.notification = this.$t('sessionTerminee') }
				} else { this.$parent.$parent.chargement = false; this.fermerModaleCarte(); this.$parent.$parent.message = this.$t('erreurServeur') }
			}.bind(this)
			xhr.open('POST', this.$parent.$parent.hote + 'inc/terminer_session_carte.php', true)
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
			xhr.send('carte=' + this.id)
		},
		afficherSupprimerCarte () {
			this.modale = 'supprimer-carte'
			this.$nextTick(function () { document.querySelector('.modale .bouton').focus() })
		},
		supprimerCarte () {
			this.modale = ''; this.$parent.$parent.chargement = true
			const xhr = new XMLHttpRequest()
			xhr.onload = function () {
				if (xhr.readyState === xhr.DONE && xhr.status === 200) {
					if (xhr.responseText === 'erreur') { this.$parent.$parent.chargement = false; this.$parent.$parent.message = this.$t('erreurServeur') }
					else if (xhr.responseText === 'non_autorise') { this.$parent.$parent.chargement = false; this.$parent.$parent.message = this.$t('actionNonAutorisee') }
					else if (xhr.responseText === 'carte_supprimee' || xhr.responseText === 'contenu_inexistant') { document.title = 'MindMyMap'; this.$router.push('/') }
				} else { this.$parent.$parent.chargement = false; this.fermerModaleCarte(); this.$parent.$parent.message = this.$t('erreurServeur') }
			}.bind(this)
			xhr.open('POST', this.$parent.$parent.hote + 'inc/supprimer_carte.php', true)
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
			xhr.send('carte=' + this.id)
		},
		gererFocus () {
			if (this.elementPrecedent) { this.elementPrecedent.focus(); this.elementPrecedent = null }
		},
		gererClavier (event) {
			if (event.key === 'Escape' && this.$parent.$parent.message !== '') { this.$parent.$parent.message = '' }
			else if (event.key === 'Escape' && this.modale === 'connexion') { this.fermerModaleConnexion() }
			else if (event.key === 'Escape' && this.modale === 'carte') { this.fermerModaleCarte() }
			else if (event.key === 'Escape' && this.modale === 'modifier-nom') { this.fermerModaleNomCarte() }
			else if (event.key === 'Escape' && this.modale === 'modifier-acces') { this.fermerModaleAccesCarte() }
			else if (event.key === 'Escape' && this.modale !== '') { this.modale = ''; this.gererFocus() }
			else if (event.key === 'Escape' && this.menu) { this.menu = false; this.gererFocus() }
			else if (event.key === 'Escape' && this.notes) { this.fermerNotes() }
			else if (event.key === 'Escape' && this.emojis) { this.emojis = false; this.gererFocus() }
		}
	}
}
</script>
