<template>
  <div id="emojis">
    <h5>{{ $t('emoticones') }}</h5>
    <div class="categorie">
      <span
        v-for="(emoticone, indexEmoticone) in emoticones"
        :key="'emoticone_' + indexEmoticone"
        role="button"
        tabindex="0"
        @click="insererEmoji(emoticone)"
        @keydown.enter.space.prevent="insererEmoji(emoticone)"
      >{{ emoticone }}</span>
    </div>
    <h5>{{ $t('gestesEtCorps') }}</h5>
    <div class="categorie">
      <span
        v-for="(geste, indexGeste) in gestes"
        :key="'geste_' + indexGeste"
        role="button"
        tabindex="0"
        @click="insererEmoji(geste)"
        @keydown.enter.space.prevent="insererEmoji(geste)"
      >{{ geste }}</span>
    </div>
    <h5>{{ $t('nature') }}</h5>
    <div class="categorie">
      <span
        v-for="(nature, indexNature) in natures"
        :key="'nature_' + indexNature"
        role="button"
        tabindex="0"
        @click="insererEmoji(nature)"
        @keydown.enter.space.prevent="insererEmoji(nature)"
      >{{ nature }}</span>
    </div>
    <h5>{{ $t('aliments') }}</h5>
    <div class="categorie">
      <span
        v-for="(aliment, indexAliment) in aliments"
        :key="'aliment_' + indexAliment"
        role="button"
        tabindex="0"
        @click="insererEmoji(aliment)"
        @keydown.enter.space.prevent="insererEmoji(aliment)"
      >{{ aliment }}</span>
    </div>
    <h5>{{ $t('objets') }}</h5>
    <div class="categorie">
      <span
        v-for="(objet, indexObjet) in objets"
        :key="'objet_' + indexObjet"
        role="button"
        tabindex="0"
        @click="insererEmoji(objet)"
        @keydown.enter.space.prevent="insererEmoji(objet)"
      >{{ objet }}</span>
    </div>
    <h5>{{ $t('lieux') }}</h5>
    <div class="categorie">
      <span
        v-for="(lieu, indexLieu) in lieux"
        :key="'lieu_' + indexLieu"
        role="button"
        tabindex="0"
        @click="insererEmoji(lieu)"
        @keydown.enter.space.prevent="insererEmoji(lieu)"
      >{{ lieu }}</span>
    </div>
  </div>
</template>

<script>
export default {
	name: 'Emojis',
	data () {
		return {
			emoticones: ['😀','😃','😄','😁','😆','😅','😂','🤣','🥲','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','🤡','👻','💀','👽','👾','🤖','🎃','😺','😸','😹','😻','😼','😽','🙀','😿','😾'],
			gestes: ['👋','🤚','✋','🖖','👌','🤌','🤏','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','💅','🤳','💪','🦾','🦵','🦿','🦶','👣','👂','🦻','👃','🫀','🫁','🧠','🦷','🦴','👀','👅','👄','💋','🩸'],
			natures: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐻','🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🪳','🦟','🦗','🕷','🕸','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🦣','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦬','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕','🦺','🐈','🪶','🐓','🦃','🦤','🦚','🦜','🦢','🦩','🐇','🦝','🦨','🦡','🦫','🦦','🦥','🐁','🐀','🐿','🦔','🐾','🐉','🐲','🌵','🎄','🌲','🌳','🌴','🪵','🌱','🌿','🍀','🎍','🪴','🎋','🍃','🍂','🍁','🍄','🐚','🪨','🌾','💐','🌷','🌹','🥀','🌺','🌸','🌼','🌻','🌞','🌝','🌛','🌜','🌚','🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','🌎','🌍','🌏','🪐','💫','⭐','🌟','✨','💥','🔥','🌈','⛅','⛄','💨','💧','💦','🌊'],
			aliments: ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🫑','🌽','🥕','🫒','🧄','🧅','🥔','🍠','🥐','🥯','🍞','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🫓','🥪','🥙','🧆','🌮','🌯','🫔','🥗','🥘','🫕','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥠','🥮','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🥛','🍼','🫖','🍵','🧃','🥤','🧋','🍶','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🧉','🍾','🧊','🥄','🍴','🥣','🥡','🥢','🧂'],
			objets: ['🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','📞','📟','📠','📡','📺','📻','🔊','🔔','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔌','🔋','🔍','🛀','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💳','💸','📲','📧','📥','📤','📩','📨','📫','📪','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','📌','📎','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🎳','⛳','🏁','🏆','🎿','🏂','🏊','🏄','🎣','🍵','🍶'],
			lieux: ['🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚀','💺','🚉','🚄','🚅','🚇','🚃','🚌','🚙','🚗','🚕','🚚','🚨','🚓','🚒','🚑','🚲','💈','🚏','🎫','🚥','🚧','🔰','⛽','🏮','🎰','🗿','🎪','🎭','📍','🚩']
		}
	},
	methods: {
		insererEmoji (emoji) {
			this.$emit('emoji', emoji)
		}
	}
}
</script>

<style scoped>
#emojis {
	position: fixed;
	top: 85px;
	height: 30rem;
    width: 30rem;
	padding: 1rem;
	border: 1px solid #ddd;
	background: #fff;
	box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.2);
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	z-index: 10;
	line-height: 1.25;
}

#emojis h5 {
	margin: 0 0 4px 0;
	text-transform: uppercase;
	font-size: 1.2rem;
	cursor: default;
}

.categorie {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 1.5rem;
}

.categorie:after {
	content: '';
	flex: auto;
}

.categorie span {
	font-size: 2rem;
	padding: 2px;
	cursor: pointer;
	border-radius: 0.5rem;
}

.categorie span:hover {
	background: #ececec;
	cursor: pointer;
}
</style>
