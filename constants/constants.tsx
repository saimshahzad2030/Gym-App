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