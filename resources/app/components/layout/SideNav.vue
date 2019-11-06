<template>
	<div class="side-nav">
		<div class="side-nav-box">
			<template v-for="(menuSection, key) in menuSections">
				<div class="title">{{ key }}</div>
				<div class="main-menu">
					<ul>
						<li v-if="menu.parent_id == 0" v-for="menu in menuSection">
							<router-link :to="routeTo(menu)">
								<i :class="menu.icon"></i> 
								<span>{{ menu.title }}</span>
								<div v-if="menu.child_count && randNumber(0, 1)" class="count">{{ menu.child_count }}</div>
							</router-link>
							<ul v-if="menu.child_count">
								<li v-if="childMenu.parent_id == menu.id" v-for="childMenu in menuSection">
									<router-link :to="routeTo(childMenu)">{{ childMenu.title }}</router-link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</template>
			<div class="side-banner">
				<div class="banner-content">
					<div class="title">Platinum <div class="version">v1.0</div></div>
					<div class="subtitle">Laravel & Vuejs SPA Admin Starter</div>
					<a class="purchase" href="">Purchase Now</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		computed: mapGetters({
            menuSections: 'global/menuSections'
        }),
        watch: {
        	menuSections() {
        		this.$nextTick(() => {
					this.initNav()
				})
        	}
        },
		methods: {
			randNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min
			},
			routeTo(menu) {
				var route = {
					name: menu.route_name
				}

				if (menu.params.length) {
					route.params = JSON.parse(menu.params)
				}

				if (menu.query.length) {
					route.query = JSON.parse(menu.query)
				}

				return route
			},
			initNav() {
				$('.side-nav').find('.main-menu').find('a').each(function() {
					if ($(this).parent().find('ul').length > 0) {
						$(this).attr('href', 'javascript:;')
					}

					$(this).off()
					$(this).on('click', function() {
						var li = $(this).parent()
						if ($(li).parent().parent().hasClass('main-menu')) {
							if (!$(li).hasClass('active')) {
								$('.side-nav').find('.main-menu > ul > li').removeClass('active')
								$(li).addClass('active')
							} else {
								$(li).removeClass('active')
							}
						}
					})
				})
			},
			getUserMenus() {
				this.$store.dispatch('global/getUserMenus').catch((err) => {
                    console.log(err)
                })
			}
		},
		mounted() {
			this.getUserMenus()
		}
    }
</script>