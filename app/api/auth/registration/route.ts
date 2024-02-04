import { YatuResponse }                 from "@/lib/server/model/sysType"
import Yatu                             from "@/lib/server/restclient/yatu"
import { NextRequest, NextResponse }    from "next/server"

export async function POST(req: NextRequest) {
    try {
      let res: YatuResponse|undefined = undefined
      const { email, firstName, middleName, lastName, password } = await req.json()
      if (email && password) {
        res = await Yatu.signUp(email, firstName, middleName, lastName, password)
      } else {
        res = await Yatu.signUpAnon(firstName, middleName, lastName)
      }
       
      return NextResponse.json(res)
    } catch(error) {
        return new NextResponse(
            JSON.stringify({
              status: 'error',
              message: 'tbd'
            }),
            { status: 500 }
          )
    }  
}