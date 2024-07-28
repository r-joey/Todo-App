<div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <form class="card-body">
        <h2 class="font-bold text-lg text-center">Register</h2>
        <div class="form-control">
            <label class="label" for="email">
                <span class="label-text">Email</span>
            </label>
            <input name="email" type="email" placeholder="email" class="input input-bordered" required />
        </div>
        <div class="form-control">
            <label for="password" class="label">
                <span class="label-text">Password</span>
            </label>
            <input name="password" type="password" placeholder="password" class="input input-bordered" required /> 
        </div>
        <div class="form-control">
            <label for="password" class="label">
                <span class="label-text">Confirm password</span>
            </label>
            <input name="confirm_password" type="password" placeholder="confirm password" class="input input-bordered" required /> 
        </div>
        <div class="form-control mt-6">
            <button class="btn btn-primary">Register</button> 
        </div>

        <div class="flex justify-center w-full"> 
            <label for="" class="label">
                <span class="label-text-alt">Already have an account? </span> <a href="/login" class="text-blue-600 label-text-alt link link-hover">Login</a>
            </label>
        </div>
    </form>
</div> 