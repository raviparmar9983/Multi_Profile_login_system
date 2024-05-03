import express,{Router} from 'express'
import ProfileController from '../controllers/profileController'

import Authenticator from '../middlerware/authentication'
const router:Router=express.Router()

const authenticator=new Authenticator();

router.route('/')
.get(authenticator.authenticate,authenticator.userAuthenticate,authenticator.profileAuthenticate,ProfileController.getAllProfiles)
.post(authenticator.authenticate,authenticator.userAuthenticate,authenticator.profileAuthenticate,ProfileController.createProfile)
.patch(authenticator.authenticate,authenticator.userAuthenticate,authenticator.profileAuthenticate,ProfileController.updateProfile)

router.route('/:id')
.delete(authenticator.authenticate,authenticator.userAuthenticate,ProfileController.deleteProfile);

router.route('/switch')
.post(authenticator.authenticate,authenticator.userAuthenticate,ProfileController.switchProfile)

export default router