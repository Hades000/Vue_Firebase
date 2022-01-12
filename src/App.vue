<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="site.drawer = !site.drawer" />
      <site-title :title ="site.title"></site-title>
      <v-spacer/>
      <site-sign></site-sign>
    </v-app-bar>
    <v-navigation-drawer app v-model="site.drawer" width="400">
      <site-menu :items="site.menu"></site-menu>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <site-footer :footer="site.footer"></site-footer>
  </v-app>
</template>

<script>
import SiteTitle from '@/views/Site/title'
import SiteFooter from '@/views/Site/Footer'
import SiteMenu from '@/views/Site/Menu'
import SiteSign from '@/views/Site/sign'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu, SiteSign },
  name: 'App',
  data () {
    return {
      site: {
        drawer: false,
        menu: [
          {
            title: 'home',
            icon: 'mdi-home',
            actvie: true,
            subItems: [
              {
                title: 'DashBoard',
                to: '/'
              },
              {
                title: 'About',
                to: '/about'
              }
            ]
          },
          {
            title: 'about',
            actvie: true,
            icon: 'mdi-account',
            subItems: [
              {
                title: 'xxx',
                to: '/xxx'
              }
            ]
          }
        ],
        title: '나의 타이틀',
        footer: '푸터'
      }
    }
  },

  created () {
    this.subscribe()
  },

  methods: {
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        const v = sn.val()

        if (!v) {
          this.$firebase.database().ref().child('site').set(this.site)
        }
        this.site = v
      }, (e) => {
        console.log(e.message)
      })
    }
  }
}
</script>
