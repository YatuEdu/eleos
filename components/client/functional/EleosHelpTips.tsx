import React 
, { use,
    useEffect,
useState }                from 'react';
import Tooltip 
                from '@mui/material/Tooltip';
import HelpOutlineIcon 
                from '@mui/icons-material/HelpOutline';
import IconButton 
                from '@mui/material/IconButton';
import { createTheme, ThemeProvider } 
                from '@mui/material/styles';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';

interface EleoHelpTipsProps {
    helpTextEnId: number;
}

const theme = createTheme({
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '1.25rem', // Increase the font size
                    color: '#FFD700', // Change the color
                }
            }
        }
    }
})

export const EleosHelpTips: React.FC<EleoHelpTipsProps> = ({helpTextEnId}) => {
    const {ref, language} = useElos() ?? {};
    if (!ref || !ref.current) {
      throw Error('Eleos is not initialized');
    }
    const [helpText, setHelpText] = useState(ref.current.getHelpText(helpTextEnId))

    useEffect(() => {
        setHelpText(ref.current ? ref.current.getHelpText(helpTextEnId) : '')
    }, [language])

    console.log('helpText', helpText)

    return (
        <ThemeProvider theme={theme}>
        <Tooltip 
            key={helpTextEnId + `` }
            title={helpText} 
            placement="top" 
            enterDelay={300} 
            leaveDelay={200}
           >
            <IconButton>
                <HelpOutlineIcon sx={{ color: '#FFD700' }}/>
            </IconButton>
        </Tooltip  >
        </ThemeProvider>
    )
}
