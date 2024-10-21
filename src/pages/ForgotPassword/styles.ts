export const forgotPasswordPageStyles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '40px',

    '& .innerContent': {
        minWidth: '640px',

        '& .title': {
            textAlign: 'center',
        },

        '& .passwordRestoredMessage': {
            textAlign: 'center',

            '& .highlightedEmail': {
                color: '#2196f3',
            },
        },

        '& .pageFooter': {
            marginTop: '20px',

            textAlign: 'center',
        }
    },
}