import { redirect, fail } from '@sveltejs/kit';  

export const actions = {
    default : async ({ request, locals }) => { 
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
    }   
};

 