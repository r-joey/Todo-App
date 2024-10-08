import { redirect } from '@sveltejs/kit';


export const GET = async ({locals,  url, cookies, request  }) => {
    //console.log(url.searchParams);
    const redirectURL = `${url.origin}/oauth`;
    const expectedState = cookies.get('state');
    const expectedVerifier = cookies.get('verifier');

    // console.log('expected',expectedState)

    const state = await url.searchParams.get('state');
    const code = await url.searchParams.get('code');

    // console.log('returned state',state)
    // console.log('returned code',code)

    //as a side effect this will generate a new code verifier, hence why we need to pass the verifier back in through the cookie
    const authMethods = await locals.pb?.collection('users').listAuthMethods();

    // console.log(authMethods)

    if (!authMethods?.authProviders) {
        console.log('No Auth Providers');
        throw redirect(303, '/register');
    }
    const provider = authMethods.authProviders[0];
    if (!provider) {
        console.log('Provider Not Found');
        throw redirect(303, '/register');
    }

    if (expectedState !== state) {
        console.log('Returned State Does not Match Expected', expectedState, state);
        throw redirect(303, '/register');
    }

    try {
        // console.log(provider)
        await locals.pb?.collection('users').authWithOAuth2Code(provider.name, code, expectedVerifier, redirectURL, {username:''});
    } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }

    throw redirect(303, '/_/todos');
};