export const LOGO = {name:'Logo',src:'/logo.png'}

export const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0f172a', // Default light mode border color
        '.dark &': {
          borderColor: 'white', // Example dark mode border color using Tailwind color
        },
      },
      '&:hover fieldset': {
        borderColor: '#0f172a',
        '.dark &': {
          borderColor: 'white',
        },
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0f172a',
        '.dark &': {
          borderColor: 'white',
        },
      },
    },
    '& .MuiInputBase-input': {
      color: '#0f172a',
      '.dark &': {
        color: 'white', // Example dark mode text color
      },
    },
    '& .MuiInputLabel-root': {
      color: '#0f172a',
      '.dark &': {
        color: 'white',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#0f172a',
      '.dark &': {
        color: 'white',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0f172a',
      '.dark &': {
        borderColor: 'white',
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#0f172a',
      '.dark &': {
        color: 'white',
      },
    },
  } 

  export const optionStyle = {
    backgroundColor: 'white', 
    color: 'black', 
    
  }

  export const selectFieldStyle={  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#0f172a !important', // Default light mode border color (dark grayish)
      '.dark &': {
        borderColor: 'white !important', // Dark mode border color (white)
      },
    },
    '&:hover fieldset': {
      borderColor: '#0f172a !important', // Light mode hover border color (dark grayish)
      '.dark &': {
        borderColor: 'white !important', // Dark mode hover border color (white)
      },
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0f172a !important', // Focused border color (dark grayish)
      '.dark &': {
        borderColor: 'white !important', // Focused border color in dark mode (white)
      },
    },
  },
  '& .MuiInputBase-input': {
    color: '#0f172a !important', // Light mode text color (dark grayish)
    '.dark &': {
      color: 'white !important', // Dark mode text color (white)
    },
  },
  '& .MuiInputLabel-root': {
    color: '#0f172a !important', // Light mode label color (dark grayish)
    '.dark &': {
      color: 'white !important', // Dark mode label color (white)
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#0f172a !important', // Focused label color in light mode
    '.dark &': {
      color: 'white !important', // Focused label color in dark mode
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#0f172a !important', // Border color in light mode (dark grayish)
    '.dark &': {
      borderColor: 'white !important', // Border color in dark mode (white)
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#0f172a !important', // Placeholder color in light mode (dark grayish)
    '.dark &': {
      color: 'white !important', // Placeholder color in dark mode (white)
    },
  },}

  export const checkBoxStyle = {
    '&.Mui-checked': {
     color: 'black', 
   },
   '&.MuiCheckbox-root': {
     color: 'black', 
   }, 
   '.dark &': {
     '&.Mui-checked': {
       color: 'white',  
     },
     '&.MuiCheckbox-root': {
       color: 'white', 
     },
   },
 }