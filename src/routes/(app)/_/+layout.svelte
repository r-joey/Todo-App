<div class="drawer lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="navbar sticky top-0 z-10 bg-base-200 w-full">
            <div class="flex-none lg:hidden">
                <label
                    for="my-drawer"
                    aria-label="open sidebar"
                    class="btn btn-square btn-ghost"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block h-6 w-6 stroke-current"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
            </div>
            <div class="mx-2 flex-1 px-2">Dashboard</div>
            <div class="lg:flex-1"></div>
            <div class="dropdown dropdown-end">
                <div
                    tabindex="0"
                    role="button"
                    class="btn btn-ghost btn-circle avatar"
                >
                    <div class="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                    </div>
                </div>
                <ul
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                    <li>
                        <a href="/_/profile" class="justify-between">
                            Profile
                        </a>
                    </li>
                    <li><a href="/_/settings">Settings</a></li>
                    <li>
                        <form action="/logout" method="POST">
                            <button type="submit">Logout</button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
        <!-- Page content here -->
        <main class="flex-1 overflow-y-auto md:pt-4 pt-4 px-6">
            <slot />
        </main>
    </div>
    <div class="drawer-side z-30">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"
        ></label>
        <ul class="menu bg-base-200 min-h-full w-80 p-4">
            <label
                for="my-drawer"
                class="btn btn-ghost btn-sm drawer-button bg-base-300 btn-circle z-50 top-0 right-0 mt-6 mr-4 absolute lg:hidden"
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="h-5 inline-block w-5"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    ></path></svg
                ></label
            >
            <li class="mb-2 font-semibold text-xl">
                <a href="/_/todos">Todo App</a>
            </li>
            <li><a class="active" href="/_/todos">
              Todos</a></li> 
        </ul>
    </div>
</div>
