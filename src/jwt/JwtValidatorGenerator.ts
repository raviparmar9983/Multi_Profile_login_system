import jwt, { JwtPayload } from 'jsonwebtoken'


export default class Jwt {
    private jwtservice;
    constructor() {
        this.jwtservice = jwt;
    }
    
    public async genrate(useId: String, profileId: string): Promise<String|void> {
        try{
            const token = this.jwtservice.sign({ useId, profileId }, process.env.SECRET_KEY!, { expiresIn: process.env.EXPIRES });
            return token
        }
        catch(err){
            throw err
        }
    }
    public async verifyJWT(token:string){
        return new Promise((resolve,reject)=>{
            this.jwtservice.verify(token,process.env.SECRET_KEY!,(err,decoded)=>{
                if(err){
                    if(err.name==='TokenExpiredError'){
                        reject(new Error('Token Expired please login again'))
                    }
                    else{
                        reject(err)
                    }
                }
                else{
                    resolve(decoded);
                }
            })
        })
    }
}