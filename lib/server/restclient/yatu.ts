import { sysConstants }     from "@/lib/server/const/sysConst";
import { YatuRequest }      from "@/lib/server/model/sysType";
import sha256          		from 'crypto-js/sha256'

class Yatu {
	/**
		Yatu API for user-login
	**/
	static async login(userName: string, userPassword: string) {
		const req = Yatu.#composeRequestDataForLogin(userName, userPassword);
		// remote call
		return await Yatu.#remoteCall(sysConstants.YATU_AUTH_URL, req);
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
		return await Yatu.#remoteCall(sysConstants.YATU_AUTH_URL, req);
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
				api_id: sysConstants.API_FOR_REGISTER
			},
			
			data: {					
				name: null,
				email: null,
				firstName: userFirstName,
                middleName: userMiddleName,
				lastName: userLastName,
				pwh: sha256(sha256(password))
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
				api_id: sysConstants.API_FOR_LOGIN
			},
			data: {					
				name: email,
				pwh:sha256(sha256(password))
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
}

export default Yatu;