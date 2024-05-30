import { EmailOrPhone, EmailOrPhoneType } 
        from '@/lib/client/model/EleosDataTypes';
import { REGEX_EMAIL } 
        from '@/lib/common/constant/StringConst';
import React, { ChangeEvent, useEffect, useRef, useState } 
        from 'react';
import PhoneInput 
        from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface EleosInputForEmailOrPhoneProps {
    emailOrPhone: EmailOrPhone;
    onChanged: (value: EmailOrPhone, validCode: number) => void;
}

const EmailOrPhoneInput: React.FC<EleosInputForEmailOrPhoneProps> = (props) => {
    const {emailOrPhone, onChanged} = props;
    const [emailPhone, setEmailPhone] = useState(emailOrPhone);
    const phoneInputRef = useRef<any>(null); // Reference for the phone input

  useEffect(() => {
    // Set focus to the phone input when inputType changes to 'phone'
    if (emailPhone.type === EmailOrPhoneType.phone && phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, [emailPhone]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length >= 2) {
      if (/\d{2}/.test(inputValue.slice(0, 2))) {
        setEmailPhone({type: EmailOrPhoneType.phone, value: '+1' + inputValue});
      } else {
        setEmailPhone({type: EmailOrPhoneType.email, value: inputValue});
      }
    } else {
      setEmailPhone({type: EmailOrPhoneType.email, value: inputValue});
    }
  }

  const handlePhoneChange = (phone: string) => {
    setEmailPhone({type: EmailOrPhoneType.phone, value: phone});
  }

  return (
    <div>
      <label htmlFor="inputField">Email or Phone</label>
      {emailOrPhone && emailOrPhone.type === EmailOrPhoneType.phone ? (
        <PhoneInput
            inputProps={{
            ref: phoneInputRef, // Pass the ref to the underlying input element
          }}
          country={'us'}
          value={emailOrPhone ? emailOrPhone.value : ''}
          onlyCountries={['us']} // Restrict to US only
          onChange={handlePhoneChange}
          containerStyle={{ marginTop: '10px' }}
          inputStyle={{ width: '100%' }}
        />
      ) : (
        <input
          id="inputField"
          type="text"
          value={emailOrPhone ? emailOrPhone.value : ''}
          onChange={handleChange}
          placeholder="Enter email or phone"
          style={{ marginTop: '10px', padding: '10px', width: '100%' }}
        />
      )}
      {emailOrPhone && emailOrPhone.type === EmailOrPhoneType.email && emailOrPhone.value && !REGEX_EMAIL.test(emailOrPhone.value) && (
        <small style={{ color: 'red' }}>Please enter a valid email address.</small>
      )}
    </div>
  );
};

export default EmailOrPhoneInput
