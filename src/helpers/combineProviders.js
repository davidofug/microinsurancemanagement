export function combineProviders(providers) {
    return providers.reduce(function(Combined, Provider) {
        return function({ children }) {
            return (
                <Combined>
                    <Provider>{children}</Provider>
                </Combined>
            )
        }
    })
}
