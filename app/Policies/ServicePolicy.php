<?php

namespace App\Policies;

use App\Models\User;
use App\Service;
use App\Policies\HasAdmin;
use Illuminate\Auth\Access\HandlesAuthorization;

class ServicePolicy
{
    use HandlesAuthorization;
    use HasAdmin;

    /**
     * Determine whether the user can view the service.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Service  $service
     * @return mixed
     */
    public function view(User $user, Service $service)
    {
        return true;
    }

    /**
     * Determine whether the user can create services.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can update the service.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Service  $service
     * @return mixed
     */
    public function update(User $user, Service $service)
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can delete the service.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Service  $service
     * @return mixed
     */
    public function delete(User $user, Service $service)
    {
        return $user->is_admin;
    }
}
