'use client'

import Eleos from "@/lib/client/model/Eleos"
import { EleosInitInfo } from "@/lib/client/model/EleosMisc"
import { FC, useContext, useRef, useState } from "react"

import React from 'react';
import { EleosContext } from '@/lib/context/EleosContext';
              

type EleosAppProviderProps = {
    children: React.ReactNode
}

export function useElos() {
    return useContext(EleosContext);
}

export const EleosAppProvider = ({children}: EleosAppProviderProps) => {
    const ref = useRef(new Eleos() )

    return (
        <EleosContext.Provider value={{ ref }}>
            {children}
        </EleosContext.Provider>
    )
}