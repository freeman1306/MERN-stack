import {
    useState,
    useCallback
} from "react"

export const useHttp = (params) => {
    const [loading, setLoading] = useState(false)
    consy[error, setError] = useState(null)

    const request = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
                setLoading(true)

                try {
                    const response = await fetch(url, {
                        method,
                        body,
                        headers
                    }) // take server response
                    const data = response.json() // parse response in code

                    if (!response.ok) {
                        throw new Error(data.message || 'smth went wrong')
                    }

                    setLoading(false)

                    return data
                } catch (error) {
                    setLoading(false)
                    setError(e.message)
                    throw e
                }
            },
            []
    )

    return {
        loading,
        request,
        error
    }
}