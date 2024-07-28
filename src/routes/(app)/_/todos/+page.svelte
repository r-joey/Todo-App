<script>
  export let data  
  import { toast } from 'svelte-sonner';
  import { enhance } from '$app/forms';  
  import Icon from '@iconify/svelte';

  let addLoading = false
  let doneLoading = false
  let deleteLoading = false
  let todoForm; 
  let todo_form_modal;

  const addTodo = ({ formElement}) => { 
    addLoading = true 
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
            todo_form_modal.close()
            addLoading = false
            formElement.reset()
            await update() 
        }; 
  }



  const doneTodo = () => { 
    doneLoading = true   
        return async ({ result, update }) => {  
           
            switch (result.type) { 
                case 'failure':  
                    const failMessage = result?.data?.data?.message || result?.data?.message ||'Something went wrong, please try again.';
                    toast.error(failMessage + ' Please try again.');
                    break;
                case 'error': 
                    const errorMessage = result?.error?.data?.message ?? 'Something went wrong, please try again.'; 
                    toast.error(errorMessage + ' Please try again.' );
                    break;
                default:
                    const todoStatus = JSON.parse(result.data.todoStatus.toLowerCase())
                    toast.success(`Todo marked as ${todoStatus ? 'Done' : 'Pending'}`);
                     
            } 
            await update() 
            doneLoading = false 
        }; 
  }

  const deleteTodo = () => { 
    deleteLoading = true   
        return async ({ result, update }) => {  
           
            switch (result.type) { 
                case 'failure':  
                    const failMessage = result?.data?.data?.message || result?.data?.message ||'Something went wrong, please try again.';
                    toast.error(failMessage + ' Please try again.');
                    break;
                case 'error': 
                    const errorMessage = result?.error?.data?.message ?? 'Something went wrong, please try again.'; 
                    toast.error(errorMessage + ' Please try again.' );
                    break;
                default: 
                    toast.success(`Todo deleted successfully`);
                     
            } 
            await update() 
            deleteLoading = false 
        }; 
  }


</script> 
<dialog bind:this={todo_form_modal} id="todo_form_modal" class="modal">
  <div class="modal-box ">
     
    <h3 class="font-bold text-lg text-center mb-4">Add New Todo</h3>

    <form id="todoForm" bind:this={todoForm} action="?/addTodo" method="POST" class="space-y-4" use:enhance={addTodo}>

      <div class="form-control"> 
        <input name="title" type="text" placeholder="Title" class="input input-bordered" /> 
      </div> 
      <div class="form-control"> 
        <textarea name="content" class="textarea textarea-bordered h-24" placeholder="Content"></textarea> 
      </div>

      <div class="modal-action">    
        <button disabled={addLoading} type="button" on:click={()=>{todoForm.reset(); todo_form_modal.close()}} class="btn">Cancel</button>  
        <button disabled={addLoading} type="submit" class="btn btn-primary">
          {#if addLoading}
          <span class="loading loading-spinner loading-sm"></span>
          {/if}
          Save</button> 
        </div>
        
      </form>

  </div>
</dialog>
 
 

<div class="card w-full p-6 bg-base-200 shadow-xl mt-2">
  <div class="text-xl font-semibold inline-block">
    Current Leads
    <div class="inline-block float-right">
      <div class="inline-block float-right">
        <button class="btn px-6 btn-sm normal-case btn-primary" onclick="todo_form_modal.showModal()">Add New</button>
      </div>
    </div>
  </div>
  <div class="divider mt-2"></div>
  <div class="h-full w-full pb-6 bg-base-200">
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each data?.todos?.items as todo (todo.id)}

            <tr>
              <td> 
                <div class={todo?.isDone ? "badge badge-success" : "badge badge-secondary"}>{todo?.isDone ? "Done" : "Pending" }</div>
              </td>
              <td>{todo?.title}</td>
              <td>{todo?.content}</td>
              <td>{todo?.created}</td>
              <td>
                <div class="flex"> 
                  <form action="?/deleteTodo" method="POST" use:enhance={deleteTodo}>
                    <input type="hidden" name="id" value={todo?.id} />
                    <button disabled={deleteLoading} type="submit" class="btn btn-sm btn-square btn-ghost">
                      {#if deleteLoading} 
                        <span class="loading loading-spinner loading-xs"></span>  
                      {:else}
                        <div class="lg:tooltip" data-tip="Delete"> 
                          <Icon icon="carbon:trash-can" width="20" height="20" />
                        </div>
                      {/if}
                    </button>
                  </form>
                  <form action="?/doneTodo" method="POST" use:enhance={doneTodo}>
                    <input type="hidden" name="id" value={todo?.id} />
                    <input type="hidden" name="isDone" value={!todo?.isDone} />
                    
                    <button disabled={doneLoading} type="submit" class="btn btn-sm btn-square btn-ghost">
                      {#if doneLoading} 
                        <span class="loading loading-spinner loading-xs"></span>  
                      {:else}
                        {#if todo?.isDone}
                          <div class="lg:tooltip" data-tip="Mark as Pending"> 
                            <Icon icon="carbon:progress-bar" width="20" height="20" />
                          </div>
                        {:else}
                          <div class="lg:tooltip" data-tip="Mark as Done"> 
                            <Icon icon="carbon:checkbox-checked" width="20" height="20" />
                          </div>
                        {/if}
                      {/if}
                    </button>

                  </form>
                </div>
              </td>
            </tr> 
          
          {/each}
        </tbody>
      </table>

      {#if data?.todos?.totalPages > 1}
        <div class="flex justify-center">
          <div class="join"> 

            <!-- <a href={`/_/todos?page=${Math.max(data?.todos?.page - 1, 1)}`} class={data?.todos?.page === 1 ? 'join-item btn btn-disabled' : 'join-item btn'}>Prev</a> -->
            
            {#if data?.todos?.page > 3}
              <a href={`/_/todos?page=1`} class={data?.todos?.page === 1 ? 'join-item btn btn-disabled' : 'join-item btn'}>1</a>
              {#if data?.todos?.page > 4}
                <span class="join-item btn btn-disabled">...</span>
              {/if}
            {/if}

            {#each Array(data?.todos?.totalPages).fill(0).map((_, idx) => idx + 1).filter(page => {
              return page >= data?.todos?.page - 2 && page <= data?.todos?.page + 2;
            }) as page}
              <a href={`/_/todos?page=${page}`} class={data?.todos?.page === page ? 'join-item btn btn-primary' : 'join-item btn'}>{page}</a>
            {/each}

            {#if data?.todos?.page < data?.todos?.totalPages - 2}
              {#if data?.todos?.page < data?.todos?.totalPages - 3}
                <span class="join-item btn btn-disabled">...</span>
              {/if}
              <a href={`/_/todos?page=${data?.todos?.totalPages}`} class={data?.todos?.page === data?.todos?.totalPages ? 'join-item btn btn-disabled' : 'join-item btn'}>{data?.todos?.totalPages}</a>
            {/if}
            
            <!-- <a href={`/_/todos?page=${Math.min(data?.todos?.page + 1, data?.todos?.totalPages)}`} class={data?.todos?.page === data?.todos?.totalPages ? 'join-item btn btn-disabled' : 'join-item btn'}>Next</a> -->
          

          </div>
        </div>
      {/if}
 
    </div>
  </div>
</div>
