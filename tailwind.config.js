export const theme = {
    extend: {
        animation: {
            'custom-bounce': 'custom-bounce 1s ease-in-out infinite',
        },
        keyframes: {
            'custom-bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-20px)' },
            },
        },
    },
};