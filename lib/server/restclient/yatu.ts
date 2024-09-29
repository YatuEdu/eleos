import { YatuResponse }      
				from "@/lib/server/model/sysType";
import CryptoJS           	
				from 'crypto-js'


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
		if (ret.error?.code || ret.data === null) {
			return ret
		}
		else {
			// @ts-ignore: ts(18046)
			const data: unknowm = ret.data
			return {
				ok: true,
				data: {
					id:    			data.security_token,
					email: 			data.email,
					token: 			data.token,
					lastName: 		data.last_name,
					middleName: 	data.middle_name,
					firstName:  	data.first_name,
					role: 			data.role,
					isAnonymous: 	data.is_anonymous,
				}
			} 
		}
	}
	
	/**
		Yatu API for anonymous user sign up
	**/
	static async signUpAnon(firstName:string, 
							middleName:string, 
							lastName:string): Promise<YatuResponse> {
		const password = Yatu.anonymousRegistrationKey
		const req = Yatu.#composeRequestDataForAnonSignUp(firstName, middleName, lastName, password);
		return await Yatu.#remoteCall(Yatu.yatuUrl, req);
	}

	/**
		Yatu API for none-anonymous user sign up
	**/
	static async signUp(email: string,
						firstName:string, 
						middleName:string, 
						lastName:string, 
						password: string): Promise<YatuResponse> {
		const req = Yatu.#composeRequestDataForSignUp(email, firstName, middleName, lastName, password);
		return await Yatu.#remoteCall(Yatu.yatuUrl, req);
	}

    /********** Private methods for composing request data for Async public API above *******/

    /**
		Main method for calling Yatu API calls
	**/
	static async #remoteCall(url: string, requestOptions: RequestInit): Promise<YatuResponse>{
		try {		
			const response = await fetch(url, requestOptions);			
			if (!response.ok) {
				return { 
					ok: false, 
					data: null,
					error: {
						code:  response.status,
						message: response.statusText
					}} 
			}
			else {
				const res = await response.json();
				return { 
					ok: res.err_code === 0, 
					data: res.data?.length === 1 ? res.data[0] : res.data,
					dataSize: res.data?.length,
					error: {
						code:  res.code,
						message: res.err
					}
				} 
			}
		}
		catch (e: unknown) {
			return { 
				ok: false, 
				data: null,
				error: {
					code:  -1,
					message: JSON.stringify(e)
				}} 
		}
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
	static get anonymousRegistrationKey(): string {
		return process.env.ANONYMOUS_REGISTRATION_KEY as string
	}

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