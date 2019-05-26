

export function lookupOptionsWithToken(token){
    return {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ token
        },
        credentials: 'include'
    }
}


export function lookupOptionPOST(token, csrf_token, data) {
    return {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
            'X-CSRFToken': csrf_token
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }
}