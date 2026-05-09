<template>
	<div id="emojis">
		<h5>{{ $t('emoticones') }}</h5>
		<div class="categorie">
			<span role="button" tabindex="0" v-for="(emoticone, indexEmoticone) in emoticones" @click="insererEmoji(emoticone)" @keydown.enter.space.prevent="insererEmoji(emoticone)" :key="'emoticone_' + indexEmoticone">{{ emoticone }}</span>
		</div>
		<h5>{{ $t('gestesEtCorps') }}</h5>
		<div class="categorie">
			<span role="button" tabindex="0" v-for="(geste, indexGeste) in gestes" @click="insererEmoji(geste)" @keydown.enter.space.prevent="insererEmoji(geste)" :key="'geste_' + indexGeste">{{ geste }}</span>
		</div>
		<h5>{{ $t('nature') }}</h5>
		<div class="categorie">
			<span role="button" tabindex="0" v-for="(nature, indexNature) in natures" @click="insererEmoji(nature)" @keydown.enter.space.prevent="insererEmoji(nature)" :key="'nature_' + indexNature">{{ nature }}</span>
		</div>
		<h5>{{ $t('aliments') }}</h5>
		<div class="categorie">
			<span role="button" tabindex="0" v-for="(aliment, indexAliment) in aliments" @click="insererEmoji(aliment)" @keydown.enter.space.prevent="insererEmoji(aliment)" :key="'aliment_' + indexAliment">{{ aliment }}</span>
		</div>
		<h5>{{ $t('objets') }}</h5>
		<div class="categorie">
			<span role="button" tabindex="0" v-for="(objet, indexObjet) in objets" @click="insererEmoji(objet)" @keydown.enter.space.prevent="insererEmoji(objet)" :key="'objet_' + indexObjet">{{ objet }}</span>
		</div>
		<h5>{{ $t('lieux') }}</h5>
		<div class="categorie">
			<span role="button" tabindex="0" v-for="(lieu, indexLieu) in lieux" @click="insererEmoji(lieu)" @keydown.enter.space.prevent="insererEmoji(lieu)" :key="'lieu_' + indexLieu">{{ lieu }}</span>
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
