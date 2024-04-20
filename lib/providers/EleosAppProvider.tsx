'use client'

import Eleos from "@/lib/client/model/Eleos"
import { EleosInitInfo } from "@/lib/client/model/EleosMisc"
import { FC, useRef, useState } from "react"

import React from 'react';
import { EleosContext } from '@/lib/context/EleosContext';
              

type EleosAppProviderProps = {
    children: React.ReactNode
    eleosInit: EleosInitInfo
}

export const EleosAppProvider = ({children, eleosInit}: EleosAppProviderProps) => {
    const eleosApp = new Eleos(eleosInit.userFirstName, 
                                eleosInit.userMiddleName, 
                                eleosInit.userLastName, 
                                eleosInit.userSuffix, 
                                eleosInit.userEmail, 
                                eleosInit.userState)
    const ref = useRef(eleosApp)

    return (
        <EleosContext.Provider value={{ ref }}>
            {children}
        </EleosContext.Provider>
    )
}