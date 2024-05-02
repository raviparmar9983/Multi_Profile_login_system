import express,{Router} from 'express'
import ProfileController from '../controllers/profileController'

import Authenticator from '../middlerware/authentication'
const router:Router=express.Router()

const authenticator=new Authenticator();

router.route('/profile')
.get(authenticator.authenticate,ProfileController.getAllProfiles)
.post(authenticator.authenticate,ProfileController.createProfile)
.patch(authenticator.authenticate,ProfileController.updateProfile)

// router.route('/profile/switch')
// .post(authenticator.authenticate,ProfileController.switchprofile)


export default router