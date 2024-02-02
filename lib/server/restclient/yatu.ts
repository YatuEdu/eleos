import { sysConstants }     from "@/lib/server/const/sysConst";
import { YatuRequest, YatuResponse }      
							from "@/lib/server/model/sysType";
import CryptoJS           	from 'crypto-js'
import { YatuUser } 		from "@/lib/server/model/authenticatedUser";

// REMOVE THIS BEFORE PRODUCT SHIPMENT
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

/**
 * Yatu API Client
 */
class Yatu {
	/**
		Yatu API for user-login
	**/
	static async login(userName: string, userPassword: string) : Promise<YatuResponse>{
		const req = Yatu.#composeRequestDataForLogin(userName, userPassword);
		const ret = await Yatu.#remoteCall(Yatu.yatuUrl, req);
		if (ret.code || ret.data === null) {
			return {
				ok: false,
				error: {
					code: ret.code,
					message: ret.err
				},
				payload: {}
			};
		}
		else {
			// @ts-ignore: ts(18046)
			const payload = ret.data[0] 
			return {
				ok: true,
				payload: {
					id:    			payload.security_token,
					email: 			payload.email,
					token: 			payload.token,
					lastName: 		payload.last_name,
					middleName: 	payload.middle_name,
					firstName:  	payload.first_name,
					role: 			payload.role,
					isAnonymous: 	payload.is_anonymous,
				}
			} 
		}
	}
	
	/**
		Yatu API for anonymous user sign up
	**/
	static async signUpAnon(userFirstName:string, 
                            userMiddleName:string, 
                            userLastName:string, 
                            password: string) {
		const req = Yatu.#composeRequestDataForAnonSignUp(userFirstName, userMiddleName, userLastName, password);
		// remote call
		return await Yatu.#remoteCall(Yatu.yatuUrl, req);
	}

	/**
		Yatu API for none-anonymous user sign up
	**/
	static async signUp(email: string,
						userFirstName:string, 
						userMiddleName:string, 
						userLastName:string, 
						password: string) {
		const req = Yatu.#composeRequestDataForSignUp(email, userFirstName, userMiddleName, userLastName, password);
		// remote call
		return await Yatu.#remoteCall(Yatu.yatuUrl, req);
		}

    /********** Private methods for composing request data for Async public API above *******/

    /**
		Main method for doing Yatu post API calls
	**/
	static async #remoteCall(url: string, requestOptions: RequestInit) {
		const ret: YatuRequest = {data: null, code: 0, err: "" };
		
		try {		
			const response = await fetch(url, requestOptions);			
			if (!response.ok) {
				ret.err = response.status + '' //uiMan.getTextWithParams(languageConstants.SERVER_ERROR_WITH_RESPONSE, response.status);
			}
			else {
				const data = await response.json();
				ret.data = data.data;
				ret.code = data.result.code
				if (ret.code !== 0) {
					ret.err = data.result.code + '' // uiMan.getErrMsg(data.result.code);
				}
			}
		}
		catch (e) {
			ret.err = JSON.stringify(e);
		}
		return ret;
	}

    
	/**
		Forming Yatu API request data for user-sign up and register for Yatu service
	**/
	static #composeRequestDataForAnonSignUp(userFirstName:string, 
                                            userMiddleName:string, 
                                            userLastName:string, 
                                            password: string) {
		const signupData = {
			header: {
				token: "",
				api_id: Yatu.API_FOR_REGISTER
			},
			
			data: {					
				name: '',
				email: '',
				firstName: userFirstName,
                middleName: userMiddleName,
				lastName: userLastName,
				pwh: Yatu.#hash(password)
			}
		};
		return Yatu.#composePostRequestFromData_private(signupData);
	}
	
	static #composeRequestDataForSignUp(email: string,
		userFirstName:string, 
		userMiddleName:string, 
		userLastName:string, 
		password: string) {
		const signupData = {
			header: {
				token: "",
				api_id: Yatu.API_FOR_REGISTER
			},
			
			data: {					
				name: email,
				email: email,
				firstName: userFirstName,
				middleName: userMiddleName,
				lastName: userLastName,
				pwh: Yatu.#hash(password)
			}
		};
		return Yatu.#composePostRequestFromData_private(signupData);			
	}

	/*
		Yatu API request format for Login (with email) API
	*/
	static #composeRequestDataForLogin(email: string, password: string) {
		
		const loginData = {
			header: {
				token: "",
				api_id: Yatu.API_FOR_LOGIN
			},
			data: {					
				name: email,
				pwh: Yatu.#hash(password)
			}
		};
		return Yatu.#composePostRequestFromData_private(loginData);
	}

	/**
		forming request data for Yatu API calls
	**/
	static #composePostRequestFromData_private(data: unknown) {
		return {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		};
	}

	static #hash(word: string) : string {
		const hash1 = CryptoJS.SHA256(word).toString()
		const hashed = CryptoJS.SHA256(hash1).toString()
		return hashed
	}

	/**
	 * getters and setter
	 */
	static get yatuUrl(): string {
		return process.env.YATU_AUTH_URL as string
	}

	static get API_FOR_REGISTER(): number {
		return parseInt(process.env.API_FOR_REGISTER as string) 
	}

	static get API_FOR_LOGIN(): number {
		return parseInt(process.env.API_FOR_LOGIN as string) 
	}
}

export default Yatu;