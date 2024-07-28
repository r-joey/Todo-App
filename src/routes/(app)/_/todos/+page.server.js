import { error, fail } from '@sveltejs/kit';  
export async function load({ locals, url }) {
    const page = url.searchParams.get('page') || 1
    const perPage = 15 
    try {
        const todos = structuredClone(await locals.pb.collection('Todos').getList(page, perPage, {
            // filter: 'isDone = false',
            sort: '-created',
        })); 

        return {
			todos
		}
    } catch (err) { 
        return error(500, {
            message: 'Something went wrong'
        })
    } 
}
 
export const actions = {
    async addTodo({ request, locals }) {

        let data = Object.fromEntries(await request.formData());
        data['user_id'] = locals.user.id;
 
        try {
            await locals.pb.collection('Todos').create(data);
        } catch (err) {
            console.log(err);
        }
    },

    async doneTodo({ request, locals }) { 
        let { id, isDone} = Object.fromEntries(await request.formData());  
        try {
            await locals.pb.collection('Todos').update(id, {
                "isDone": isDone
            });
            return {
                success: true,
                todoStatus : isDone
            }
        } catch (err) {
            console.log(err);
        }
    },

    async deleteTodo({ request, locals }) {
        const { id } = Object.fromEntries(await request.formData())   
        try {
            await locals.pb.collection('Todos').delete(id); 
        } catch (err) {
            console.log(err);
        }

        return {
            success: true
        }
    }
};