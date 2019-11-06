
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Components
import Layout from './components/layout/Layout'
import HomeTemplate from './components/template/Home'
import FormElementsTemplate from './components/template/FormElements'
import FormValidationTemplate from './components/template/FormValidation'
import FormButtonsTemplate from './components/template/FormButtons'
import FormWizardTemplate from './components/template/FormWizard'
import FileUploadTemplate from './components/template/FileUpload'
import WysiwygEditorTemplate from './components/template/WysiwygEditor'
import BasicTableTemplate from './components/template/BasicTable'
import DatatableTemplate from './components/template/Datatable'
import ChartsTemplate from './components/template/Charts'
import InvoiceTemplate from './components/template/Invoice'
import MediaTemplate from './components/template/Media'
import ChatTemplate from './components/template/Chat'
import Error404Template from './components/template/Error404'
import Error500Template from './components/template/Error500'
import BlankLayoutTemplate from './components/template/BlankLayout'
import CalendarTemplate from './components/template/Calendar'
import FontAwesomeTemplate from './components/template/FontAwesome'
import BatchTemplate from './components/template/Batch'
import DashIconTemplate from './components/template/DashIcon'
import DripIconTemplate from './components/template/DripIcon'
import EightyshadesTemplate from './components/template/Eightyshades'
import FoundationTemplate from './components/template/Foundation'
import MetrizeTemplate from './components/template/Metrize'
import SimpleLineTemplate from './components/template/SimpleLine'
import ThemifyTemplate from './components/template/Themify'
import TypeIconTemplate from './components/template/TypeIcon'
import WeatherIconTemplate from './components/template/WeatherIcon'
import LoginTemplate from './components/template/Login'
import RegisterTemplate from './components/template/Register'
import LockScreenTemplate from './components/template/LockScreen'

import Login from './components/login/Login'
import Users from './components/users/Users'
import CreateUserForm from './components/users/CreateUserForm'
import UpdateUserForm from './components/users/UpdateUserForm'
import Groups from './components/groups/Groups'
import CreateGroupForm from './components/groups/CreateGroupForm'
import UpdateGroupForm from './components/groups/UpdateGroupForm'
import Products from './components/products/Products'
import CreateProductForm from './components/products/CreateProductForm'
import UpdateProductForm from './components/products/UpdateProductForm'
import Privileges from './components/privileges/Privileges'
import Transactions from './components/transactions/Transactions'
import SingleTransaction from './components/transactions/SingleTransaction'
import UpdateProfile from './components/update-profile/UpdateProfile'
import Settings from './components/settings/Settings'
import ChangePassword from './components/change-password/ChangePassword'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '/',
				name: 'home-template',
				component: HomeTemplate
			},
			{
				path: '/compact-nav-template/:navStyle',
				name: 'compact-nav-template',
				component: HomeTemplate
			},
			{
				path: '/fixed-nav-template/:navStyle',
				name: 'fixed-nav-template',
				component: HomeTemplate
			},
			{
				path: '/form-elements-template',
				name: 'form-elements-template',
				component: FormElementsTemplate
			},
			{
				path: '/form-validation-template',
				name: 'form-validation-template',
				component: FormValidationTemplate
			},
			{
				path: '/form-buttons-template',
				name: 'form-buttons-template',
				component: FormButtonsTemplate
			},
			{
				path: '/form-wizard-template',
				name: 'form-wizard-template',
				component: FormWizardTemplate
			},
			{
				path: '/file-upload-template',
				name: 'file-upload-template',
				component: FileUploadTemplate
			},
			{
				path: '/wysiwyg-editor-template',
				name: 'wysiwyg-editor-template',
				component: WysiwygEditorTemplate
			},
			{
				path: '/basic-table-template',
				name: 'basic-table-template',
				component: BasicTableTemplate
			},
			{
				path: '/datatable-template',
				name: 'datatable-template',
				component: DatatableTemplate
			},
			{
				path: '/charts-template',
				name: 'charts-template',
				component: ChartsTemplate
			},
			{
				path: '/invoice-template',
				name: 'invoice-template',
				component: InvoiceTemplate
			},
			{
				path: '/media-template',
				name: 'media-template',
				component: MediaTemplate
			},
			{
				path: '/chat-template',
				name: 'chat-template',
				component: ChatTemplate
			},
			{
				path: '/error-404-template',
				name: 'error-404-template',
				component: Error404Template
			},
			{
				path: '/error-500-template',
				name: 'error-500-template',
				component: Error500Template
			},
			{
				path: '/blank-layout-template',
				name: 'blank-layout-template',
				component: BlankLayoutTemplate
			},
			{
				path: '/calendar-template',
				name: 'calendar-template',
				component: CalendarTemplate
			},
			{
				path: '/font-awesome-template',
				name: 'font-awesome-template',
				component: FontAwesomeTemplate
			},
			{
				path: '/batch-template',
				name: 'batch-template',
				component: BatchTemplate
			},
			{
				path: '/dashicon-template',
				name: 'dashicon-template',
				component: DashIconTemplate
			},
			{
				path: '/dripicon-template',
				name: 'dripicon-template',
				component: DripIconTemplate
			},
			{
				path: '/eightyshades-template',
				name: 'eightyshades-template',
				component: EightyshadesTemplate
			},
			{
				path: '/foundation-template',
				name: 'foundation-template',
				component: FoundationTemplate
			},
			{
				path: '/metrize-template',
				name: 'metrize-template',
				component: MetrizeTemplate
			},
			{
				path: '/simple-line-template',
				name: 'simple-line-template',
				component: SimpleLineTemplate
			},
			{
				path: '/themify-template',
				name: 'themify-template',
				component: ThemifyTemplate
			},
			{
				path: '/typeicon-template',
				name: 'typeicon-template',
				component: TypeIconTemplate
			},
			{
				path: '/weathericon-template',
				name: 'weathericon-template',
				component: WeatherIconTemplate
			},
			{
				path: 'users',
				name: 'users',
				component: Users
			},
			{
				path: 'create-user-form',
				name: 'create-user-form',
				component: CreateUserForm
			},
			{
				path: 'update-user-form/:id',
				name: 'update-user-form',
				component: UpdateUserForm
			},
			{
				path: 'groups',
				name: 'groups',
				component: Groups
			},
			{
				path: 'create-group-form',
				name: 'create-group-form',
				component: CreateGroupForm
			},
			{
				path: 'update-group-form/:id',
				name: 'update-group-form',
				component: UpdateGroupForm
			},
			{
				path: 'privileges',
				name: 'privileges',
				component: Privileges
			},
			{
				path: 'products',
				name: 'products',
				component: Products
			},
			{
				path: 'create-product-form',
				name: 'create-product-form',
				component: CreateProductForm
			},
			{
				path: 'update-product-form/:id',
				name: 'update-product-form',
				component: UpdateProductForm
			},
			{
				path: 'transactions',
				name: 'transactions',
				component: Transactions
			},
			{
				path: 'single-transaction/:invoice',
				name: 'single-transaction',
				component: SingleTransaction
			},
			{
				path: 'update-profile',
				name: 'update-profile',
				component: UpdateProfile
			},
			{
				path: 'settings',
				name: 'settings',
				component: Settings
			},
			{
				path: 'change-password',
				name: 'change-password',
				component: ChangePassword
			}
		]
	},
	{
		path: '/login-template',
		name: 'login-template',
		component: LoginTemplate
	},
	{
		path: '/register-template',
		name: 'register-template',
		component: RegisterTemplate
	},
	{
		path: '/lock-screen-template',
		name: 'lock-screen-template',
		component: LockScreenTemplate
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	}
]

const router = new VueRouter({
	mode: 'history',
	routes: routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})

router.beforeEach((to, from, next) => {

	// Nanobar
	const nanobar = new Nanobar();
	nanobar.go(30);
	nanobar.go(76);

	setTimeout(() => {
		nanobar.go(100);
	}, 1000)

	// After login
	var afterLogin = [
		'login'
	]

	// Before login
	var beforeLogin = [
		'home-template'
	]

	if (localStorage.getItem('user') !== null && afterLogin.indexOf(to.name) !== -1) {
		next({ name: 'home-template' })
	} else if (localStorage.getItem('user') === null && beforeLogin.indexOf(to.name) !== -1) {
		next({ name: 'login' }) 
	} else {
		next()
	}
})

const app = new Vue({
	store,
	router
}).$mount('#main')