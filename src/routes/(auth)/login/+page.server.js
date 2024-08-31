import { redirect, fail } from '@sveltejs/kit';  

export const actions = {
    login : async ({ request, locals }) => { 
        const { email, password } = Object.fromEntries(await request.formData())  
        try {  
            if (email.length <= 0 && password.length <= 0) {
                return fail(400, { message: "Email and Password is required." })
            }

            await locals.pb.collection('users').authWithPassword(email, password) 
            
            if (!locals.pb?.authStore?.model?.verified) {
                locals.pb.authStore.clear()
                return fail(400,  {
                    email,
                    notVerified: true
                })
            } 
        } catch (err) { 
            console.log(err)
            
            return fail(400, { 
                email, 
                data: err?.data || null
            }) 
        }

        throw redirect(303, '/_/todos');
    },
    oauth : async ({ cookies, url, request, locals }) => { 
        const authMethods = await locals.pb?.collection('users').listAuthMethods(); 
        if (!authMethods) {
            return {
                authProviderRedirect: '',
                authProviderState: ''
            };
        }
        const redirectURL = `${url.origin}/oauth`;
        const googleAuthProvider = authMethods.authProviders[0];
        const authProviderRedirect = `${googleAuthProvider.authUrl}${redirectURL}`;
        const state = googleAuthProvider.state;
        const verifier = googleAuthProvider.codeVerifier

        cookies.set('state', state, { path: '/' });
        cookies.set('verifier', verifier, { path: '/' });

        throw redirect(302, authProviderRedirect)
    }
};

 