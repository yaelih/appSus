import appHeader from "../cmps/app-header.js"
import appFotter from '../cmps/app-fotter.js'
export default {
	template: `
  	<section class="home-main">
    	<h2><span class="connect">Connect.</span><span class="collaborate">Collaborate.</span><span class="create">Create.</span></h2>
        <img class="home-responsive" src="./img/responsive.png"/>
        <!-- <h2><span class="connect">Connect. </span><span class="connect">Collaborate. <span></span class="connect">Create. </span></h2> -->
      
        <div class="go-to">
			<div class="try-home"> 
				<div class="go-to-home email">
					<div class="go-to-icon"><i class="fas fa-envelope"></i></div>
					<h3>Email</h3>
					<p>Use email to send and get messages</p>
					<button @click="goTo('/mail/inbox')">Go to Email</button>
				</div>
				<div class="go-to-home notes">
					<div  class="go-to-icon"><i class="fas fa-sticky-note"></i></div>
					<h3>Notes</h3>
					<p>Use notes to save all the stuff you want</p>
					<button @click="goTo('/note')" >Go to Notes</button>
				</div>
			</div>
      	</div>
      	<app-fotter />
    </section>
    `,
	methods: {
		goTo(url) {
			this.$router.push(url)
		}
	},
	components: {
		appHeader,
		appFotter
	}
}
