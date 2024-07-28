<script> 
export let form; 
import { toast } from 'svelte-sonner';
import { enhance } from '$app/forms'; 

    let loading = false; 

    const login = ({ formElement }) => { 
        loading = true 
        return async ({ result, update }) => {  
            switch (result.type) { 
                case 'failure':  
                    console.log(result)
                    const failMessage = result?.data?.data?.message || result?.data?.message ||'Something went wrong, please try again.';
                    toast.error(failMessage + ' Please try again.');
                    break;
                case 'error': 
                    const errorMessage = result?.error?.data?.message ?? 'Something went wrong, please try again.'; 
                    toast.error(errorMessage + ' Please try again.' );
                    break;
            }
            loading = false
            formElement.reset()
            await update() 
        };
    }; 
</script>
<!-- <pre>
    {JSON.stringify(form, null, 2)}
</pre> -->


<div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    
    <form class="card-body" method="POST" use:enhance={login}>
        <h2 class="font-bold text-lg text-center">Login</h2>
        <div class="form-control">
            <label class="label" for="email">
                <span class="label-text">Email</span>
            </label>
            <input name="email" type="email" placeholder="email" value={form?.email ?? ''} class="input input-bordered" required/>
            {#if form?.notVerified} 
                <div class="label">
                    <span class="label-text-alt text-red-500">Please verify your email first.</span> 
                </div>
            {/if}
        </div>
        <div class="form-control">
            <label for="password" class="label">
                <span class="label-text">Password</span>
            </label>
            <input name="password" type="password" placeholder="password" class="input input-bordered" required />
        <label for="" class="label">
            <a   href="/#" class="label-text-alt link link-hover">Forgot password?</a>
        </label>
        
        </div>
        <div class="form-control mt-6">
            <button disabled={loading} class="btn btn-primary">
                {#if loading}
                    <span class="loading loading-spinner loading-sm"></span>
                {/if}
                Login
            </button> 
        </div>

        <div class="flex justify-center w-full"> 
            <label for="" class="label">
                <span class="label-text-alt">Don't have an account? </span> <a href="/register" class="text-blue-600 label-text-alt link link-hover">Register</a>
            </label>
        </div>
    </form>
</div> 