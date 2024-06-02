import EmailOrPhone
        from '@/lib/client/model/EmailOrPhone'
import { REGEX_EMAIL, REGEX_US_MOBILE_PHONE2 } 
        from '@/lib/common/constant/StringConst';
import { ELEOS_INPUT_STYLE } 
        from '@/lib/common/constant/TailwindClasses';
import React, { ChangeEvent, useRef, useState } 
        from 'react';
import PhoneInput 
        from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import EleosLabel 
        from '../atoms/EleosLabel'
import { EmailOrPhoneRequirementType } 
        from '@/lib/client/model/EleosDataTypes';
import { on } from 'events';


interface EleosInputForEmailOrPhoneProps {
    emailOrPhone: EmailOrPhone | undefined
    onChanged: (value: EmailOrPhone, validCode: number) => void
    requirement: EmailOrPhoneRequirementType
}

const EmailOrPhoneInput: React.FC<EleosInputForEmailOrPhoneProps> = (props) => {
    const {emailOrPhone, onChanged, requirement} = props;
    const [email, setEmail] = useState(emailOrPhone && emailOrPhone.email ? emailOrPhone.email : '')
    const [phone, setPhone] = useState(emailOrPhone && emailOrPhone.phone ? emailOrPhone.phone : '')
    const [invalidPhoneOrEmail, setInvalidPhoneOrEmail] = useState(emailOrPhone ? '' : (requirement !== EmailOrPhoneRequirementType.optional ? 'required' : ''))
    const phoneInputRef = useRef<any>(null); // Reference for the phone input

  
  const handleEmailOrPhoneChange = (inputValue: string, otherValue:string, regEx: RegExp, regEx2: RegExp, invalidMsg: string, invalidMsg2: string) => {
    let isValid = false
    const thisValueValid = inputValue && regEx.test(inputValue) ? true : false
    const otherValueValid = otherValue && regEx2.test(otherValue) ? true : false

    if (thisValueValid && thisValueValid) {
      setInvalidPhoneOrEmail('')
      return true
    }

    if (inputValue && !thisValueValid) {
      setInvalidPhoneOrEmail(invalidMsg)
      return false
    }

    if (otherValue && !otherValueValid) {
      setInvalidPhoneOrEmail(invalidMsg2)
      return false
    }

    if (requirement === EmailOrPhoneRequirementType.optional) {
      if (!inputValue && !otherValue) {
        setInvalidPhoneOrEmail('')
        return true
      }
    }

    if (requirement === EmailOrPhoneRequirementType.requireEither) {
      if (thisValueValid || otherValueValid) {
        setInvalidPhoneOrEmail('')
        return true
      }

      setInvalidPhoneOrEmail('required')
      return false
    }

    return false
    
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setEmail(inputValue)
    const valid = handleEmailOrPhoneChange(inputValue, phone, REGEX_EMAIL, REGEX_US_MOBILE_PHONE2, 'Invalid email address', 'Invalid phone number')
    if (valid) {
      onChanged(new EmailOrPhone(inputValue, phone), valid ? 1 : -1)
    }
  }

  const handlePhoneChange = (phoneInput: string) => {
    setPhone(phoneInput)
    const valid = handleEmailOrPhoneChange(phoneInput, email, REGEX_US_MOBILE_PHONE2, REGEX_EMAIL, 'Invalid phone number', 'Invalid email address')
    if (valid) {
      onChanged(new EmailOrPhone(email, phoneInput), valid ? 1 : -1)
    }
  }

  return (
    <div>
      <EleosLabel text='Email or Phone' invalidMessage={invalidPhoneOrEmail}/>
      <div className="grid grid-cols-2 gap-1">
        <PhoneInput
            inputProps={{
            ref: phoneInputRef, // Pass the ref to the underlying input element
          }}
          country={'us'}
          value={phone}
          onlyCountries={['us']} // Restrict to US only
          onChange={handlePhoneChange}
          placeholder="Enter phone"
          inputClass={ELEOS_INPUT_STYLE}
          inputStyle={{
            height: '2.5rem', // Ensure consistent height
            width: '100%', // Ensure consistent width
            lineHeight: '1.5rem', // Ensure consistent line-height
          }}
        />
        <input
          id="inputField"
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email"
          className={ELEOS_INPUT_STYLE}
        />
      </div>
    </div>
  );
};

export default EmailOrPhoneInput
