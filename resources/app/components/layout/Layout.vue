<template>
	<div :class="getNavStyle">
		<top-nav></top-nav>
		<div class="wrapper-box">
			<side-nav></side-nav>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
    import TopNav from './TopNav'
    import SideNav from './SideNav'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                navStyle: 'global/navStyle'
            }),
            getNavStyle() {
                if (this.navStyle == 'default') {
                    return { 
                        'wrapper': true 
                    }
                } else if (this.navStyle == 'compact-nav') {
                    return { 
                        'wrapper': true, 
                        'compact-nav': true  
                    }
                } else {
                    return { 
                        'wrapper': true, 
                        'fixed-nav': true 
                    }
                }
            }
        },
        components: {
            'top-nav': TopNav,
            'side-nav': SideNav
        },
        methods: {
            getActiveUser() {
                var user = JSON.parse(localStorage.getItem('user'))
                if (user !== null) {
                    this.$store.dispatch('global/setActiveUser', user)
                } else {
                    this.$store.dispatch('global/setActiveUser', false)
                }
            },
            setNav() {
                if (this.$route.params.navStyle == 'fixed-menu') {
                    this.$store.dispatch('global/setNavStyle', 'fixed-nav')
                } else if (this.$route.params.navStyle == 'compact-menu') {
                    this.$store.dispatch('global/setNavStyle', 'compact-nav')
                } else {
                    this.$store.dispatch('global/setNavStyle', 'default')
                }
            }
        },
        watch: {
            '$route' (to, from) {
                this.setNav()
            }
        },
        created() {
            this.getActiveUser()
        },
        mounted() {
            this.setNav()
        }
    }
</script>
